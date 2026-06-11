import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIENCE, EDUCATION } from '../data';

interface ExperienceProps {
  darkMode: boolean;
}

export default function Experience({ darkMode }: ExperienceProps) {
  return (
    <section 
      id="experience" 
      className={`py-20 border-t transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#0D0D0D] border-[#2A2A2A] text-[#E0E0E0]' 
          : 'bg-cream-bg border-cream-border text-black'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-light-green dark:text-brand-green font-bold" id="exp-tagline">
            [ Professional Background ]
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase" id="exp-main-title">
            Experience & Education
          </h2>
          <div className="w-16 h-0.5 bg-brand-light-green dark:bg-brand-green mx-auto"></div>
          <p className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-neutral-400' : 'text-black'}`} id="exp-description">
            4+ years of dedicated professional consulting, no-code strategy consulting, and technical API construction.
          </p>
        </div>

        {/* Content Layout */}
        <div className="max-w-3xl mx-auto space-y-12" id="experience-content">
          
          {/* Timeline & Education */}
          <div className="space-y-12" id="timeline-column">
            
            {/* Experience Group */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-black uppercase flex items-center space-x-3 text-neutral-955 dark:text-white" id="heading-work-exp">
                <Briefcase className="text-brand-light-green dark:text-brand-green" size={20} />
                <span>Work Experience</span>
              </h3>

              <div className="space-y-8 relative before:absolute before:left-3.5 before:top-4 before:bottom-0 before:w-[2px] before:bg-cream-border dark:before:bg-[#2A2A2A]">
                {EXPERIENCE.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="relative pl-10"
                    id={`exp-item-${idx}`}
                  >
                    {/* Bullet pointer */}
                    <span className="absolute left-1.5 top-2 w-4 h-4 rounded-none border-2 bg-white dark:bg-black border-brand-light-green dark:border-brand-green flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-brand-light-green dark:bg-brand-green"></span>
                    </span>

                    {/* Metadata Header */}
                    <div className="mb-4">
                      <h4 className="text-lg font-display font-black text-black dark:text-white leading-normal uppercase">
                        {exp.company}
                      </h4>
                      <p className="text-xs font-mono text-brand-light-green dark:text-brand-green font-bold mt-1">
                        {exp.role} · <span className="text-black font-extrabold">{exp.period}</span>
                      </p>
                    </div>

                    {/* Bullet info */}
                    <ul className="space-y-3 text-sm font-semibold text-black dark:text-neutral-300">
                      {exp.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start space-x-2">
                          <span className="text-brand-light-green dark:text-brand-green mr-1.5 font-bold select-none">■</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education Group */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-display font-black uppercase flex items-center space-x-3 text-neutral-955 dark:text-white" id="heading-education">
                <GraduationCap className="text-brand-light-green dark:text-brand-green" size={20} />
                <span>Education</span>
              </h3>

              <div className="relative pl-10 before:absolute before:left-3.5 before:top-2 before:bottom-0 before:w-[2px] before:bg-cream-border dark:before:bg-[#2A2A2A]">
                {EDUCATION.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                    id={`edu-item-${idx}`}
                  >
                    {/* Bullet pointer */}
                    <span className="absolute -left-9 top-1.5 w-6 h-6 rounded-none border-2 bg-white dark:bg-black border-brand-light-green dark:border-brand-green flex items-center justify-center">
                      <GraduationCap size={12} className="text-brand-light-green dark:text-brand-green" />
                    </span>

                    <h4 className="text-base sm:text-lg font-display font-black text-black dark:text-white leading-normal uppercase">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-mono text-black font-extrabold dark:text-neutral-400 mt-1">
                      {edu.school} · <span className="font-bold text-brand-light-green dark:text-brand-green">{edu.year}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
