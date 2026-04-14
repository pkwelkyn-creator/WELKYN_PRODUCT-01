export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-secondary)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2rem',
          background: 'var(--bg-primary)',
          borderRadius: '1rem',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
            WELKYN
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Cloud Cost Optimization
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
