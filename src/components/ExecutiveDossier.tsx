import React from 'react';
import { ShieldCheck, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { FOUNDER_INFO } from '../data/projectsData';
import { DesignSystemTheme } from '../types/portfolio';

interface ExecutiveDossierProps {
  currentTheme: DesignSystemTheme;
  onOpenConsultation: () => void;
}

export const ExecutiveDossier: React.FC<ExecutiveDossierProps> = ({
  currentTheme,
  onOpenConsultation,
}) => {
  const isLime = currentTheme === 'lime';

  return (
    <section id="founder" className="w-full py-14 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
        
        {/* Container */}
        <div
          className={`border-2 p-8 lg:p-10 transition-all ${
            isLime
              ? 'bg-[#F3F3F3] border-[#191A23] rounded-3xl shadow-brutal'
              : 'bg-[#0E0E0E] border-[#262626] rounded-none'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Portrait - Name placed strictly in lower side, clean center */}
            <div className="lg:col-span-4">
              <div
                className={`relative w-full aspect-[4/5] border-2 overflow-hidden flex flex-col justify-between ${
                  isLime
                    ? 'bg-white border-[#191A23] rounded-2xl shadow-brutal-sm'
                    : 'bg-[#141414] border-[#333333] rounded-none'
                }`}
              >
                {/* Clean image canvas without text in the middle */}
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-current/5 via-current/2 to-transparent overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMEf4RfqC1Z66bkk1-DO-6-wqQ07HPM2HS62g2Ieg0KB-r3MkXW832fht3SvAgcRAIY3A-ckmPTJsM_L347FdY2fysksFaA_UCqsQN2bu9riJxDV10D3HLGC_SLMntQmVBftWmr6PLAyWM5utYJhP4vq1hGlgV-hx3Wn5Rv-0rhHG8o9pKU9FgUNtT528DPV5CkZ0mxQcjXYSIP70g4l2czyFY6D1Abwqyjjb2arNxePsWMBM3uv1eUAFJICUvtrMaJA"
                    alt="Founder & Systems Architect"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle clean neutral geometric aperture backdrop if image is unrendered (ZERO text in middle) */}
                  <div className="w-24 h-24 rounded-full border border-current/20 flex items-center justify-center opacity-40">
                    <div className="w-16 h-16 rounded-full border border-dashed border-current/30" />
                  </div>
                </div>

                {/* Name placed strictly at the lower side overlay */}
                <div
                  className={`relative z-10 p-4 border-t-2 flex items-center justify-between ${
                    isLime
                      ? 'bg-white/95 border-[#191A23]'
                      : 'bg-[#111111]/95 border-[#333333]'
                  }`}
                >
                  <div>
                    <span className="font-display text-base font-bold uppercase block tracking-tight">
                      {FOUNDER_INFO.name}
                    </span>
                    <span className="font-mono text-[11px] opacity-70 uppercase block">
                      {FOUNDER_INFO.title}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                      isLime
                        ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                        : 'bg-[#262626] text-white border-[#404040]'
                    }`}
                  >
                    {FOUNDER_INFO.secId}
                  </span>
                </div>
              </div>
            </div>

            {/* Dossier Creed & Pillars */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-current/15">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-display font-bold border ${
                    isLime
                      ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                      : 'bg-[#262626] text-white border-[#404040]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>EXECUTIVE DOSSIER // ARCHITECTURAL CREED</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono font-bold">
                  <a
                    href="tel:+919510477366"
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    <span>+91 9510477366</span>
                  </a>
                  <a
                    href="mailto:vishwam@robopix.in"
                    className="flex items-center gap-1.5 hover:underline hidden sm:flex"
                  >
                    <Mail className="w-3 h-3" />
                    <span>vishwam@robopix.in</span>
                  </a>
                </div>
              </div>

              {/* Creed statement */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                  No Synthetic Metrics. Zero Marketing Fluff.
                </h3>
                <p className="text-sm mt-2 leading-relaxed opacity-85">
                  {FOUNDER_INFO.creed}
                </p>
              </div>

              {/* 4 Pillars Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FOUNDER_INFO.pillars.map((pillar) => (
                  <div
                    key={pillar.num}
                    className={`p-4 rounded-2xl border transition-all ${
                      isLime
                        ? 'bg-white border-[#191A23] shadow-brutal-sm'
                        : 'bg-[#141414] border-[#262626] rounded-none'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-display font-bold text-sm uppercase">
                        {pillar.num} / {pillar.title}
                      </span>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border ${
                          isLime
                            ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                            : 'bg-[#262626] text-white border-[#333333]'
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                    <p className="text-xs opacity-75 leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={FOUNDER_INFO.whatsappDirect}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-5 py-3 rounded-xl font-display text-xs font-bold uppercase transition-all flex items-center gap-2 border ${
                    isLime
                      ? 'bg-[#191A23] text-white border-[#191A23] shadow-brutal-sm hover:bg-[#B9FF66] hover:text-[#191A23]'
                      : 'bg-white text-black border-white hover:bg-[#E5E5E5] rounded-none'
                  }`}
                >
                  <span>Direct Inquiry // WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onOpenConsultation}
                  className={`px-5 py-3 rounded-xl font-display text-xs font-bold uppercase transition-all border cursor-pointer ${
                    isLime
                      ? 'bg-white text-[#191A23] border-[#191A23] shadow-brutal-sm hover:bg-[#F3F3F3]'
                      : 'bg-[#141414] text-white border-[#333333] hover:border-white rounded-none'
                  }`}
                >
                  Book Executive Consultation
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
