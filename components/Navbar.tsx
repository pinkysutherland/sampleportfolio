
import React, { useState } from 'react';
import { NavItem } from '../types';

interface NavbarProps {
  currentPath: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '#/' },
  { label: 'About', path: '#/about' },
  { label: 'Contact', path: '#/contact' },
];

const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Dev.<span className="text-slate-900">Portfolio</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  (currentPath === item.path || (currentPath === '' && item.path === '#/'))
                    ? 'text-indigo-600'
                    : 'text-slate-600'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#/contact"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-indigo-600 focus:outline-none"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  currentPath === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
