'use client';

import Link from 'next/link';
import { useUiStore } from '../../store/ui.store';
import { Moon, Sun, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const { theme, toggleTheme } = useUiStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // wait for mount to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-gray-100">
          <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          <span>CryptoTracker</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors ${
              pathname === '/' 
                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Markets
          </Link>
          <Link 
            href="/portfolio" 
            className={`text-sm font-medium transition-colors ${
              pathname === '/portfolio' 
                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Portfolio
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </div>
    </header>
  );
};
