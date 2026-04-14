import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
        WELKYN
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', textAlign: 'center' }}>
        Cloud Cost Optimization Platform. Analyze AWS, Azure, GCP &amp; Cloudflare
        to identify waste and maximize savings.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          href="/login"
          style={{
            padding: '0.75rem 2rem',
            background: 'var(--brand-primary)',
            color: '#fff',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Sign In
        </Link>
        <Link
          href="/register"
          style={{
            padding: '0.75rem 2rem',
            border: '2px solid var(--brand-primary)',
            color: 'var(--brand-primary)',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
