import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Experience & Certifications', href: '#experience' },
    { label: 'Previous Works', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#0D0D0D]/90 border-[#2A2A2A] text-[#E0E0E0]' 
        : 'bg-cream-bg/90 border-cream-border text-black'
    }`} id="portfolio-header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Name */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex flex-col items-start leading-none group"
            id="logo-brand"
          >
            <span className="font-display text-xl font-black tracking-tighter hover:text-brand-green dark:hover:text-brand-green transition-colors uppercase text-black dark:text-white">
              {PERSONAL_INFO.logoText}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-black/85 dark:text-brand-green/80 mt-1">
              Automation Specialist
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono font-bold tracking-widest" id="desktop-nav">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-brand-light-green dark:hover:text-brand-green transition-colors duration-200 relative py-1 flex items-center"
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="text-[9px] mr-1.5 opacity-40">0{idx + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Widgets */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Switcher Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all duration-200 hover:scale-105 cursor-pointer ${
                darkMode 
                  ? 'bg-neutral-900 border-brand-green/20 text-brand-green hover:bg-[#1C1C1F]' 
                  : 'bg-cream-card border-cream-border text-neutral-800 hover:bg-neutral-200'
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle visual theme"
              id="theme-toggler"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Quick Consultation CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center space-x-2 px-5 h-9 text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-neutral-800 bg-[#FF5A1F] text-white hover:bg-[#E04810] shadow-sm shadow-brand-green/10 transition-all duration-300"
              id="header-cta"
            >
              <Mail size={12} />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border cursor-pointer ${
                darkMode 
                  ? 'bg-neutral-900 border-brand-green/20 text-brand-green' 
                  : 'bg-cream-card border-cream-border text-neutral-800'
              }`}
              aria-label="Toggle theme mobile"
              id="theme-toggler-mobile"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full border cursor-pointer ${
                darkMode 
                  ? 'bg-[#121215] border-neutral-800 text-[#E0E0E0]' 
                  : 'bg-cream-card border-cream-border text-neutral-800'
              }`}
              aria-label="Open main menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t overflow-hidden ${
              darkMode ? 'bg-[#0D0D0D] border-[#2A2A2A]' : 'bg-cream-bg border-cream-border'
            }`}
            id="mobile-drawer-menu"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-mono tracking-widest font-bold transition-colors ${
                    darkMode 
                      ? 'hover:bg-neutral-900 text-[#E0E0E0] hover:text-white' 
                      : 'hover:bg-cream-card text-black hover:text-black font-extrabold'
                  }`}
                  id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span className="text-[10px] mr-2 opacity-50">0{idx + 1}</span>
                  {item.label}
                </a>
              ))}
              <div className="pt-2 px-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border border-neutral-900 dark:border-brand-green text-neutral-900 dark:text-brand-green hover:bg-neutral-900 hover:text-white dark:hover:bg-brand-green dark:hover:text-[#0D0D0D] transition-all"
                  id="mobile-cta"
                >
                  <Mail size={14} />
                  <span>Get Automated</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
