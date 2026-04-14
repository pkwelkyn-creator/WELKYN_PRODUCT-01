'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      router.push('/login?registered=true');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  const inputStyle = {
    padding: '0.625rem 0.75rem',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    outline: 'none',
    width: '100%',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Create Account</h2>

      {error && (
        <div style={{ padding: '0.75rem', background: '#fef2f2', color: '#dc2626', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
        <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required style={inputStyle} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Company Name</label>
        <input type="text" value={form.company} onChange={(e) => update('company', e.target.value)} required style={inputStyle} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required style={inputStyle} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
        <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={8} style={inputStyle} />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '0.75rem',
          background: 'var(--brand-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--brand-primary)', fontWeight: 500 }}>
          Sign In
        </Link>
      </p>
    </form>
  );
}
