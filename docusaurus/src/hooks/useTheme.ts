import { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export const useTheme = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme: colorMode,
    toggleTheme,
    mounted,
  };
};
