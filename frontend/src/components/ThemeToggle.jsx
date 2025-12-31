import { SunMedium, Moon, MonitorCog } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useMemo, useState } from 'react';

const options = [
  { label: 'Light', value: 'light', icon: SunMedium },
  { label: 'Dark', value: 'dark', icon: Moon },
  { label: 'System', value: 'system', icon: MonitorCog },
];

const ThemeToggle = ({ compact = false }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const ActiveIcon = useMemo(() => {
    const match = options.find((option) => option.value === theme);
    if (match) {
      return match.icon;
    }
    return resolvedTheme === 'dark' ? Moon : SunMedium;
  }, [theme, resolvedTheme]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text)] shadow-sm transition hover:shadow-md"
        aria-expanded={open}
      >
        <ActiveIcon className="h-4 w-4" />
        {!compact && <span className="hidden sm:inline">Theme</span>}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-3 w-40 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-sm shadow-xl">
          {options.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition ${
                theme === value ? 'bg-[var(--color-surface-strong)] text-[var(--color-text-strong)]' : 'hover:bg-[var(--color-surface-soft)]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;


