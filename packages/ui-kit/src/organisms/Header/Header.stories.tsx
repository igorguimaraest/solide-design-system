import React, { useState } from 'react';
import { Header } from './Header';

export default {
  title: 'Organisms/Header',
  component: Header,
};

export const Default = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <div className="w-full bg-[var(--solide-surface-canvas)] min-h-[140px]">
      <Header
        currentTheme={theme}
        onThemeToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        onSearchClick={() => alert('Abrir Command Palette')}
      />
    </div>
  );
};
