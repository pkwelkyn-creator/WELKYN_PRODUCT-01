export default function OverviewPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Your cloud cost optimization at a glance.
      </p>

      {/* Score Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Composite Score', value: '--', color: 'var(--text-muted)' },
          { label: 'Waste Score', value: '--', color: 'var(--text-muted)' },
          { label: 'Cache Hit Score', value: '--', color: 'var(--text-muted)' },
          { label: 'Traffic Efficiency', value: '--', color: 'var(--text-muted)' },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
            }}
          >
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {card.label}
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Estimated Savings */}
      <div
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Estimated Monthly Savings</h2>
        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--score-excellent)' }}>--</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Connect your cloud accounts to start scanning.
        </p>
      </div>

      {/* Recent Scans */}
      <div
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Scans</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          No scans yet. Go to Settings &gt; Credentials to connect your cloud accounts.
        </p>
      </div>
    </div>
  );
}
