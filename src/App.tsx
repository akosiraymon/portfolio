import { useState, useEffect, MouseEvent } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { PERSONAL_INFO } from './data';
import { Sparkles, Layout, Zap, Flame, ShieldAlert, Cpu, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Track scroll for "Back to top" visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer Motion scroll hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track coordinates of global clicks to trigger tactical feedback
  const handleGlobalClick = (e: MouseEvent<HTMLDivElement>) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY
    };
    setRipples(prev => [...prev, newRipple].slice(-8));
  };

  const clearRipple = (id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      onClick={handleGlobalClick}
      className={`min-h-screen transition-colors duration-300 font-sans relative ${
        darkMode ? 'bg-neutral-950 text-[#E0E0E0] dark' : 'bg-white text-black'
      }`} 
      id="portfolio-app-root"
    >
      {/* 🚀 Thin Scrolling Progress Indicator at very top */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-light-green dark:bg-brand-green z-[100] origin-left pointer-events-none" 
        style={{ scaleX }} 
      />

      {/* 🖱️ Cosmic Interactivity Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onAnimationComplete={() => clearRipple(ripple.id)}
            className="fixed pointer-events-none rounded-full border-2 border-brand-light-green dark:border-brand-green bg-brand-light-green/5 dark:bg-brand-green/5 z-[99] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Dynamic Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Sections */}
      <main className="relative" id="portfolio-sections">
        
        {/* Hero Area */}
        <Hero darkMode={darkMode} />

        {/* Brand Core Skill Carousel Ribbon */}
        <div className={`overflow-hidden py-3.5 border-b font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
          darkMode 
            ? 'bg-[#121215] border-[#16161A] text-brand-green/90' 
            : 'bg-white border-cream-border text-brand-light-green'
        }`} id="brand-ribbon">
          <div className="flex animate-marquee whitespace-nowrap gap-8 justify-around items-center">
            <span className="flex items-center gap-1 font-bold">[<Zap size={10} className="mx-1" /> Zapier Certified Expert ]</span>
            <span className="hidden sm:flex items-center gap-1 font-bold">[<Cpu size={10} className="mx-1" /> Make Advanced Scenarios ]</span>
            <span className="flex items-center gap-1 font-bold">[<Flame size={10} className="mx-1" /> n8n & Gemini AI Systems ]</span>
            <span className="hidden md:flex items-center gap-1 font-bold">[<Layout size={10} className="mx-1" /> Minimal-Friction Architecture ]</span>
          </div>
        </div>

        {/* Services Showcase */}
        <Services darkMode={darkMode} />

        {/* Previous Works (Interactive Flow blueprints) */}
        <Projects darkMode={darkMode} />

        {/* Experience, Education Timeline & Certifications List */}
        <Experience darkMode={darkMode} />

        {/* Contact Webhook Thread triggers */}
        <Contact darkMode={darkMode} />

      </main>

      {/* Floating Tactical Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-3.5 z-50 rounded-full border font-mono font-bold tracking-wider text-xs transition-colors duration-200 cursor-pointer flex items-center justify-center space-x-1 shadow-md ${
              darkMode 
                ? 'bg-neutral-900 border-brand-green/30 text-brand-green hover:bg-[#151519] shadow-brand-green/5' 
                : 'bg-white border-black text-black hover:bg-neutral-100'
            }`}
            id="back-to-top-button"
            title="SOP Scroll Top"
          >
            <ArrowUp size={14} className="animate-bounce" />
            <span className="hidden sm:inline text-[10px] uppercase">TOP</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Structured Footer */}
      <footer className={`border-t py-12 px-4 transition-colors duration-300 ${
        darkMode ? 'bg-[#070708] border-[#16161A] text-neutral-400' : 'bg-cream-bg border-cream-border text-black font-semibold'
      }`} id="portfolio-footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-8 border-cream-border dark:border-[#2A2A2A]">
            {/* Left label logo */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-display text-xl font-black tracking-wider uppercase text-neutral-950 dark:text-white flex items-center">
                {PERSONAL_INFO.logoText}
                <span className="text-brand-light-green dark:text-brand-green ml-1 select-none">■</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#888] mt-1">
                AI workflow & automation specialist
              </span>
            </div>

            {/* Middle Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono uppercase tracking-wider font-bold">
              <a href="#services" className="hover:text-brand-light-green dark:hover:text-brand-green transition-colors">Services</a>
              <a href="#projects" className="hover:text-brand-light-green dark:hover:text-brand-green transition-colors">Works</a>
              <a href="#experience" className="hover:text-brand-light-green dark:hover:text-brand-green transition-colors">Experience</a>
              <a href="#contact" className="hover:text-brand-light-green dark:hover:text-brand-green transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-mono text-center sm:text-left">
            <p>© {new Date().getFullYear()} RA CASTANO. Licensed System Operations.</p>
            <p className="text-[#888]">
              Designed with flat grid geometry. Cast in Manila, PH.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
