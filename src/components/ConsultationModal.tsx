import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowUpRight, MessageSquare, Calendar } from 'lucide-react';
import { DesignSystemTheme } from '../types/portfolio';
import { useAuth } from '../context/AuthContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: DesignSystemTheme;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
}) => {
  const { currentUser, addBooking, openHistoryModal } = useAuth();

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    contactInfo: currentUser?.email || '',
    serviceDomain: 'Robotics & Embedded Systems',
    timeline: 'Within 2-4 Weeks',
    budget: '$2,500 - $7,500 (Production Unit)',
    projectBrief: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        contactInfo: prev.contactInfo || currentUser.email,
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const isLime = currentTheme === 'lime';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = addBooking({
      clientName: formData.fullName,
      contactInfo: formData.contactInfo,
      serviceDomain: formData.serviceDomain,
      timeline: formData.timeline,
      budget: formData.budget,
      projectBrief: formData.projectBrief,
    });
    setBookingRef(newRecord.id);
    setSubmitted(true);
  };

  const whatsappPrefilledUrl = `https://wa.me/919510477366?text=Consultation%20Request%20[${bookingRef}]:%0AName:%20${encodeURIComponent(
    formData.fullName
  )}%0AContact:%20${encodeURIComponent(formData.contactInfo)}%0ADomain:%20${encodeURIComponent(
    formData.serviceDomain
  )}%0ATimeline:%20${encodeURIComponent(formData.timeline)}%0ABrief:%20${encodeURIComponent(
    formData.projectBrief
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-2xl overflow-hidden transition-all duration-200 border-2 ${
          isLime
            ? 'bg-white border-[#191A23] rounded-3xl shadow-brutal-lg text-[#191A23]'
            : 'bg-[#0E0E0E] border-[#333333] rounded-none text-[#E5E5E5]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isLime ? 'border-[#191A23]/15 bg-[#F9F9F9]' : 'border-[#262626] bg-[#0A0A0A]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                  isLime
                    ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                    : 'bg-[#262626] text-white border-[#404040]'
                }`}
              >
                DISPATCH // ARCHITECT CONSULT
              </span>
              <span className="text-xs font-mono opacity-70">DIRECT LINE: +91 9510477366</span>
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight mt-1">
              Book Systems Consultation
            </h2>
          </div>

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

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                  isLime
                    ? 'bg-[#B9FF66] border-[#191A23] text-[#191A23]'
                    : 'bg-[#1A1A1A] border-white text-white'
                }`}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase opacity-70">
                  BOOKING RECORD LOGGED TO HISTORY
                </span>
                <h3 className="font-display text-2xl font-bold uppercase mt-1">
                  Reference: {bookingRef}
                </h3>
                <p className="text-xs sm:text-sm max-w-md mt-2 opacity-80 leading-relaxed">
                  Your consultation request has been logged to your account's Consultation History. Lead Architect Vishwam Patel will review the specifications.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    openHistoryModal();
                  }}
                  className={`px-5 py-3 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center gap-2 border cursor-pointer ${
                    isLime
                      ? 'bg-white text-[#191A23] border-[#191A23] shadow-brutal-sm hover:bg-[#B9FF66]'
                      : 'bg-[#141414] text-white border-[#333333] hover:border-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>View in Consultation History</span>
                </button>

                <a
                  href={whatsappPrefilledUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-6 py-3 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center gap-2 border ${
                    isLime
                      ? 'bg-[#191A23] text-white border-[#191A23] shadow-brutal-sm hover:bg-[#B9FF66] hover:text-[#191A23]'
                      : 'bg-white text-black border-white hover:bg-[#E5E5E5] rounded-none'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Ticket (+91 9510477366)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Full Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashwin Patel / AeroSystems"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Contact Email or WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. patelashwin918@gmail.com"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Engineering Domain
                  </label>
                  <select
                    value={formData.serviceDomain}
                    onChange={(e) => setFormData({ ...formData, serviceDomain: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23]'
                        : 'bg-[#141414] border-[#333333] text-white'
                    }`}
                  >
                    <option>Robotics &amp; Embedded Systems</option>
                    <option>AI Automation &amp; Prospect Engines</option>
                    <option>Mission-Critical Web Platforms</option>
                    <option>Mobile App Architecture</option>
                    <option>Firmware &amp; Code Compliance Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Target Deployment Window
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23]'
                        : 'bg-[#141414] border-[#333333] text-white'
                    }`}
                  >
                    <option>Immediate (Urgent Sprint)</option>
                    <option>Within 2-4 Weeks</option>
                    <option>1-3 Months</option>
                    <option>Long-Term Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Estimated Budget Tier
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23]'
                        : 'bg-[#141414] border-[#333333] text-white'
                    }`}
                  >
                    <option>$1,000 - $2,500 (Prototype)</option>
                    <option>$2,500 - $7,500 (Production Unit)</option>
                    <option>$7,500 - $20,000+ (Enterprise)</option>
                    <option>Hourly Advisory Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                  Project Brief &amp; Technical Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline your project scope, hardware/software specifications, target bottlenecks, or questions for our engineering architect..."
                  value={formData.projectBrief}
                  onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                  className={`w-full p-3 rounded-xl border text-xs font-mono transition-all ${
                    isLime
                      ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                      : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                  }`}
                />
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-[11px] ${
                  isLime ? 'bg-[#F3F3F3] border-[#191A23]/20' : 'bg-[#111111] border-[#262626]'
                }`}
              >
                <span className="opacity-75">
                  Direct connection to Lead Architect. Invariant non-disclosure guaranteed.
                </span>
                <span className="font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  READY
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all border cursor-pointer ${
                    isLime ? 'border-[#191A23]/30 hover:bg-[#F3F3F3]' : 'border-[#333333]'
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all border cursor-pointer ${
                    isLime
                      ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] shadow-brutal-sm hover:bg-black'
                      : 'bg-white text-black font-bold border-white hover:bg-[#E5E5E5]'
                  }`}
                >
                  Confirm &amp; Log Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
