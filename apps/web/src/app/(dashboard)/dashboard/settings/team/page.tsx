export default function TeamPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Team Management</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Invite team members and manage access roles.
      </p>

      <div
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Team Members</h2>
          <button
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--brand-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Invite Member
          </button>
        </div>

        {/* Roles legend */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span><strong>Owner</strong> — Full access</span>
          <span><strong>Admin</strong> — Manage credentials &amp; scans</span>
          <span><strong>Viewer</strong> — View reports only</span>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Team member list will appear here.
        </p>
      </div>
    </div>
  );
}
