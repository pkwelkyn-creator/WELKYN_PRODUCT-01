import Link from 'next/link';

const navItems = [
  { href: '/dashboard/overview', label: 'Overview', icon: 'grid' },
  { href: '/dashboard/aws', label: 'AWS', icon: 'cloud' },
  { href: '/dashboard/azure', label: 'Azure', icon: 'cloud' },
  { href: '/dashboard/gcp', label: 'GCP', icon: 'cloud' },
  { href: '/dashboard/cloudflare', label: 'Cloudflare', icon: 'shield' },
  { href: '/dashboard/reports', label: 'Reports', icon: 'file' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: 'var(--brand-secondary)',
          color: '#fff',
          padding: '1.5rem 0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
            WELKYN
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Cloud Cost Optimization
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 1.5rem',
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'background 0.15s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '0 1.5rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Plan: FREE</p>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
