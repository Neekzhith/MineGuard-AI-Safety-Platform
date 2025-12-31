import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { setAuth } from '../utils/auth';
import { AuthContext } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await API.post('/auth/login', form);
      setAuth(data.token, data.user);
      setUser(data.user);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to login. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-text-muted)]">Secure access</p>
      <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text)]">Welcome back</h2>
      <p className="text-sm text-[var(--color-text-muted)]">Sign in to manage underground safety operations.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-3 text-sm focus:border-[var(--color-highlight)] focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]/30"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text)]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-3 text-sm focus:border-[var(--color-highlight)] focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]/30"
          />
        </div>

        {error && <p className="text-sm text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        New to MineGuard?{' '}
        <Link to="/register" className="font-semibold text-[var(--color-accent)] hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;




