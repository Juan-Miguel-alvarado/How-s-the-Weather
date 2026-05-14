import { IconSun, IconMoon } from '@tabler/icons-react';
import './ThemeToggle.css';

interface Props {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <IconMoon size={18} stroke={1.5} /> : <IconSun size={18} stroke={1.5} />}
    </button>
  );
}
