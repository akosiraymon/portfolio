import React from 'react';
import { Cpu, Bot, Webhook, Workflow, Shield, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';

interface ServicesProps {
  darkMode: boolean;
}

const iconsMap: Record<string, React.ComponentType<any>> = {
  Cpu,
  Bot,
  Webhook,
  Workflow,
  Shield,
  Award
};

export default function Services({ darkMode }: ServicesProps) {
  return (
    <section 
      id="services" 
      className={`py-20 border-t transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#0D0D0D] border-[#2A2A2A] text-[#E0E0E0]' 
          : 'bg-cream-bg border-cream-border text-black'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-light-green dark:text-brand-green font-bold" id="services-tagline">
            [ Specialized Solutions Architecture ]
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase" id="services-main-title">
            What I Design & Deploy
          </h2>
          <div className="w-16 h-0.5 bg-brand-light-green dark:bg-brand-green mx-auto"></div>
          <p className={`text-base font-semibold ${darkMode ? 'text-neutral-400' : 'text-black'}`} id="services-description">
            I help modern small businesses, marketing agencies, and remote sales teams eliminate manual friction by converting human tasks into reliable digital flow loops.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-cards-grid">
          {SERVICES.map((service, idx) => {
            const IconComponent = iconsMap[service.iconName] || Cpu;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col h-full rounded-none border p-6 sm:p-8 transition-all duration-300 ${
                  darkMode 
                    ? 'bg-black border-[#2A2A2A] hover:border-brand-green/50 hover:bg-[#111111]' 
                    : 'bg-white border-cream-border hover:border-brand-light-green/50 hover:bg-[#FAF9F5]'
                }`}
                id={`service-card-${service.id}`}
              >
                {/* Card Title & Icon */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`p-3 rounded-none border ${
                    darkMode 
                      ? 'bg-neutral-900 border-[#2A2A2A] text-brand-green' 
                      : 'bg-neutral-100 border-neutral-300 text-brand-light-green'
                  }`} id={`service-icon-${service.id}`}>
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-black dark:text-white" id={`service-title-${service.id}`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm mt-1 leading-normal font-bold ${darkMode ? 'text-neutral-400' : 'text-black'}`} id={`service-desc-${service.id}`}>
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Scope Points */}
                <ul className="space-y-3 flex-1 mb-6 text-sm" id={`service-bullets-${service.id}`}>
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-3 font-bold text-black dark:text-neutral-300">
                      <CheckCircle2 size={15} className="text-brand-light-green dark:text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tool Badges */}
                <div className="pt-4 border-t border-[#D9D8D3] dark:border-[#2A2A2A]" id={`service-tools-${service.id}`}>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-black font-extrabold dark:text-neutral-500 mb-2">
                    Core Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`text-xs font-mono px-2 py-0.5 rounded-none border font-bold ${
                          darkMode 
                            ? 'bg-black border-[#2A2A2A] text-brand-green' 
                            : 'bg-white border-cream-border text-black'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
