import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-gray-400 py-8 px-6 text-center text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-amber-500">SRIKAR STUDIO</h3>
          <p className="text-xs text-gray-500 mt-1">Capturing your timeless moments.</p>
        </div>

        <p className="text-xs">
          &copy; {new Date().getFullYear()} Srikar Photo Studio. All rights reserved.
        </p>

        <div className="flex space-x-4 text-xs">
          <a href="#about" className="hover:text-amber-500 transition">About</a>
          <a href="#gallery" className="hover:text-amber-500 transition">Gallery</a>
          <a href="#services" className="hover:text-amber-500 transition">Services</a>
          <a href="#contact" className="hover:text-amber-500 transition">Contact</a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;