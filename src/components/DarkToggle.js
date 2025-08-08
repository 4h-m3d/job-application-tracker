import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function DarkToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('jat_dark') === '1');

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('jat_dark', dark ? '1' : '0');
  }, [dark]);

  return (
    <button aria-label="Toggle theme" onClick={() => setDark(d => !d)} className={clsx('p-2 rounded', dark ? 'bg-gray-700' : 'bg-gray-200')}>
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
