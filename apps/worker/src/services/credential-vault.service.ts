import { prisma } from '@welkyn/database';
import { encrypt, decrypt, generateDek } from '../utils/encryption';
import { logger } from '../utils/logger';

/**
 * Get the master encryption key from environment.
 * In production, this should be fetched from AWS KMS.
 */
function getMasterKey(): Buffer {
  const key = process.env.ENCRYPTION_MASTER_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_MASTER_KEY is not set');
  }
  return Buffer.from(key, 'hex');
}

/**
 * Store an encrypted credential using envelope encryption.
 *
 * 1. Generate a random DEK (Data Encryption Key)
 * 2. Encrypt the credential data with the DEK
 * 3. Encrypt the DEK with the master key (KEK)
 * 4. Store both encrypted blobs in the database
 */
export async function storeCredential(
  tenantId: string,
  provider: 'AWS' | 'AZURE' | 'GCP' | 'CLOUDFLARE',
  label: string,
  accessLevel: 'READ_ONLY' | 'PRIVILEGED',
  credentialData: Record<string, unknown>,
): Promise<string> {
  const masterKey = getMasterKey();

  // Generate a per-credential DEK
  const dek = generateDek();

  // Encrypt the credential with the DEK
  const plaintext = Buffer.from(JSON.stringify(credentialData), 'utf8');
  const encryptedData = encrypt(plaintext, dek);

  // Encrypt the DEK with the master key (envelope encryption)
  const dekEncrypted = encrypt(dek, masterKey);

  const credential = await prisma.cloudCredential.create({
    data: {
      tenantId,
      provider,
      accessLevel,
      label,
      encryptedData,
      dekEncrypted,
      status: 'PENDING_VALIDATION',
    },
  });

  logger.info({ credentialId: credential.id, provider }, 'Credential stored securely');

  return credential.id;
}

/**
 * Retrieve and decrypt a credential.
 *
 * 1. Fetch the encrypted data and encrypted DEK from the database
 * 2. Decrypt the DEK with the master key
 * 3. Decrypt the credential data with the DEK
 * 4. Return the plaintext credential (in memory only, never logged)
 */
export async function retrieveCredential(
  credentialId: string,
  tenantId: string,
): Promise<Record<string, unknown>> {
  const masterKey = getMasterKey();

  const credential = await prisma.cloudCredential.findFirst({
    where: { id: credentialId, tenantId },
  });

  if (!credential) {
    throw new Error('Credential not found');
  }

  // Decrypt the DEK
  const dek = decrypt(Buffer.from(credential.dekEncrypted), masterKey);

  // Decrypt the credential data
  const plaintext = decrypt(Buffer.from(credential.encryptedData), dek);

  return JSON.parse(plaintext.toString('utf8'));
}

/**
 * Update credential validation status.
 */
export async function updateCredentialStatus(
  credentialId: string,
  status: 'VALID' | 'INVALID',
): Promise<void> {
  await prisma.cloudCredential.update({
    where: { id: credentialId },
    data: {
      status,
      lastValidated: new Date(),
    },
  });
}
