import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/90 text-[var(--color-text-muted)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">MineGuard</p>
          <p className="text-xs">
            Smart wearable alert platform keeping underground crews safe and connected.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[var(--color-text-muted)]">
          <Link to="/" className="transition hover:text-[var(--color-accent-strong)]">
            Home
          </Link>
          <Link to="/dashboard" className="transition hover:text-[var(--color-accent-strong)]">
            Dashboard
          </Link>
          <Link to="/devices" className="transition hover:text-[var(--color-accent-strong)]">
            Devices
          </Link>
          <Link to="/chatbot" className="transition hover:text-[var(--color-accent-strong)]">
            Assistant
          </Link>
        </div>

        <ThemeToggle compact />
      </div>
    </footer>
  );
};

export default Footer;


