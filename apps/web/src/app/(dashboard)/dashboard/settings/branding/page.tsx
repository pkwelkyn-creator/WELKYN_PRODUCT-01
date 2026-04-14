'use client';

import { useState } from 'react';

export default function BrandingPage() {
  const [branding, setBranding] = useState({
    companyName: '',
    primaryColor: '#0066FF',
    secondaryColor: '#1A1A2E',
    logoUrl: '',
  });

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>White-Label Branding</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Customize the look and feel of your WELKYN instance.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Settings Form */}
        <div
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Branding Settings</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
                Company Name
              </label>
              <input
                type="text"
                value={branding.companyName}
                onChange={(e) => setBranding((p) => ({ ...p, companyName: e.target.value }))}
                placeholder="Your Company"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
                Primary Color
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding((p) => ({ ...p, primaryColor: e.target.value }))}
                  style={{ width: '40px', height: '36px', border: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding((p) => ({ ...p, primaryColor: e.target.value }))}
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
                Secondary Color
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={branding.secondaryColor}
                  onChange={(e) => setBranding((p) => ({ ...p, secondaryColor: e.target.value }))}
                  style={{ width: '40px', height: '36px', border: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={branding.secondaryColor}
                  onChange={(e) => setBranding((p) => ({ ...p, secondaryColor: e.target.value }))}
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
                Logo URL
              </label>
              <input
                type="url"
                value={branding.logoUrl}
                onChange={(e) => setBranding((p) => ({ ...p, logoUrl: e.target.value }))}
                placeholder="https://your-cdn.com/logo.png"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '0.75rem',
                background: 'var(--brand-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                maxWidth: '180px',
              }}
            >
              Save Branding
            </button>
          </form>
        </div>

        {/* Preview */}
        <div
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Preview</h2>
          <div
            style={{
              background: branding.secondaryColor,
              borderRadius: '0.5rem',
              padding: '1.5rem',
              color: '#fff',
            }}
          >
            <h3 style={{ color: branding.primaryColor, fontWeight: 800, fontSize: '1.25rem' }}>
              {branding.companyName || 'WELKYN'}
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              Cloud Cost Optimization
            </p>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: branding.primaryColor,
                borderRadius: '0.375rem',
                display: 'inline-block',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Sample Button
            </div>
          </div>
        </div>
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
