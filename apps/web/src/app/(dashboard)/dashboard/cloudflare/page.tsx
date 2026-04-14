export default function CloudflarePage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Cloudflare Analysis</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Cache efficiency, traffic routing, and CDN optimization.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {['Cache Performance', 'DNS Records', 'WAF Rules', 'Argo Smart Routing', 'Load Balancers', 'Traffic Analytics'].map((service) => (
          <div
            key={service}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
            }}
          >
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{service}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No data yet</p>
          </div>
        ))}
      </div>
    </div>
  );
}
