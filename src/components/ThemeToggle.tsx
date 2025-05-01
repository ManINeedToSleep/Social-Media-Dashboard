'use client';

import { useEffect, useState } from 'react';

/**
 * Theme toggle component that switches between light and dark modes
 * Uses class-based dark mode strategy with Tailwind CSS
 * Features smooth animations and transitions between modes
 */
export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize based on:
    // 1. Stored preference if it exists
    // 2. System preference if no stored preference
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    } else {
      const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(darkModePreference.matches);
      
      // Update theme when system preference changes
      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      darkModePreference.addEventListener('change', handler);
      return () => darkModePreference.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Update document class when theme changes
    document.documentElement.classList.toggle('dark', isDark);
    
    // Store user preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark, isMounted]);

  if (!isMounted) return null;

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative overflow-hidden rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative h-6 w-12 rounded-full bg-gray-200 shadow-inner transition-colors duration-300 dark:bg-gray-700">
        <div 
          className={`absolute left-0.5 top-0.5 flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out ${
            isDark ? 'translate-x-6 bg-indigo-700' : 'translate-x-0'
          }`}
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle; 