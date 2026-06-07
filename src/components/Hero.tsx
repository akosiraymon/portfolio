import React from 'react';
import { Mail, Phone, MapPin, Linkedin, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const handleContactScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSec = document.querySelector('#contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWorksScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSec = document.querySelector('#projects');
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="hero" 
      className={`relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 ${
        darkMode ? 'bg-[#0D0D0D] text-[#E0E0E0] editorial-grid-dark' : 'bg-cream-bg text-black editorial-grid'
      }`}
    >
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-green/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-brand-green/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Metadata */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            id="hero-content-wrapper"
          >
            {/* Status Batch */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-neutral-900/40 dark:bg-black border border-neutral-200 dark:border-[#2A2A2A] px-3.5 py-1.5 rounded-none text-xs font-mono text-black dark:text-brand-green font-extrabold tracking-wider" id="availability-status">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              <span>Available for Hire & Consultations</span>
            </motion.div>
 
            {/* Profession / Name Area */}
            <div className="space-y-3">
              <motion.h1 
                variants={itemVariants} 
                className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight uppercase leading-none text-black dark:text-white"
                id="hero-role-title"
              >
                Building Systems That{" "}
                <span className="block text-brand-light-green dark:text-brand-green">
                  Run Without You.
                </span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants} 
                className="text-lg font-mono font-bold tracking-tight text-black dark:text-neutral-400"
                id="hero-personal-branding"
              >
                Hi, I'm <strong className="font-black text-black dark:text-brand-green">{PERSONAL_INFO.name}</strong> — {PERSONAL_INFO.title}
              </motion.p>
            </div>
 
            {/* Professional Statement */}
            <motion.p 
              variants={itemVariants} 
              className={`text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium ${
                darkMode ? 'text-neutral-400' : 'text-black'
              }`}
              id="hero-professional-summary"
            >
              {PERSONAL_INFO.summary}
            </motion.p>

            {/* Direct Contact Details Grid */}
            <motion.div 
              variants={itemVariants} 
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0 p-5 rounded-none border text-xs font-mono ${
                darkMode 
                  ? 'bg-black/90 border-[#2A2A2A] text-neutral-300' 
                  : 'bg-white border-cream-border text-black shadow-sm font-extrabold'
              }`}
              id="hero-contact-card"
            >
              <div className="flex items-center space-x-3" id="metric-location">
                <MapPin size={15} className="text-brand-light-green dark:text-brand-green flex-shrink-0" />
                <span className="text-black dark:text-neutral-300">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center space-x-3" id="metric-email">
                <Mail size={15} className="text-brand-light-green dark:text-brand-green flex-shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-black dark:text-neutral-300 hover:underline hover:text-brand-light-green dark:hover:text-brand-green break-all">{PERSONAL_INFO.email}</a>
              </div>
              <div className="flex items-center space-x-3" id="metric-phone">
                <Phone size={15} className="text-brand-light-green dark:text-brand-green flex-shrink-0" />
                <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="text-black dark:text-neutral-300 hover:underline hover:text-brand-light-green dark:hover:text-brand-green">{PERSONAL_INFO.phone}</a>
              </div>
              <div className="flex items-center space-x-3" id="metric-linkedin">
                <Linkedin size={15} className="text-brand-light-green dark:text-brand-green flex-shrink-0" />
                <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-black dark:text-neutral-300 hover:underline hover:text-brand-light-green dark:hover:text-brand-green">linkedin.com/in/RAcastano</a>
              </div>
            </motion.div>
 
            {/* CTA Actions */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero-actions-container"
            >
              <button
                onClick={handleContactScroll}
                className="w-full sm:w-auto px-6 py-4 px-8 text-xs font-mono font-bold uppercase tracking-widest bg-brand-light-green dark:bg-brand-green hover:bg-brand-light-green/90 dark:bg-brand-green text-[#0D0D0D] dark:text-[#0D0D0D] shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center space-x-2"
                id="hero-book-cta"
              >
                <span>Automate My Business</span>
                <ArrowRight size={16} />
              </button>
              
              <button
                onClick={handleWorksScroll}
                className={`w-full sm:w-auto px-6 py-4 px-8 text-xs font-mono font-black uppercase tracking-widest border hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center space-x-2 ${
                  darkMode 
                    ? 'border-[#2A2A2A] bg-black text-neutral-200 hover:bg-neutral-900' 
                    : 'border-black bg-white hover:bg-[#F5F4EF] text-black font-extrabold'
                }`}
                id="hero-portfolio-cta"
              >
                <span>View My Systems</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Interactive Flow visualizer */}
          <div className="lg:col-span-5 relative" id="hero-interactive-demo">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`rounded-2xl border p-6 font-mono relative overflow-hidden shadow-xl ${
                darkMode 
                  ? 'bg-neutral-900/90 border-neutral-800 text-neutral-200' 
                  : 'bg-white border-cream-border text-black'
              }`}
              id="hero-piping-visualizer"
            >
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-neutral-200 dark:border-neutral-800">
                <span className="text-xs uppercase tracking-wider text-brand-light-green dark:text-brand-green font-bold flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-brand-light-green dark:bg-brand-green inline-block animate-pulse"></span>
                  Active Pipeline Simulation
                </span>
                <span className="text-[10px] text-black font-extrabold dark:text-neutral-500">n8n Engine v2</span>
              </div>

              {/* Vertical flow steps visualizer */}
              <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-200 dark:before:bg-neutral-800">
                
                {/* Flow Block 1 - Trigger */}
                <div className="flex items-start space-x-4 relative" id="live-node-1">
                  <div className="z-10 w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/30 flex items-center justify-center font-display font-bold text-sm">
                    TR
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm font-bold tracking-tight text-black dark:text-white">Form Trigger (Webhook)</p>
                    <p className="text-xs text-black/80 dark:text-neutral-400 mt-0.5">Captures payload in JSON layout instantly</p>
                  </div>
                </div>

                {/* Connecting glow anim line */}
                <div className="absolute left-[19px] top-[40px] h-[32px] w-[2px] bg-gradient-to-b from-orange-400 to-indigo-400 animate-pulse"></div>

                {/* Flow Block 2 - AI Reasoning */}
                <div className="flex items-start space-x-4 relative" id="live-node-2">
                  <div className="z-10 w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 flex items-center justify-center font-display font-bold text-sm glowing-connector">
                    AI
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm font-bold tracking-tight text-black dark:text-white">Google Gemini Engine</p>
                    <p className="text-xs text-black/80 dark:text-neutral-400 mt-0.5">Categorizes, translates & extracts variables</p>
                  </div>
                </div>

                {/* Connecting glow anim line */}
                <div className="absolute left-[19px] top-[104px] h-[32px] w-[2px] bg-gradient-to-b from-cyan-400 to-emerald-400 animate-pulse"></div>

                {/* Flow Block 3 - Integration Router */}
                <div className="flex items-start space-x-4 relative" id="live-node-3">
                  <div className="z-10 w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center font-display font-bold text-sm">
                    OK
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm font-bold tracking-tight text-black dark:text-white">CRM & Notification Sync</p>
                    <p className="text-xs text-black/80 dark:text-neutral-400 mt-0.5">Logs in database & alerts team on Slack</p>
                  </div>
                </div>
              </div>

              {/* Box Footer Stats */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-black font-extrabold dark:text-neutral-500">Average Manual Prep</p>
                  <p className="text-lg font-bold font-display text-rose-600 dark:text-rose-500">30+ min</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-black font-extrabold dark:text-neutral-500">Automated Runtime</p>
                  <p className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-500">&lt; 2 min</p>
                </div>
              </div>

              {/* Status decoration row */}
              <div className="mt-4 pt-3 border-t border-dotted border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  99.9% Uptime
                </span>
                <span>Active thread: fb-gemini-agent</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
