
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Minimalist Dev. Built with passion and clean code.
            </p>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
              <i className="fa-brands fa-github text-xl"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Fast & Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
