import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/UserService';
import { setAuth } from '../../utils/auth';

const SignInPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const { data } = await loginUser(form);
      setAuth(data);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-zinc-900 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-800 p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
          Auth
        </p>
        <h1 className="mt-2 text-3xl font-bold">Sign In</h1>
        <p className="mt-3 text-sm leading-6 text-gray-300">Admins and editors can sign in to the dashboard.</p>

        {message && <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">{message}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            className="w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-zinc-600"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          Need an account?{' '}
          <Link className="font-semibold text-orange-400 hover:text-orange-300" to="/auth/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignInPage;
