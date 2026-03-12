'use client';

import Link from 'next/link';
import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Explicitly enforce light mode by removing the dark class just in case
    document.documentElement.classList.remove('dark');
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b-0 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-[22px] sm:text-xl group shrink-0">
          <div className="p-2 hidden sm:block bg-primary dark:bg-primary-light rounded-xl shadow-lg shadow-primary/20 dark:shadow-primary-light/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-primary dark:text-primary-light  font-extrabold tracking-tight  ">CryptoTracker</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-all duration-300 relative py-1 ${
              pathname === '/' 
                ? 'text-primary dark:text-primary-light font-semibold' 
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
          >
            Markets
            {pathname === '/' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary dark:bg-primary-light rounded-full animate-in fade-in slide-in-from-bottom-1" />
            )}
          </Link>
          <Link 
            href="/portfolio" 
            className={`text-sm font-medium transition-all duration-300 relative py-1 ${
              pathname === '/portfolio' 
                ? 'text-primary dark:text-primary-light font-semibold' 
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
          >
            Portfolio
            {pathname === '/portfolio' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary dark:bg-primary-light rounded-full animate-in fade-in slide-in-from-bottom-1" />
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
