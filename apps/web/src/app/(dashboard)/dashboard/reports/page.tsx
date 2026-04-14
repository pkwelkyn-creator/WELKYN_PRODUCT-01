export default function ReportsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Reports</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        View and download your optimization reports.
      </p>

      <div
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '0.75rem',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>No reports yet</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Run a scan to generate your first Tier 1 report with estimated savings and top issues.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '0.5rem', minWidth: '200px' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.875rem' }}>Tier 1 — Free</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Top 3 issues + estimated savings
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '0.5rem', minWidth: '200px' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.875rem' }}>Tier 2 — Pro</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Full breakdown + AI insights + Terraform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
