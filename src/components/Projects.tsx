import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { Project, WorkflowStep, StepType } from '../types';
import { 
  Play, 
  Cpu, 
  ArrowRight, 
  ChevronRight, 
  Database, 
  Mail, 
  DollarSign, 
  FileText, 
  Layers, 
  Zap,
  Tag,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Search,
  Filter,
  X,
  ChevronLeft
} from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

export default function Projects({ darkMode }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxProjectIdx, setLightboxProjectIdx] = useState<number>(0);

  // Group Categories based on skills
  const categories = [
    { id: 'all', label: 'All Automation Systems' },
    { id: 'ai', label: 'AI Operations & Chatbots' },
    { id: 'crm', label: 'CRM & Pipeline Routing' },
    { id: 'finance', label: 'Financial & Bookkeeping' }
  ];

  const getFilteredProjects = () => {
    return PROJECTS.filter(project => {
      // Category Match
      const matchesCategory = 
        selectedCategory === 'all' ||
        (selectedCategory === 'ai' && project.id.includes('ai') || project.id.includes('gemini') || project.id.includes('sorter')) ||
        (selectedCategory === 'crm' && (project.id.includes('crm') || project.id.includes('enrichment') || project.id.includes('apply'))) ||
        (selectedCategory === 'finance' && project.id.includes('xero'));

      // Search Query Match
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  };

  const filteredProjects = getFilteredProjects();

  // Reset active project idx if it goes out of bounds of current filtered list
  const safeActiveIdx = activeProjectIdx >= filteredProjects.length ? 0 : activeProjectIdx;
  const currentProject = filteredProjects[safeActiveIdx];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxProjectIdx((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setLightboxProjectIdx((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, filteredProjects.length]);

  const openLightbox = (idx: number) => {
    setLightboxProjectIdx(idx);
    setIsLightboxOpen(true);
  };

  // Helper to color-code workflow nodes
  const getStepStyles = (type: StepType) => {
    switch (type) {
      case 'trigger':
        return {
          bg: 'bg-orange-500/5 dark:bg-black',
          border: 'border-orange-500/30 dark:border-orange-500/30',
          text: 'text-orange-600 dark:text-orange-400',
          icon: Play
        };
      case 'ai':
        return {
          bg: 'bg-brand-light-green/5 dark:bg-black',
          border: 'border-brand-light-green/30 dark:border-brand-green/30',
          text: 'text-brand-light-green dark:text-brand-green',
          icon: Sparkles
        };
      case 'database':
      case 'file':
        return {
          bg: 'bg-emerald-500/5 dark:bg-black',
          border: 'border-emerald-500/30 dark:border-emerald-500/30',
          text: 'text-emerald-600 dark:text-emerald-400',
          icon: Database
        };
      case 'email':
      case 'notification':
        return {
          bg: 'bg-purple-500/5 dark:bg-black',
          border: 'border-purple-500/30 dark:border-purple-500/30',
          text: 'text-purple-600 dark:text-purple-400',
          icon: Mail
        };
      case 'finance':
        return {
          bg: 'bg-amber-500/5 dark:bg-black',
          border: 'border-amber-500/30 dark:border-amber-500/30',
          text: 'text-amber-600 dark:text-amber-400',
          icon: DollarSign
        };
      default:
        return {
          bg: 'bg-indigo-500/5 dark:bg-black',
          border: 'border-indigo-500/30 dark:border-indigo-500/30',
          text: 'text-indigo-600 dark:text-indigo-400',
          icon: Cpu
        };
    }
  };

  return (
    <section 
      id="projects" 
      className={`py-20 border-t transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#0D0D0D] border-[#2A2A2A] text-[#E0E0E0]' 
          : 'bg-cream-bg border-cream-border text-black'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-light-green dark:text-brand-green font-bold" id="works-tagline">
            [ SOPs as Code ]
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase" id="works-main-title">
            Previous Works & Automated Pipelines
          </h2>
          <div className="w-16 h-0.5 bg-brand-light-green dark:bg-brand-green mx-auto"></div>
          <p className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-neutral-400' : 'text-black'}`} id="works-description">
            Explore 7 complete production systems I have built for clients. Toggle through listings, search integrations, and inspect real workflow graphs demonstrating how data migrates frictionlessly.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 w-full" id="filter-search-row">
          
          {/* Categories Tab Pill List */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto" id="category-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveProjectIdx(0);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-mono tracking-wide rounded-none border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-brand-light-green dark:bg-brand-green text-neutral-950 font-black border-transparent'
                    : darkMode
                      ? 'bg-neutral-950 border-[#2A2A2A] text-neutral-300 hover:bg-[#141414]'
                      : 'bg-white border-cream-border text-black hover:bg-[#FAF9F5] font-bold'
                }`}
                id={`cat-pill-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80" id="search-input-container">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search tools eg. Slack, Make..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveProjectIdx(0);
              }}
              className={`w-full pl-9 pr-4 py-2 text-sm border rounded-none focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green ${
                darkMode 
                  ? 'bg-neutral-950 border-[#2A2A2A] text-white placeholder-neutral-555' 
                  : 'bg-white border-cream-border text-neutral-900 placeholder-neutral-400'
              }`}
            />
          </div>

        </div>

        {/* Grid System: Selected System Detail Panel vs List Side Navigation */}
        {filteredProjects.length === 0 ? (
          <div className={`p-12 text-center rounded-none border border-dashed ${
            darkMode ? 'bg-black border-[#2A2A2A] text-neutral-400' : 'bg-white border-cream-border text-neutral-500'
          }`} id="no-projects-fallback">
            <Search size={32} className="mx-auto mb-4 text-brand-green opacity-60" />
            <p className="font-mono text-sm uppercase tracking-wider font-bold">No systems matched your filters.</p>
            <p className="text-xs mt-1">Try clearing your search query or choosing another system filter category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="projects-browser-layout">
            
            {/* LEFT NAVIGATION: Systems List (5 Column Span) */}
            <div className="lg:col-span-5 space-y-3 max-h-[550px] overflow-y-auto pr-2" id="projects-sidebar-list">
              <p className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-black dark:text-neutral-500 px-1">
                Matched System Models ({filteredProjects.length})
              </p>
              
              <div className="space-y-2.5">
                {filteredProjects.map((project, idx) => {
                  const isActive = idx === safeActiveIdx;
                  return (
                    <button
                      key={project.id}
                      onClick={() => setActiveProjectIdx(idx)}
                      className={`w-full text-left p-4 rounded-none border flex items-start space-x-3 transition-all duration-200 cursor-pointer ${
                        isActive
                          ? darkMode
                            ? 'bg-black border-brand-green text-brand-green shadow-none'
                            : 'bg-white border-brand-light-green text-brand-light-green shadow-none font-extrabold'
                          : darkMode
                            ? 'bg-black/40 border-[#2A2A2A] text-neutral-300 hover:bg-neutral-950 hover:border-neutral-700'
                            : 'bg-white border-cream-border text-black hover:bg-[#FAF9F5] hover:border-black font-bold'
                      }`}
                      id={`sidebar-link-${project.id}`}
                    >
                      <div className={`p-2 rounded-none border flex-shrink-0 ${
                        isActive 
                          ? 'bg-brand-green/10 text-brand-green border-brand-green/30' 
                          : 'bg-neutral-150 dark:bg-neutral-900 border-neutral-300 dark:border-[#2A2A2A] text-neutral-400'
                      }`}>
                        <Cpu size={16} />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-black tracking-tight text-sm sm:text-base truncate uppercase">
                            {project.title}
                          </h4>
                          {isActive && <ChevronRight size={16} className="text-brand-green flex-shrink-0" />}
                        </div>
                        <div className="flex items-center justify-between mt-1.5 gap-2">
                          <p className="text-[10px] font-mono tracking-wide text-neutral-600 dark:text-neutral-400 truncate flex-1">
                            {project.subtitle}
                          </p>
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(idx);
                            }}
                            className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 border border-brand-green/20 hover:border-brand-green text-brand-light-green dark:text-brand-green hover:bg-brand-green hover:text-black transition-all cursor-zoom-in"
                          >
                            SCREENSHOT
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT WORKBENCH: Interactive Selected System Blueprint Pane (7 Column Span) */}
            <div className="lg:col-span-7" id="projects-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`border p-6 sm:p-8 space-y-6 rounded-none ${
                    darkMode ? 'bg-black border-[#2A2A2A]' : 'bg-white border-cream-border'
                  }`}
                  id={`detail-panel-${currentProject.id}`}
                >
                  {/* Blueprint Panel Header */}
                  <div className="border-b pb-4 border-neutral-200 dark:border-[#2A2A2A] space-y-2">
                    <span className="inline-block font-mono text-[10px] font-bold text-brand-light-green dark:text-brand-green uppercase tracking-widest animate-pulse">
                      ● SYSTEM INTEGRATION ARCHITECTURE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-black dark:text-white">
                      {currentProject.title}
                    </h3>
                    <p className="text-sm font-mono font-medium text-brand-light-green dark:text-brand-green">
                      {currentProject.subtitle}
                    </p>
                  </div>

                  {/* Flowchart Diagram Representation (Zapier / n8n layout replica) */}
                  <div className="space-y-3" id={`workflow-area-${currentProject.id}`}>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-black font-extrabold dark:text-neutral-500">
                      Data Migration Flow Chart
                    </p>
                    
                    {/* Flow diagram viewport wrapper */}
                    <div className={`p-4 sm:p-5 border rounded-none overflow-x-auto ${
                      darkMode ? 'bg-neutral-950 border-[#2A2A2A]' : 'bg-[#FAF9F5] border-cream-border'
                    }`}>
                      <div className="flex flex-col space-y-4" id={`flowchart-nodes-${currentProject.id}`}>
                        {currentProject.workflow.map((step, sIdx) => {
                          const config = getStepStyles(step.type);
                          const NodeIcon = config.icon;
                          
                          return (
                            <div key={sIdx} className="flex flex-col items-center">
                              {/* Connector arrow pointing downward */}
                              {sIdx > 0 && (
                                <div className="h-6 w-[2px] bg-brand-light-green/30 dark:bg-brand-green/20 relative">
                                  <div className="absolute -bottom-1.5 -left-[5px] border-l-6 border-r-6 border-t-6 border-transparent border-t-brand-light-green/30 dark:border-t-brand-green/20 w-0 h-0"></div>
                                </div>
                              )}
                              
                              {/* Workflow Node block */}
                              <div className={`flex items-center space-x-3 w-full max-w-md p-3.5 rounded-none border transition-all duration-300 ${config.bg} ${config.border}`}>
                                {/* Step Indicator */}
                                <div className={`w-8 h-8 rounded-none flex items-center justify-center border font-mono font-bold text-xs flex-shrink-0 ${config.text} ${config.border}`}>
                                  {sIdx === 0 ? 'TG' : sIdx + 1}
                                </div>
                                
                                {/* Info details */}
                                <div className="min-w-0 flex-1 font-mono">
                                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-black dark:text-neutral-500">
                                    {step.type === 'trigger' ? 'System Trigger' : `Action - ${step.type}`}
                                  </p>
                                  <h5 className="text-xs font-black tracking-tight text-black dark:text-white truncate uppercase">
                                    {step.label}
                                  </h5>
                                  {step.details && (
                                    <p className="text-[11px] text-black/90 dark:text-neutral-400 mt-0.5 truncate font-bold">
                                      &gt; {step.details}
                                    </p>
                                  )}
                                </div>
                                <NodeIcon size={16} className={`${config.text} flex-shrink-0`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Real Production Screenshot Card */}
                  {currentProject.imageUrl && (
                    <div className="space-y-3" id={`screenshot-area-${currentProject.id}`}>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#999999] font-extrabold flex items-center justify-between">
                        <span>Original Production Blueprint</span>
                        <span className="text-[9px] text-brand-light-green dark:text-brand-green font-bold select-none">[ CLICK FOR LIGHTBOX ]</span>
                      </p>
                      <div 
                        onClick={() => openLightbox(safeActiveIdx)}
                        className={`group relative overflow-hidden border cursor-zoom-in transition-all duration-300 ${
                          darkMode 
                            ? 'bg-neutral-950 border-[#2A2A2A] hover:border-brand-green/50' 
                            : 'bg-[#FAF9F5] border-cream-border hover:border-brand-light-green'
                        }`}
                        id={`screenshot-container-${currentProject.id}`}
                      >
                        <div className="aspect-[16/7] md:aspect-[16/6] w-full overflow-hidden flex items-center justify-center bg-black/10 dark:bg-black/45">
                          <img 
                            src={currentProject.imageUrl} 
                            alt={`${currentProject.title} screenshot`}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center backdrop-blur-xs font-mono font-bold">
                          <span className="bg-brand-green text-black font-mono text-[11px] font-bold px-3 py-1.5 flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <ExternalLink size={12} />
                            EXPAND BLUEPRINT SCREENSHOT
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Context and Bullet Descriptions */}
                  <div className="space-y-4">
                    <p className={`text-sm leading-relaxed font-semibold ${darkMode ? 'text-neutral-350' : 'text-black'}`}>
                      {currentProject.description}
                    </p>

                    <ul className="space-y-2.5 text-xs text-black font-bold dark:text-neutral-300" id={`bullet-desc-${currentProject.id}`}>
                      {currentProject.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-2">
                          <span className="text-brand-light-green dark:text-brand-green font-extrabold select-none">■</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Block Stack tools array */}
                  <div className="pt-4 border-t border-[#D9D8D3] dark:border-[#2A2A2A] space-y-2.5">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-black/90 dark:text-neutral-500 font-black">
                      Tools & Protocols Orchestrated
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.stack.map((stackItem) => (
                        <span
                          key={stackItem}
                          className={`text-xs font-mono px-2.5 py-0.5 rounded-none border font-black ${
                            darkMode 
                              ? 'bg-neutral-950 border-[#2A2A2A] text-brand-green' 
                              : 'bg-white border-cream-border text-black'
                          }`}
                        >
                          {stackItem}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>

      {/* Lightbox / Screenshot Modal Overlay */}
      <AnimatePresence>
        {isLightboxOpen && filteredProjects[lightboxProjectIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/92 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button with escape key action handled in useEffect */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/25 p-2 rounded-none transition-all cursor-pointer border border-white/15"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Navigation Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxProjectIdx((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
              }}
              className="absolute left-4 md:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/25 p-2.5 rounded-none transition-all cursor-pointer border border-white/15"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Main Interactive Content Block */}
            <motion.div
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="max-w-5xl w-full flex flex-col items-center space-y-4"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking actual image
            >
              {/* Screenshot Header Info */}
              <div className="text-center space-y-1 w-full max-w-4xl px-4">
                <span className="font-mono text-[9px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-2.5 py-0.5 inline-block">
                  ● INTERACTION MODEL SCREENSHOT ({lightboxProjectIdx + 1} of {filteredProjects.length})
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-display font-black text-white uppercase tracking-tight mt-1.5">
                  {filteredProjects[lightboxProjectIdx].title}
                </h3>
                <p className="text-[10px] sm:text-xs font-mono text-neutral-400">
                  {filteredProjects[lightboxProjectIdx].subtitle}
                </p>
              </div>

              {/* High-res Image Wrapper with shadow effects */}
              <div className="relative border border-neutral-800 bg-neutral-950 w-full max-h-[66vh] flex items-center justify-center overflow-auto p-1 sm:p-2">
                <img
                  src={filteredProjects[lightboxProjectIdx].imageUrl}
                  alt={`${filteredProjects[lightboxProjectIdx].title} Workflow screenshot`}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[62vh] object-contain"
                />
              </div>

              {/* Extra micro-details footer */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl px-4 pt-1.5">
                {filteredProjects[lightboxProjectIdx].stack.map((item) => (
                  <span key={item} className="text-[10px] font-mono bg-neutral-900 border border-neutral-850 text-brand-green px-2.5 py-0.5">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Navigation Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxProjectIdx((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-4 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/25 p-2.5 rounded-none transition-all cursor-pointer border border-white/15"
              aria-label="Next screenshot"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
