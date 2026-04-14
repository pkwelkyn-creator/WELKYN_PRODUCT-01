'use client';

import { useState } from 'react';

const providers = [
  { id: 'AWS', label: 'Amazon Web Services', color: '#FF9900' },
  { id: 'AZURE', label: 'Microsoft Azure', color: '#0078D4' },
  { id: 'GCP', label: 'Google Cloud Platform', color: '#4285F4' },
  { id: 'CLOUDFLARE', label: 'Cloudflare', color: '#F48120' },
];

export default function CredentialsPage() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Cloud Credentials</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Connect your cloud accounts for analysis. Credentials are encrypted with AES-256-GCM.
      </p>

      {/* Connected accounts */}
      <div
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Connected Accounts</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          No accounts connected yet.
        </p>
      </div>

      {/* Add new credential */}
      <div
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Add Cloud Account</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProvider(p.id)}
              style={{
                padding: '1rem',
                border: selectedProvider === p.id ? `2px solid ${p.color}` : '1px solid var(--border)',
                borderRadius: '0.5rem',
                background: selectedProvider === p.id ? `${p.color}10` : 'var(--bg-secondary)',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: p.color }}>{p.id}</span>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{p.label}</p>
            </button>
          ))}
        </div>

        {selectedProvider === 'AWS' && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
                Label
              </label>
              <input type="text" placeholder="e.g. Production Account" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
                IAM Role ARN (recommended)
              </label>
              <input type="text" placeholder="arn:aws:iam::123456789012:role/WelkynReadOnly" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
                Access Level
              </label>
              <select style={inputStyle}>
                <option value="READ_ONLY">Read Only</option>
                <option value="PRIVILEGED">Privileged Access</option>
              </select>
            </div>
            <button type="submit" style={buttonStyle}>Connect AWS Account</button>
          </form>
        )}

        {selectedProvider === 'AZURE' && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Label</label>
              <input type="text" placeholder="e.g. Azure Production" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Tenant ID</label>
              <input type="text" placeholder="Azure AD Tenant ID" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Client ID</label>
              <input type="text" placeholder="App Registration Client ID" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Client Secret</label>
              <input type="password" placeholder="Client Secret" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Subscription ID</label>
              <input type="text" placeholder="Azure Subscription ID" style={inputStyle} />
            </div>
            <button type="submit" style={buttonStyle}>Connect Azure Account</button>
          </form>
        )}

        {selectedProvider === 'GCP' && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Label</label>
              <input type="text" placeholder="e.g. GCP Production" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Project ID</label>
              <input type="text" placeholder="GCP Project ID" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Service Account Key (JSON)</label>
              <textarea rows={4} placeholder="Paste service account JSON key" style={{ ...inputStyle, resize: 'vertical' as const }} />
            </div>
            <button type="submit" style={buttonStyle}>Connect GCP Account</button>
          </form>
        )}

        {selectedProvider === 'CLOUDFLARE' && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>Label</label>
              <input type="text" placeholder="e.g. Main Cloudflare Account" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>API Token</label>
              <input type="password" placeholder="Cloudflare API Token" style={inputStyle} />
            </div>
            <button type="submit" style={buttonStyle}>Connect Cloudflare Account</button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.625rem 0.75rem',
  border: '1px solid var(--border)',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem',
  background: 'var(--brand-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: '0.5rem',
  fontWeight: 600,
  cursor: 'pointer',
  maxWidth: '250px',
};
