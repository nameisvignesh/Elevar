'use client';

import { useEffect, useState } from 'react';

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shape, setShape] = useState('circle');

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest('video')) setShape('triangle');
      else if (target?.closest('a, button, .tilt-card, input, select, textarea')) setShape('square');
    };
    const out = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest('a, button, .tilt-card, input, select, textarea, video')) setShape('circle');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return <div className={`cursor-shape ${shape}`} style={{ left: position.x, top: position.y }} />;
}
