import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Copy, Check, Send, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data';

interface ContactProps {
  darkMode: boolean;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function Contact({ darkMode }: ContactProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load local inquiries if any
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ra_castano_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage lookup failed", e);
    }
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    // Simulate pipeline trigger execution
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('ra_castano_inquiries', JSON.stringify(updated));

      // Reset Form states
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setShowSuccess(true);

      // Hide success banner after some time
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1200);
  };

  const clearInquiry = (id: string) => {
    const filtered = inquiries.filter(item => item.id !== id);
    setInquiries(filtered);
    localStorage.setItem('ra_castano_inquiries', JSON.stringify(filtered));
  };

  return (
    <section 
      id="contact" 
      className={`py-20 border-t transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#070708] border-[#16161A] text-[#E0E0E0]' 
          : 'bg-cream-bg border-cream-border text-black'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-bold" id="contact-tagline">
            [ Connect Instantly ]
          </p>
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase" id="contact-main-title">
            Trigger a Consultation Thread
          </h2>
          <div className="w-16 h-0.5 bg-brand-green mx-auto"></div>
          <p className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-neutral-400' : 'text-neutral-800'}`} id="contact-description">
            Get an automated operation audit. Send your project details, or copy my contact properties below to schedule a callback.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-form-layout">
          
          {/* LEFT COLUMN: Properties Card (5 columns span) */}
          <div className="lg:col-span-5 space-y-6" id="contact-details-panel">
            <h3 className="text-xl font-display font-black uppercase text-black dark:text-white" id="heading-contact-info">
              System Configuration Properties
            </h3>

            {/* Quick Copies Container */}
            <div className="space-y-4 font-mono" id="properties-container">
              
              {/* Location Badge */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                darkMode ? 'bg-[#121215] border-[#222226]' : 'bg-white border-cream-border'
              }`} id="contact-node-loc">
                <div className="flex items-center space-x-3 text-sm min-w-0">
                  <span className="p-2 rounded-xl bg-neutral-100 dark:bg-[#1C1C22] text-brand-green border border-cream-border dark:border-[#2A2A2A] flex-shrink-0">
                    <MapPin size={16} />
                  </span>
                  <div className="truncate">
                    <p className="text-[9px] text-[#FF5A1F] font-extrabold uppercase tracking-wider leading-none">Property location</p>
                    <p className="text-xs font-bold text-black dark:text-neutral-200 truncate mt-1 uppercase">{PERSONAL_INFO.location}</p>
                  </div>
                </div>
              </div>

              {/* Email Badge */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                darkMode ? 'bg-[#121215] border-[#222226]' : 'bg-white border-cream-border'
              }`} id="contact-node-email">
                <div className="flex items-center space-x-3 text-sm min-w-0 flex-1">
                  <span className="p-2 rounded-xl bg-neutral-100 dark:bg-[#1C1C22] text-brand-green border border-cream-border dark:border-[#2A2A2A] flex-shrink-0">
                    <Mail size={16} />
                  </span>
                  <div className="truncate flex-1">
                    <p className="text-[9px] text-[#FF5A1F] font-extrabold uppercase tracking-wider leading-none">Callback email</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-bold text-black dark:text-neutral-100 hover:underline hover:text-brand-green block truncate mt-1">{PERSONAL_INFO.email}</a>
                  </div>
                </div>
                
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    copiedField === 'email'
                      ? 'bg-brand-green/10 border-brand-green/35 text-brand-green'
                      : darkMode
                        ? 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
                        : 'bg-white border-cream-border text-black hover:bg-[#FAF9F5] font-bold'
                  }`}
                  aria-label="Copy email payload"
                >
                  {copiedField === 'email' ? <Check size={14} /> : <Copy size={13} />}
                </button>
              </div>

              {/* Phone Badge */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                darkMode ? 'bg-[#121215] border-[#222226]' : 'bg-white border-cream-border'
              }`} id="contact-node-phone">
                <div className="flex items-center space-x-3 text-sm min-w-0 flex-1">
                  <span className="p-2 rounded-xl bg-neutral-100 dark:bg-[#1C1C22] text-brand-green border border-cream-border dark:border-[#2A2A2A] flex-shrink-0">
                    <Phone size={16} />
                  </span>
                  <div className="truncate flex-1">
                    <p className="text-[9px] text-[#FF5A1F] font-extrabold uppercase tracking-wider leading-none">System mobile</p>
                    <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="text-xs font-bold text-black dark:text-neutral-100 hover:underline hover:text-brand-green block truncate mt-1">{PERSONAL_INFO.phone}</a>
                  </div>
                </div>
                
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    copiedField === 'phone'
                      ? 'bg-brand-green/10 border-brand-green/35 text-brand-green'
                      : darkMode
                        ? 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
                        : 'bg-white border-cream-border text-black hover:bg-[#FAF9F5] font-bold'
                  }`}
                  aria-label="Copy phone number payload"
                >
                  {copiedField === 'phone' ? <Check size={14} /> : <Copy size={13} />}
                </button>
              </div>

              {/* Linkedin Badge */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                darkMode ? 'bg-[#121215] border-[#222226]' : 'bg-white border-cream-border'
              }`} id="contact-node-linkedin">
                <div className="flex items-center space-x-3 text-sm min-w-0 flex-1">
                  <span className="p-2 rounded-xl bg-neutral-100 dark:bg-[#1C1C22] text-brand-green border border-cream-border dark:border-[#2A2A2A] flex-shrink-0">
                    <Linkedin size={16} />
                  </span>
                  <div className="truncate flex-1">
                    <p className="text-[9px] text-[#FF5A1F] font-extrabold uppercase tracking-wider leading-none">LinkedIn Profile</p>
                    <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black dark:text-neutral-200 hover:underline hover:text-brand-green block truncate mt-1">linkedin.com/in/RAcastano</a>
                  </div>
                </div>
                
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.linkedin, 'linkedin')}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    copiedField === 'linkedin'
                      ? 'bg-brand-green/10 border-brand-green/35 text-brand-green'
                      : darkMode
                        ? 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
                        : 'bg-white border-cream-border text-black hover:bg-[#FAF9F5] font-bold'
                  }`}
                  aria-label="Copy linkedin url payload"
                >
                  {copiedField === 'linkedin' ? <Check size={14} /> : <Copy size={13} />}
                </button>
              </div>

            </div>

            {/* Simulated Live Terminal output of active submissions, if any */}
            {inquiries.length > 0 && (
              <div className={`rounded-2xl border p-4 text-xs font-mono max-h-[220px] overflow-y-auto ${
                darkMode ? 'bg-[#121215] border-neutral-800 text-brand-green' : 'bg-neutral-900 text-[#00FF66] border-neutral-700'
              }`} id="terminal-inquiries">
                <div className="flex items-center justify-between border-b pb-2 mb-2 border-neutral-800 text-neutral-450">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green inline-block animate-pulse"></span>
                    Contact Sandbox Terminal
                  </span>
                  <span className="text-[9px] uppercase tracking-wider">Inquiries queue</span>
                </div>
                <div className="space-y-3">
                  {inquiries.map((item) => (
                    <div key={item.id} className="border-b border-neutral-800 pb-2 relative group" id={`inq-terminal-${item.id}`}>
                      <button 
                        onClick={() => clearInquiry(item.id)}
                        className="absolute right-0 top-0 text-rose-500 hover:text-rose-400 p-1 rounded-md hover:bg-white/10 opacity-30 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete record from sandbox"
                      >
                        <Trash2 size={12} />
                      </button>
                      <p className="text-neutral-450 whitespace-nowrap"><span className="text-brand-green">[{item.timestamp}]</span> Inquiry verified.</p>
                      <p className="text-[11px] font-bold text-white mt-0.5 truncate">From: {item.name} ({item.email})</p>
                      <p className="text-[11px] text-[#FF5A1F] font-semibold">Subject: {item.subject}</p>
                      <p className="text-[10px] text-neutral-300 line-clamp-2 italic ml-3 border-l pl-2 border-brand-green/25">"{item.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Interactive Form card (7 columns span) */}
          <div className="lg:col-span-7" id="contact-form-panel">
            <div className={`border p-6 sm:p-8 relative rounded-2xl ${
              darkMode ? 'bg-[#121215] border-[#222226]' : 'bg-white border-cream-border shadow-sm'
            }`}>
              
              {/* Form header message */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-display font-black uppercase text-black dark:text-white" id="form-heading-details">
                  Get In Touch
                </h3>
                <p className="text-xs text-black font-semibold dark:text-neutral-400 mt-1">
                  Please fill out the details below and I will get back to you shortly.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-5" id="consultation-form">
                
                {/* Visual success notice */}
                <AnimatePresence>
                  {showSuccess && (
                     <motion.div
                       initial={{ opacity: 0, y: -10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="p-4 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm rounded-xl font-mono flex items-start space-x-3"
                       id="form-success-banner"
                     >
                       <span className="p-1 rounded-md bg-emerald-500/20 font-bold">INFO_LOG</span>
                       <div className="min-w-0 flex-1">
                         <p className="font-bold">Message sent successfully!</p>
                         <p className="text-neutral-550 dark:text-neutral-400 mt-0.5">Your inquiry has been logged. You can review the entry in the Contact Sandbox Terminal log on the left.</p>
                       </div>
                     </motion.div>
                  )}
                </AnimatePresence>

                {/* Input row: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 flex flex-col">
                    <label htmlFor="name-input" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
                      NAME/COMPANY
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name-input"
                      placeholder="eg. Acme Analytics"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`px-3.5 py-2.5 text-sm border font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green ${
                        darkMode 
                          ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-600' 
                          : 'bg-white border-cream-border text-neutral-900 placeholder-neutral-400'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5 flex flex-col">
                    <label htmlFor="email-input" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
                      EMAIL
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email-input"
                      placeholder="eg. ceo@acme.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`px-3.5 py-2.5 text-sm border font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green ${
                        darkMode
                          ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-600' 
                          : 'bg-white border-cream-border text-neutral-900 placeholder-neutral-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Input: Subject */}
                <div className="space-y-1.5 flex flex-col">
                  <label htmlFor="subject-input" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
                    SUBJECT
                  </label>
                  <input
                    required
                    type="text"
                    name="subject"
                    id="subject-input"
                    placeholder="eg. Automation Project Consultation"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`px-3.5 py-2.5 text-sm border font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green ${
                      darkMode 
                        ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-600' 
                        : 'bg-white border-cream-border text-neutral-900 placeholder-neutral-400'
                    }`}
                  />
                </div>

                {/* Textarea: message */}
                <div className="space-y-1.5 flex flex-col">
                  <label htmlFor="message-input" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    name="message"
                    id="message-input"
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`px-3.5 py-2.5 text-sm border font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green ${
                      darkMode 
                        ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-600' 
                        : 'bg-white border-cream-border text-neutral-900 placeholder-neutral-400'
                    }`}
                  />
                </div>

                {/* Submit button with loading trigger status - beautiful pill button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 uppercase tracking-widest text-[#0D0D0D] text-xs font-mono font-bold rounded-full bg-[#FF5A1F] text-white hover:bg-[#E04810] shadow-md shadow-brand-green/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  id="submit-form-trigger"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-r-transparent border-white animate-spin"></span>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
