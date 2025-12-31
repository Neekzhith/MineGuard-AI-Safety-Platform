import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../App';
import ThemeToggle from './ThemeToggle';

const links = [
  { to: '/', label: 'Home', private: false },
  { to: '/dashboard', label: 'Dashboard', private: true },
  { to: '/devices', label: 'Devices', private: true },
  { to: '/chatbot', label: 'Chatbot', private: true },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // --- THIS IS THE FIX ---
  // A solid white text shadow for light mode.
  // Reduced blur radius from 2px back to 1px.
  const lightTextShadow = '[text-shadow:_0_1px_1px_rgb(255_255_255_/_95%)]';
  // We explicitly remove the shadow in dark mode.
  const noTextShadow = 'dark:[text-shadow:none]';

  // Apply the shadow to light-mode text classes
  const textColorClass = `text-slate-800 ${lightTextShadow} dark:text-white ${noTextShadow}`;
  const mutedColorClass = `text-slate-600 ${lightTextShadow} dark:text-slate-300 ${noTextShadow}`;
  
  // Standard hover/active classes (no shadow needed on active)
  const hoverColorClass = 'hover:text-slate-800 dark:hover:text-slate-100';
  const activeColorClass = 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white';
  
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4">
        
        {/* 1. Brand link with shadow */}
        <Link to="/" className={`text-xl font-semibold transition-colors duration-300 ${textColorClass}`}>
          MineGuard
        </Link>

        {/* 2. Nav links with shadow */}
        <nav className={`flex flex-1 flex-wrap items-center justify-center gap-2 text-sm font-medium transition-colors duration-300`}>
          {links
            .filter((link) => !link.private || user)
            .map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? activeColorClass // Active link is solid, no shadow
                      : `${mutedColorClass} ${hoverColorClass}` // Inactive links get shadow
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              {/* 3. User name with shadow */}
              <span className={`hidden text-sm font-medium transition-colors duration-300 ${mutedColorClass} sm:inline`}>
                {user.name}
              </span>
              {/* Logout button (solid color for visibility) */}
              <button
                onClick={logout}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 bg-orange-500 text-white hover:bg-orange-600`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* 4. Login link with shadow */}
              <Link
                to="/login"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${mutedColorClass} ${hoverColorClass}`}
              >
                Login
              </Link>
              {/* Register button (solid color for visibility) */}
              <Link
                to="/register"
                className={`rounded-full px-4 py-2 text-sm font-semibold shadow-md transition-all duration-300 bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900 dark:hover:bg-slate-600`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;