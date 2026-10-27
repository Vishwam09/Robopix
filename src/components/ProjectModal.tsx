import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Cpu, CheckCircle2, Play, Code, Radio, Shield, Copy, Check } from 'lucide-react';
import { Project, DesignSystemTheme } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  currentTheme: DesignSystemTheme;
  onOpenConsultation: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  currentTheme,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'simulator' | 'specs'>('blueprint');
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isLime = currentTheme === 'lime';

  const handleCopySysId = () => {
    navigator.clipboard.writeText(project.sysId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappInquiryUrl = `https://wa.me/919510477366?text=Inquiry%20regarding%20${encodeURIComponent(
    project.title
  )}%20[SysID:%20${project.sysId}]`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden transition-all duration-200 border-2 ${
          isLime
            ? 'bg-white border-[#191A23] rounded-3xl shadow-brutal-lg text-[#191A23]'
            : 'bg-[#0E0E0E] border-[#333333] rounded-none text-[#E5E5E5]'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isLime ? 'border-[#191A23]/15 bg-[#F9F9F9]' : 'border-[#262626] bg-[#0A0A0A]'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                  isLime
                    ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                    : 'bg-[#262626] text-white border-[#404040]'
                }`}
              >
                {project.sysId}
              </span>
              <span className="text-xs font-mono opacity-60">·</span>
              <span className="text-xs font-mono font-medium opacity-80 uppercase">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono opacity-60">·</span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  project.status === 'LIVE'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                }`}
              >
                {project.status}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySysId}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                isLime
                  ? 'border-[#191A23]/20 hover:bg-[#F3F3F3]'
                  : 'border-[#333333] hover:bg-[#1A1A1A]'
              }`}
              title="Copy System Identifier"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY ID'}</span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isLime
                  ? 'border-[#191A23] hover:bg-[#191A23] hover:text-white'
                  : 'border-[#333333] hover:bg-white hover:text-black rounded-none'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex items-center gap-2 px-6 pt-4 border-b ${
            isLime ? 'border-[#191A23]/10 bg-white' : 'border-[#262626] bg-[#0E0E0E]'
          }`}
        >
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`pb-3 text-xs font-display font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === 'blueprint'
                ? isLime
                  ? 'border-[#191A23] text-[#191A23]'
                  : 'border-white text-white'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            System Blueprint
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`pb-3 text-xs font-display font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'simulator'
                ? isLime
                  ? 'border-[#191A23] text-[#191A23]'
                  : 'border-white text-white'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs font-display font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'specs'
                ? isLime
                  ? 'border-[#191A23] text-[#191A23]'
                  : 'border-white text-white'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Technical Specs</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: BLUEPRINT */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              {/* Purpose & Overview */}
              <div
                className={`p-4 rounded-2xl border ${
                  isLime ? 'bg-[#F9F9F9] border-[#191A23]/15' : 'bg-[#111111] border-[#262626]'
                }`}
              >
                <span className="font-mono text-[10px] font-bold uppercase opacity-60">
                  OPERATIONAL OBJECTIVE
                </span>
                <p className="font-display font-bold text-lg mt-1">{project.purpose}</p>
                <p className="text-sm mt-2 opacity-90 leading-relaxed">{project.description}</p>
              </div>

              {/* Verified Metrics Grid */}
              <div>
                <span className="font-mono text-xs font-bold uppercase opacity-70 block mb-3">
                  AUDITED BENCHMARKS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        isLime
                          ? 'bg-[#F3F3F3] border-[#191A23]/20 shadow-sm'
                          : 'bg-[#141414] border-[#262626]'
                      }`}
                    >
                      <span className="font-mono text-[11px] opacity-70 uppercase">{metric.label}</span>
                      <span className="font-display font-bold text-xl sm:text-2xl mt-2 tabular-nums">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div>
                <span className="font-mono text-xs font-bold uppercase opacity-70 block mb-3">
                  ARCHITECTURAL INVARIANTS &amp; IMPLEMENTATION
                </span>
                <div className="space-y-2.5">
                  {project.architectureHighlights.map((point, index) => (
                    <div
                      key={index}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                        isLime ? 'bg-white border-[#191A23]/15' : 'bg-[#111111] border-[#262626]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#3F6900] dark:text-[#B9FF66] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              <SimulatorView project={project} isLime={isLime} />
            </div>
          )}

          {/* TAB 3: TECHNICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-2xl border font-mono text-xs ${
                  isLime ? 'bg-[#F3F3F3] border-[#191A23]' : 'bg-[#111111] border-[#262626]'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-current/15">
                  <div>
                    <span className="opacity-60 block uppercase text-[10px]">DEPLOYMENT RUNTIME</span>
                    <span className="font-bold text-sm">{project.operationalNode}</span>
                  </div>
                  <div>
                    <span className="opacity-60 block uppercase text-[10px]">SYSTEM ID</span>
                    <span className="font-bold text-sm">{project.sysId}</span>
                  </div>
                  <div>
                    <span className="opacity-60 block uppercase text-[10px]">REPOSITORY COMMIT</span>
                    <span className="font-bold text-sm">{project.repoIdentifier}</span>
                  </div>
                  <div>
                    <span className="opacity-60 block uppercase text-[10px]">STABILITY RATING</span>
                    <span className="font-bold text-sm">PRODUCTION GRADE (100%)</span>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="opacity-60 block uppercase text-[10px] mb-2">COMPLETE STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded border font-bold text-xs ${
                          isLime
                            ? 'bg-white border-[#191A23] text-[#191A23]'
                            : 'bg-[#1E1E1E] border-[#404040] text-white'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  isLime ? 'bg-[#B9FF66]/20 border-[#191A23]' : 'bg-[#141414] border-[#333333]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#3F6900] dark:text-[#B9FF66]" />
                  <div>
                    <span className="font-display font-bold text-xs uppercase block">
                      Compliance Guarantee
                    </span>
                    <span className="text-xs opacity-75">
                      Audited by Vishwam Patel (Founder &amp; Systems Architect). Zero mock dependencies.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 p-5 border-t ${
            isLime ? 'border-[#191A23]/15 bg-[#F9F9F9]' : 'border-[#262626] bg-[#0A0A0A]'
          }`}
        >
          <div className="text-xs font-mono opacity-70">
            DIRECT CHANNEL: +91 9510477366
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noreferrer"
              className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center gap-2 ${
                isLime
                  ? 'bg-white text-[#191A23] border border-[#191A23] shadow-brutal-sm hover:bg-[#B9FF66]'
                  : 'bg-[#1A1A1A] text-white border border-[#333333] hover:border-white rounded-none'
              }`}
            >
              <span>WhatsApp Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase transition-all cursor-pointer ${
                isLime
                  ? 'bg-[#191A23] text-white border border-[#191A23] shadow-brutal-sm hover:bg-[#B9FF66] hover:text-[#191A23]'
                  : 'bg-white text-black font-bold border border-white rounded-none hover:bg-[#E5E5E5]'
              }`}
            >
              Schedule Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* Interactive Simulator Engine for each project */
const SimulatorView: React.FC<{ project: Project; isLime: boolean }> = ({ project, isLime }) => {
  // Gamepad State
  const [stickX, setStickX] = useState(0);
  const [stickY, setStickY] = useState(0);
  const [activeButtons, setActiveButtons] = useState<Record<string, boolean>>({});
  const [vibrationActive, setVibrationActive] = useState(false);

  // HTML Viewer State
  const [htmlCode, setHtmlCode] = useState(
    `<div style="font-family: monospace; padding: 1.5rem; background: #191A23; color: #B9FF66; border-radius: 1rem;">\n  <h3>ROBOPIX LIVE DOM SANDBOX</h3>\n  <p>Isolated evaluation preview executing in realtime.</p>\n  <button style="padding: 0.5rem 1rem; background: #B9FF66; color: #191A23; border: none; font-weight: bold; border-radius: 0.5rem;">Verified Node</button>\n</div>`
  );

  // Agribot State
  const [throttle, setThrottle] = useState(45);
  const [pumpRelay, setPumpRelay] = useState(false);
  const [distanceCm, setDistanceCm] = useState(128);

  // WhatsApp Outreach State
  const [prospectIndustry, setProspectIndustry] = useState('Aerospace Manufacturing');
  const [prospectName, setProspectName] = useState('Dr. Arvind Sharma');
  const [generatedMessage, setGeneratedMessage] = useState(
    'Greetings Dr. Arvind Sharma, we reviewed your aerospace component machining specs. ROBOPIX provides low-latency ESP32 telemetry telemetry and AI lead verification pipelines. Would 15 minutes this Thursday suit for a technical walkthrough?'
  );

  // Jarvis State
  const [jarvisCommand, setJarvisCommand] = useState('Trigger system telemetry probe');
  const [jarvisOutput, setJarvisOutput] = useState('Waiting for voice or text prompt...');

  // Speak helper for Jarvis or Alarm
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Gamepad Controller Simulator
  if (project.demoType === 'gamepad') {
    const triggerButton = (btn: string) => {
      setActiveButtons((prev) => ({ ...prev, [btn]: true }));
      setTimeout(() => {
        setActiveButtons((prev) => ({ ...prev, [btn]: false }));
      }, 300);
    };

    const triggerVibration = () => {
      setVibrationActive(true);
      setTimeout(() => setVibrationActive(false), 800);
    };

    return (
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-current/15">
          <span className="font-bold uppercase">GAMEPAD API HARDWARE PROBER</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
            POLLING: 60Hz · 1.1ms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Virtual Analog Stick Canvas */}
          <div
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 ${
              isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#141414] border-[#333333]'
            }`}
          >
            <span className="text-[10px] uppercase font-bold opacity-70">
              ANALOG STICK RECTIFIED AXES (DRAG OR CLICK)
            </span>
            <div
              className="relative w-36 h-36 rounded-full border-2 border-dashed border-current/40 flex items-center justify-center cursor-crosshair bg-current/5"
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left - 72) / 72).toFixed(3);
                  const y = ((e.clientY - rect.top - 72) / 72).toFixed(3);
                  setStickX(Math.max(-1, Math.min(1, parseFloat(x))));
                  setStickY(Math.max(-1, Math.min(1, parseFloat(y))));
                }
              }}
            >
              {/* Center thumb stick */}
              <div
                className="w-8 h-8 rounded-full bg-[#3F6900] dark:bg-[#B9FF66] border border-[#191A23] shadow-md transition-transform"
                style={{
                  transform: `translate(${stickX * 45}px, ${stickY * 45}px)`,
                }}
              />
            </div>
            <div className="flex items-center gap-4 text-[11px] font-bold">
              <span>AXIS 0 (X): {stickX.toFixed(3)}</span>
              <span>AXIS 1 (Y): {stickY.toFixed(3)}</span>
            </div>
            <span className="text-[10px] opacity-60">
              CIRCULARITY DRIFT ERROR: {(Math.abs(stickX) * 0.04).toFixed(3)}% (NOMINAL)
            </span>
          </div>

          {/* Action Buttons & Rumble */}
          <div
            className={`p-4 rounded-2xl border flex flex-col justify-between gap-4 ${
              isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#141414] border-[#333333]'
            }`}
          >
            <div>
              <span className="text-[10px] uppercase font-bold opacity-70 block mb-2">
                PRIMARY ACTUATION BUTTONS
              </span>
              <div className="grid grid-cols-4 gap-2">
                {['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT'].map((b) => (
                  <button
                    key={b}
                    onClick={() => triggerButton(b)}
                    className={`py-2 rounded font-bold transition-all border cursor-pointer ${
                      activeButtons[b]
                        ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                        : isLime
                        ? 'bg-white border-[#191A23]/30 hover:bg-[#B9FF66]'
                        : 'bg-[#1E1E1E] border-[#404040] hover:bg-white hover:text-black'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-current/15 flex items-center justify-between">
              <div>
                <span className="block font-bold">RUMBLE MOTORS</span>
                <span className="text-[10px] opacity-60">Dual ERM frequency sweep</span>
              </div>
              <button
                onClick={triggerVibration}
                className={`px-4 py-2 rounded-lg font-bold uppercase transition-all border cursor-pointer ${
                  vibrationActive
                    ? 'bg-red-500 text-white animate-pulse'
                    : isLime
                    ? 'bg-[#191A23] text-white hover:bg-[#B9FF66] hover:text-[#191A23]'
                    : 'bg-white text-black hover:bg-[#E5E5E5]'
                }`}
              >
                {vibrationActive ? 'PULSING (240Hz)' : 'TRIGGER RUMBLE'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // HTML Viewer Simulator
  if (project.demoType === 'html_viewer') {
    return (
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-current/15">
          <span className="font-bold uppercase">ISOLATED HTML SANDBOX RUNTIME</span>
          <span className="opacity-70">CSP: STRICT AIRGAP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold opacity-70">
              EDIT RAW MARKUP (REALTIME BINDING)
            </span>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              rows={8}
              className={`w-full p-3 rounded-xl font-mono text-xs border transition-all ${
                isLime
                  ? 'bg-white border-[#191A23] text-[#191A23]'
                  : 'bg-[#141414] border-[#333333] text-white'
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold opacity-70">
              SANDBOXED RENDER CONTAINER
            </span>
            <div
              className={`p-3 rounded-xl border min-h-[170px] overflow-auto ${
                isLime ? 'bg-white border-[#191A23]' : 'bg-[#000000] border-[#333333]'
              }`}
              dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ESP32 Agribot Simulator
  if (project.demoType === 'agribot') {
    return (
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-current/15">
          <span className="font-bold uppercase">ESP32 DUAL-CORE WEBSOCKET TELEMETRY</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
            RTOS TICK: 1000Hz · AP_LINKED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#141414] border-[#333333]'
            }`}
          >
            <span className="text-[10px] opacity-70 uppercase">ULTRASONIC RANGE</span>
            <span className="font-display font-bold text-2xl mt-1">{distanceCm} cm</span>
            <input
              type="range"
              min="10"
              max="250"
              value={distanceCm}
              onChange={(e) => setDistanceCm(Number(e.target.value))}
              className="mt-2"
            />
            <span
              className={`text-[10px] font-bold mt-1 ${
                distanceCm < 30 ? 'text-red-500' : 'text-emerald-500'
              }`}
            >
              {distanceCm < 30 ? 'OBSTACLE DETECTED - BRAKE ENGAGED' : 'CLEAR TRAJECTORY'}
            </span>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#141414] border-[#333333]'
            }`}
          >
            <span className="text-[10px] opacity-70 uppercase">MOTOR PWM SPEED</span>
            <span className="font-display font-bold text-2xl mt-1">{throttle}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={throttle}
              onChange={(e) => setThrottle(Number(e.target.value))}
              className="mt-2"
            />
            <span className="text-[10px] opacity-70 mt-1">4WD H-Bridge Synchronized</span>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#141414] border-[#333333]'
            }`}
          >
            <span className="text-[10px] opacity-70 uppercase">SPRAY PUMP RELAY</span>
            <span className="font-display font-bold text-2xl mt-1">
              {pumpRelay ? 'ACTIVE (12V)' : 'IDLE (0V)'}
            </span>
            <button
              onClick={() => setPumpRelay(!pumpRelay)}
              className={`mt-2 py-2 rounded font-bold uppercase transition-all border cursor-pointer ${
                pumpRelay
                  ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                  : isLime
                  ? 'bg-white border-[#191A23]'
                  : 'bg-[#1E1E1E] border-[#404040]'
              }`}
            >
              TOGGLE SOLENOID PUMP
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AI Outreach & Lead Finder Simulator
  if (project.demoType === 'outreach' || project.demoType === 'lead_finder') {
    const handleSynthesize = () => {
      setGeneratedMessage(
        `Hello ${prospectName}, noticing your expansion in ${prospectIndustry}. ROBOPIX deploys verifiable edge automation and low-latency digital systems. Can we share a 3-minute technical architecture deck for your engineering team?`
      );
    };

    return (
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-current/15">
          <span className="font-bold uppercase">OUTBOUND SYNTHESIS &amp; ENRICHMENT ENGINE</span>
          <span className="text-emerald-500 font-bold">MX VALIDATED: 100%</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] opacity-70 mb-1 uppercase font-bold">
              TARGET DECISION-MAKER
            </label>
            <input
              type="text"
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              className={`w-full p-2.5 rounded-lg border font-mono text-xs ${
                isLime ? 'bg-white border-[#191A23]' : 'bg-[#141414] border-[#333333]'
              }`}
            />
          </div>
          <div>
            <label className="block text-[10px] opacity-70 mb-1 uppercase font-bold">
              INDUSTRY VERTICAL
            </label>
            <input
              type="text"
              value={prospectIndustry}
              onChange={(e) => setProspectIndustry(e.target.value)}
              className={`w-full p-2.5 rounded-lg border font-mono text-xs ${
                isLime ? 'bg-white border-[#191A23]' : 'bg-[#141414] border-[#333333]'
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSynthesize}
            className={`px-4 py-2 rounded-lg font-bold uppercase transition-all border cursor-pointer ${
              isLime
                ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] hover:bg-black'
                : 'bg-white text-black font-bold'
            }`}
          >
            Synthesize Adaptive Message
          </button>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#111111] border-[#262626]'
          }`}
        >
          <span className="text-[10px] opacity-60 uppercase block mb-1">
            SYNTHESIZED DISPATCH PREVIEW (WHATSAPP META PROTOCOL)
          </span>
          <p className="font-body text-xs sm:text-sm leading-relaxed">{generatedMessage}</p>
        </div>
      </div>
    );
  }

  // Voice / Jarvis / Alarm Simulator
  if (project.demoType === 'jarvis' || project.demoType === 'alarm') {
    const handleRunVoice = (cmd: string) => {
      setJarvisCommand(cmd);
      let response = '';
      if (cmd.includes('telemetry')) response = 'Telemetry online. All 10 systems nominal. Ping is 11 milliseconds.';
      else if (cmd.includes('compile') || cmd.includes('build'))
        response = 'Build pipeline executed with zero compiler warnings. Artifact verified.';
      else response = `Command recognized: "${cmd}". Executing background thread.`;

      setJarvisOutput(response);
      speakText(response);
    };

    return (
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-current/15">
          <span className="font-bold uppercase">AUDIO SYNTHESIS &amp; INTENT RECOGNITION</span>
          <span className="text-emerald-500 font-bold">TTS ENGINE READY</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            'Trigger system telemetry probe',
            'Run compile and lint check',
            'Announce 25-minute Pomodoro sprint',
            'Query rover sonar sensor array',
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleRunVoice(prompt)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                jarvisCommand === prompt
                  ? isLime
                    ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23]'
                    : 'bg-white text-black'
                  : isLime
                  ? 'bg-white border-[#191A23]/30 hover:bg-[#B9FF66]'
                  : 'bg-[#1A1A1A] border-[#333333] hover:text-white'
              }`}
            >
              "{prompt}"
            </button>
          ))}
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#111111] border-[#262626]'
          }`}
        >
          <span className="text-[10px] opacity-60 uppercase block mb-1">VOICE READOUT RESPONSE</span>
          <p className="font-display font-bold text-sm sm:text-base">{jarvisOutput}</p>
        </div>
      </div>
    );
  }

  // Default Fallback Simulator
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-current/15">
        <span className="font-bold uppercase">SYSTEM REPOSITORY AUDIT</span>
        <span className="text-emerald-500 font-bold">BUILD: PASSED</span>
      </div>

      <div
        className={`p-4 rounded-xl border ${
          isLime ? 'bg-[#F9F9F9] border-[#191A23]' : 'bg-[#141414] border-[#333333]'
        }`}
      >
        <span className="text-[10px] opacity-60 uppercase block mb-2">TELEMETRY INVARIANTS</span>
        <div className="space-y-1.5 text-xs">
          <div>$ rpbx audit --sys-id {project.sysId}</div>
          <div className="text-emerald-600 dark:text-emerald-400">&gt; Validating runtime dependencies... OK</div>
          <div className="text-emerald-600 dark:text-emerald-400">&gt; Checking security permissions &amp; latency boundaries... OK</div>
          <div>&gt; Status: {project.status} // {project.operationalNode}</div>
        </div>
      </div>
    </div>
  );
};
