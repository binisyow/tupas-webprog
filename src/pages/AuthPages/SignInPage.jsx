import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-zinc-900 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-800 p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
          Auth
        </p>
        <h1 className="mt-2 text-3xl font-bold">Sign In</h1>
        <p className="mt-3 text-sm leading-6 text-gray-300">
          Use this page for your login form when you separate authentication from the home modal.
        </p>

        <form className="mt-6 space-y-4">
          <input
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400"
            type="email"
            placeholder="Email address"
          />
          <input
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-orange-400"
            type="password"
            placeholder="Password"
          />
          <button className="w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
            Sign In
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
