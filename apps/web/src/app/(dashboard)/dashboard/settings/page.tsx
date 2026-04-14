import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Settings</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Manage your account, credentials, and branding.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <Link
          href="/dashboard/settings/credentials"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Cloud Credentials</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Connect your AWS, Azure, GCP, and Cloudflare accounts.
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/settings/branding"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Branding</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Customize logo, colors, and white-label settings.
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/settings/team"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Team</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Manage team members and roles.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
