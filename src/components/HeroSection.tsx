import React, { useState, useEffect } from 'react';
import { ArrowDown, Phone, ShieldCheck } from 'lucide-react';
import { DesignSystemTheme } from '../types/portfolio';
import { FOUNDER_INFO } from '../data/projectsData';

interface HeroSectionProps {
  currentTheme: DesignSystemTheme;
  onThemeChange?: (theme: DesignSystemTheme) => void;
  onOpenConsultation: () => void;
  totalProjects: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  onOpenConsultation,
  totalProjects,
}) => {
  const isLime = currentTheme === 'lime';
  const [timeUtc, setTimeUtc] = useState<string>('');

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full pt-28 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
        
        {/* Telemetry Operational Rail */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-4 border-b text-xs font-mono font-medium ${
            isLime
              ? 'border-[#191A23]/15 text-[#555866]'
              : 'border-[#262626] text-[#A3A3A3]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 font-bold rounded-full ${
                isLime
                  ? 'bg-[#B9FF66] text-[#191A23] border border-[#191A23]'
                  : 'bg-[#262626] text-[#FFFFFF] border border-[#404040]'
              }`}
            >
              ROBOPIX ARCHIVE // 2026
            </span>
            <span className="hidden sm:inline">GLOBAL SYSTEMS ARCHIVE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#3F6900] dark:bg-[#B9FF66] animate-pulse"></span>
              CORE SYSTEMS ONLINE
            </span>
            <span className="hidden md:inline">SYSTEM INTEGRITY 100%</span>
            <span>CLK: <strong className={isLime ? 'text-[#191A23]' : 'text-white'}>{timeUtc || '05:35:16 UTC'}</strong></span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl flex flex-col space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold">
              <span
                className={`px-2.5 py-0.5 rounded font-bold uppercase ${
                  isLime
                    ? 'bg-[#191A23] text-[#B9FF66]'
                    : 'bg-[#1A1A1A] text-[#E5E5E5] border border-[#333333]'
                }`}
              >
                ENGINEERING PORTFOLIO
              </span>
              <span className="text-[#888888]">·</span>
              <span className={isLime ? 'text-[#555866]' : 'text-[#888888]'}>
                SYSTEMS RESEARCH LAB
              </span>
            </div>

            <h1
              className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.08] ${
                isLime ? 'text-[#191A23]' : 'text-[#FFFFFF]'
              }`}
              style={{ textWrap: 'balance' }}
            >
              Turn ideas into practical,{' '}
              <span
                className={
                  isLime
                    ? 'bg-[#B9FF66] px-2.5 py-0.5 rounded-lg border-2 border-[#191A23] inline-block shadow-brutal-sm'
                    : 'bg-[#FFFFFF] text-[#000000] px-2.5 py-0.5 rounded-none inline-block'
                }
              >
                intelligent
              </span>{' '}
              technology.
            </h1>

            <p
              className={`text-base lg:text-lg max-w-2xl leading-relaxed ${
                isLime ? 'text-[#555866]' : 'text-[#A3A3A3]'
              }`}
            >
              Uncompromising systems engineering. ROBOPIX deploys zero-hyperbole automation, low-latency microcontroller firmware, and robust web runtime environments built to withstand real production constraints.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className={`px-6 py-3.5 font-display font-bold text-xs uppercase transition-all flex items-center gap-2 ${
                isLime
                  ? 'bg-[#191A23] text-white rounded-2xl border-2 border-[#191A23] shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
                  : 'bg-[#FFFFFF] text-[#000000] rounded-none border border-[#FFFFFF] hover:bg-[#E5E5E5]'
              }`}
            >
              <span>Explore Archives [{totalProjects}]</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenConsultation}
              className={`px-6 py-3.5 font-display font-bold text-xs uppercase transition-all cursor-pointer ${
                isLime
                  ? 'bg-white text-[#191A23] rounded-2xl border-2 border-[#191A23] shadow-brutal hover:bg-[#B9FF66] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
                  : 'bg-[#111111] text-[#E5E5E5] rounded-none border border-[#333333] hover:border-[#FFFFFF]'
              }`}
            >
              Start Direct Consultation
            </button>

            <a
              href="https://wa.me/919510477366"
              target="_blank"
              rel="noreferrer"
              className={`px-4 py-3.5 font-display font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 ${
                isLime
                  ? 'text-[#555866] hover:text-[#191A23]'
                  : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 9510477366</span>
            </a>
          </div>

          {/* Footnote Micro Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                isLime
                  ? 'bg-[#F3F3F3] border-[#191A23]/15'
                  : 'bg-[#0E0E0E] border-[#262626]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-[#888888]">
                  CHIEF ARCHITECT
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#3F6900]" />
              </div>
              <span
                className={`font-display text-sm font-bold uppercase mt-1 ${
                  isLime ? 'text-[#191A23]' : 'text-white'
                }`}
              >
                {FOUNDER_INFO.name}
              </span>
            </div>

            <div
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                isLime
                  ? 'bg-[#F3F3F3] border-[#191A23]/15'
                  : 'bg-[#0E0E0E] border-[#262626]'
              }`}
            >
              <span className="font-mono text-[10px] uppercase font-bold text-[#888888]">
                CORE PILLARS
              </span>
              <span
                className={`font-display text-sm font-bold uppercase mt-1 ${
                  isLime ? 'text-[#191A23]' : 'text-white'
                }`}
              >
                AI, Embedded &amp; Web
              </span>
            </div>

            <div
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                isLime
                  ? 'bg-[#B9FF66]/25 border-[#191A23]'
                  : 'bg-[#1A1A1A] border-[#333333]'
              }`}
            >
              <span className="font-mono text-[10px] uppercase font-bold text-[#888888]">
                VERIFIED AUDIT
              </span>
              <span
                className={`font-display text-sm font-bold uppercase mt-1 ${
                  isLime ? 'text-[#191A23]' : 'text-white'
                }`}
              >
                10 Certified Units
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
