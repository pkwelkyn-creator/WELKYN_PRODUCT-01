export default function AwsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>AWS Analysis</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Cost and resource optimization for Amazon Web Services.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {['EC2 Instances', 'S3 Storage', 'Data Transfer', 'NAT Gateways', 'EKS Clusters', 'CloudFront'].map((service) => (
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
