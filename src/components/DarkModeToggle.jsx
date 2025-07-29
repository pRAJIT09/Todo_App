import { useEffect, useState } from 'react';

const LS_KEY_THEME = 'todoapp.theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(LS_KEY_THEME);
  if (stored === 'light' || stored === 'dark') return stored;
  // fallback to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function DarkModeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(LS_KEY_THEME, theme);
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-md border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-pressed={isDark}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}