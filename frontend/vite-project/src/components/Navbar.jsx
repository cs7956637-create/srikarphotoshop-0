import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/80 z-50 py-3.5 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo Container */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 flex items-center justify-center bg-neutral-900 group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300">
            <img 
              src="/logo.png" 
              alt="Srikar Photo Studio Logo" 
              className="w-full h-full object-contain p-1"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-wider font-serif gold-gradient-text leading-tight">
              SRIKAR
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-sans -mt-0.5">
              Photo Studio
            </span>
          </div>
        </a>

        {/* Clean Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
          <a href="#about" className="hover:text-amber-400 transition-colors duration-200">About</a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors duration-200">Gallery</a>
          <a href="#services" className="hover:text-amber-400 transition-colors duration-200">Services</a>
          
          {/* Subtle Premium Action Button */}
          <a
            href="#contact"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold rounded-full group bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-amber-300 shadow-md shadow-amber-500/10 hover:shadow-amber-500/30 transition-all duration-300 active:scale-95"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-neutral-950 rounded-full group-hover:bg-opacity-0 group-hover:text-black">
              Book Shoot
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-amber-500 focus:outline-none p-2"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Clean Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-4 pb-6 border-t border-neutral-800/80 flex flex-col space-y-4 text-center text-sm font-medium text-neutral-300 bg-neutral-950/95 rounded-b-2xl shadow-xl">
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition-colors">About</a>
          <a href="#gallery" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition-colors">Gallery</a>
          <a href="#services" onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition-colors">Services</a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="inline-block mx-auto px-6 py-2 bg-amber-500 text-black font-bold rounded-full text-xs shadow-md shadow-amber-500/20"
          >
            Book Shoot
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;