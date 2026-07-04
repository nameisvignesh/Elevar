'use client';

import { useTheme } from 'next-themes';
import { MoonStar, SunMedium, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="theme-toggle" aria-label="Theme controls">
      {['light', 'dark', 'system'].map((mode) => {
        const active = theme === mode || (mode === 'system' && !theme);
        const Icon = mode === 'light' ? SunMedium : mode === 'dark' ? MoonStar : Monitor;
        return (
          <button key={mode} className={active ? 'active' : ''} onClick={() => setTheme(mode)} title={`${mode} mode`} aria-label={`${mode} mode`}>
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
