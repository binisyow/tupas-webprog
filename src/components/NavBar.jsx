import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200',
    isActive
      ? 'bg-orange-500 text-white'
      : 'text-gray-300 hover:bg-white/10',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed top-0 w-full bg-zinc-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="https://clipartcraft.com/images/transparent-background-logo-3.png"
            alt="Logo"
            className="w-14 h-14 rounded-full object-cover"
          />
          <span className="font-bold text-xl text-white">M Movies</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex gap-3">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default NavBar;