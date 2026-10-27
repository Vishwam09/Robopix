import React from 'react';
import { ArrowUp, Phone, Mail, Github, Globe, Lock } from 'lucide-react';
import { DesignSystemTheme } from '../types/portfolio';
import { FOUNDER_INFO } from '../data/projectsData';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  currentTheme: DesignSystemTheme;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentTheme, onOpenConsultation }) => {
  const isLime = currentTheme === 'lime';
  const { openAdminPortal, isAdmin } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className={`w-full border-t transition-colors duration-200 ${
        isLime
          ? 'bg-white border-[#191A23]/15 text-[#191A23]'
          : 'bg-[#000000] border-[#262626] text-[#E5E5E5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-10">
        
        {/* Main Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold uppercase tracking-wider">
                ROBOPIX
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-mono font-bold uppercase ${
                  isLime
                    ? 'bg-[#B9FF66] text-[#191A23] border border-[#191A23]'
                    : 'bg-[#262626] text-white border-[#404040]'
                }`}
              >
                V4.9
              </span>
            </div>
            <p className="text-xs sm:text-sm opacity-80 max-w-sm leading-relaxed">
              Engineering autonomous robotics, AI automation pipelines, and resilient web runtime architectures from raw hardware prototypes to enterprise deployment.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono font-bold mt-2">
              <a href="tel:+919510477366" className="flex items-center gap-1.5 hover:underline">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 9510477366</span>
              </a>
              <span className="opacity-40">/</span>
              <a href="mailto:vishwam@robopix.in" className="flex items-center gap-1.5 hover:underline">
                <Mail className="w-3.5 h-3.5" />
                <span>vishwam@robopix.in</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 flex flex-col gap-2 text-xs font-display font-medium">
            <span className="font-mono text-[10px] font-bold uppercase opacity-60 mb-1">
              SYSTEM DIRECTORY
            </span>
            <a href="#projects" className="hover:underline underline-offset-4 opacity-80 hover:opacity-100">
              Projects Archive [10]
            </a>
            <a href="#architecture" className="hover:underline underline-offset-4 opacity-80 hover:opacity-100">
              Design Architecture &amp; Theme
            </a>
            <a href="#audit-table" className="hover:underline underline-offset-4 opacity-80 hover:opacity-100">
              Compliance Field Audit
            </a>
            <a href="#founder" className="hover:underline underline-offset-4 opacity-80 hover:opacity-100">
              Executive Dossier
            </a>
            <button
              onClick={openAdminPortal}
              className="text-left hover:underline underline-offset-4 opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            >
              <Lock className="w-3 h-3 opacity-60" />
              <span>Admin Portal Console {isAdmin ? '(Unlocked)' : ''}</span>
            </button>
          </div>

          {/* Consultation Dispatch Action */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] font-bold uppercase opacity-60">
              ENGAGEMENT DISPATCH
            </span>
            <p className="text-xs opacity-80 leading-relaxed">
              Have an industrial robotics concept, AI prospect automation requirement, or firmware audit? Engage directly with Lead Systems Architect Vishwam Patel.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onOpenConsultation}
                className={`px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all border cursor-pointer ${
                  isLime
                    ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] shadow-brutal-sm hover:bg-black'
                    : 'bg-white text-black font-bold border-white hover:bg-[#E5E5E5] rounded-none'
                }`}
              >
                Schedule Consultation
              </button>
              <a
                href="https://wa.me/919510477366"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all border ${
                  isLime
                    ? 'bg-white text-[#191A23] border-[#191A23] hover:bg-[#F3F3F3]'
                    : 'bg-[#141414] text-white border-[#333333] hover:border-white rounded-none'
                }`}
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Strip */}
        <div className="pt-6 border-t border-current/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 opacity-70">
            <span>© {new Date().getFullYear()} ROBOPIX SYSTEMS.</span>
            <span>·</span>
            <span>All 10 architecture records verified.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="opacity-70">SYSTEM STATUS: 100% OPERATIONAL</span>
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isLime
                  ? 'border-[#191A23]/20 hover:bg-[#F3F3F3]'
                  : 'border-[#333333] hover:bg-[#1A1A1A]'
              }`}
              title="Return to top"
            >
              <span className="text-[11px] font-bold uppercase">TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
