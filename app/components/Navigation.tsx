'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const links = [
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/#services', label: 'Services' },
    { href: '/#process', label: 'Process' },
    { href: '/#about', label: 'About' }
  ];

  useEffect(() => {
    const syncActiveHash = () => setActiveHash(window.location.hash || '');

    syncActiveHash();
    window.addEventListener('hashchange', syncActiveHash);

    return () => window.removeEventListener('hashchange', syncActiveHash);
  }, []);

  return (
    <header className="nav-wrap">
      <nav className="container nav">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Elevar logo" width={40} height={40} className="brand-mark" priority />
          <div>
            <strong style={{
              background: "linear-gradient(90deg, #ff3b30, #ff8a00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Elevar
            </strong>
            <span style={{color: "#fff"}}>Content systems for founders</span>
          </div>
        </Link>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => {
            const hash = link.href.split('#')[1];
            const isActive = pathname === '/' && activeHash === `#${hash}`;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? 'active' : ''}
                onClick={() => {
                  setActiveHash(`#${hash}`);
                  setOpen(false);
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <Link href="/book-call" className="btn btn-primary compact" onClick={() => setOpen(false)}>Book Call</Link>
        </div>
        <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
    </header>
  );
}
