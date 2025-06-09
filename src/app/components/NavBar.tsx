
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">N</span>
            </div>
            <h1 className="text-xl font-bold text-white">NEET Portal</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/practice" className="text-purple-300 hover:text-white transition-colors">
              Practice
            </Link>
            <Link href="/neet-mock-tests" className="text-purple-300 hover:text-white transition-colors">
              Mock Tests
            </Link>
            <Link href="/flashcards" className="text-purple-300 hover:text-white transition-colors">
              Flashcards
            </Link>
            <Link href="/progress" className="text-purple-300 hover:text-white transition-colors">
              Progress
            </Link>
            <Link href="/profile" className="text-purple-300 hover:text-white transition-colors">
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-purple-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-purple-500/20">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/practice" 
                className="text-purple-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Practice
              </Link>
              <Link 
                href="/mock-tests" 
                className="text-purple-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mock Tests
              </Link>
              <Link 
                href="/flashcards" 
                className="text-purple-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Flashcards
              </Link>
              <Link 
                href="/progress" 
                className="text-purple-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Progress
              </Link>
              <Link 
                href="/profile" 
                className="text-purple-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
