import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

/**
 * Encrypt data using AES-256-GCM.
 * Returns a buffer containing: IV (16 bytes) + Auth Tag (16 bytes) + Ciphertext
 */
export function encrypt(plaintext: Buffer, key: Buffer): Buffer {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]);
}

/**
 * Decrypt data encrypted with AES-256-GCM.
 * Expects input buffer: IV (16 bytes) + Auth Tag (16 bytes) + Ciphertext
 */
export function decrypt(encryptedData: Buffer, key: Buffer): Buffer {
  const iv = encryptedData.subarray(0, IV_LENGTH);
  const tag = encryptedData.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const ciphertext = encryptedData.subarray(IV_LENGTH + TAG_LENGTH);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

/**
 * Generate a random 256-bit data encryption key (DEK).
 */
export function generateDek(): Buffer {
  return randomBytes(32);
}
