import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import backgroundImage from '../assets/images/background.jpg';

const HomePage = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('signin'); // 'signin' or 'signup'
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal ref for click outside
  const modalRef = useRef(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(storedUser);
    }
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  const openModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  // Mock user database (stored in localStorage)
  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const findUser = (email, password) => {
    const users = getUsers();
    return users.some(user => user.email === email && user.password === password);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userExists = findUser(email, password);
    if (userExists) {
      // Successful login
      localStorage.setItem('authUser', email);
      setIsLoggedIn(true);
      setCurrentUser(email);
      closeModal();
      // Automatically back to home page (modal closed, page remains)
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Check if user already exists
    const users = getUsers();
    if (users.some(user => user.email === email)) {
      setError('User already exists. Please sign in.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create new user
    saveUser({ email, password });
    // Auto login after signup
    localStorage.setItem('authUser', email);
    setIsLoggedIn(true);
    setCurrentUser(email);
    closeModal();
    // Automatically back to home page after signup/login
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="flex w-full flex-col gap-6 bg-zinc-900 text-white">
      {/* HERO */}
      <section
        className="border-y-2 border-zinc-800 bg-cover bg-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502136969935-8b81f5e5e29b?auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
              Hero Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Welcome to Vixtory Movies
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
              Vixtory Movies is your ultimate cinematic hub. Explore featured films, behind-the-scenes insights, director and cast interviews, and curated articles — all in a sleek, dark-themed layout that brings the magic of the movies to your screen.
            </p>
            
            {!isLoggedIn ? (
              <>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button to="/about" variant="primary">
                    Learn More
                  </Button>
                  <button
                    onClick={() => openModal('signin')}
                    className="rounded-full border border-orange-400 px-6 py-2.5 text-sm font-semibold text-orange-400 transition-all hover:bg-orange-400/10"
                  >
                    Sign In
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-400">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => openModal('signup')}
                    className="text-orange-400 transition-colors hover:text-orange-300"
                  >
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-800/50 p-5 backdrop-blur-sm">
                <p className="text-sm text-gray-300">
                  Welcome back, <span className="font-semibold text-orange-400">{currentUser}</span>!
                </p>
                <p className="mt-1 text-xs text-gray-400">You are now signed in.</p>
                <button
                  onClick={handleLogout}
                  className="mt-3 rounded-full bg-zinc-700 px-4 py-1.5 text-xs font-medium text-gray-200 transition hover:bg-zinc-600"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-600 bg-zinc-800 p-6 flex items-center justify-center">
            <img
              src={backgroundImage}
              alt="Vixtory Banner"
              className="w-full h-full object-cover rounded-[1.25rem]"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Quick overview blocks
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '12', label: 'Projects' },
            { value: '08', label: 'Sections' },
            { value: '24', label: 'Screens' },
            { value: '04', label: 'Layouts' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-5 text-center hover:scale-105 transition-transform"
            >
              <p className="text-2xl font-bold text-orange-400">{item.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y-2 border-zinc-800 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400">
            Features
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Simple wireframe cards
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Home Alone',
              desc: 'A young boy accidentally left behind must use his wits and creativity to defend his home from two burglars during Christmas.',
              img: 'https://i.pinimg.com/1200x/95/f5/ab/95f5ab9aaab5b15b61165ec01500a772.jpg',
            },
            {
              title: 'Toy Story',
              desc: 'When a new toy arrives, a jealous cowboy must work together with him to ensure both make it back to their owner.',
              img: 'https://i.pinimg.com/1200x/8e/bd/48/8ebd48f66f760c1066bb7f82204d8866.jpg',
            },
            {
              title: 'Cars',
              desc: 'A hotshot race car gets stranded in a small town and discovers that friendship and community are more important than winning.',
              img: 'https://i.pinimg.com/736x/11/75/b5/1175b5b020ee694988ef85f529de6dcc.jpg',
            },
          ].map((movie) => (
            <article
              key={movie.title}
              className="rounded-3xl border-2 border-zinc-700 bg-zinc-800 p-4 hover:scale-105 transition-transform"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-700 overflow-hidden">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-[1.25rem]"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                {movie.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                {movie.desc}
              </p>

              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* AUTH MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
          <div
            ref={modalRef}
            className="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-white">
                {modalMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {modalMode === 'signin'
                  ? 'Sign in to continue your cinematic journey'
                  : 'Join Vixtory Movies and explore unlimited stories'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={modalMode === 'signin' ? handleSignIn : handleSignUp}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {modalMode === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full rounded-full bg-orange-500 py-2.5 font-semibold text-white transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : modalMode === 'signin' ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>

            {/* Toggle between sign in / sign up */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                {modalMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => {
                    setModalMode(modalMode === 'signin' ? 'signup' : 'signin');
                    setError('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="ml-1 text-orange-400 transition-colors hover:text-orange-300"
                >
                  {modalMode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;