import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle(): JSX.Element | null {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      className={clsx(styles.toggleButton, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
      })}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
