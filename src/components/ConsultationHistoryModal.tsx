import React, { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, ArrowUpRight, CheckCircle2, Clock, Plus, Lock, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DesignSystemTheme } from '../types/portfolio';
import { ConsultationStatus } from '../types/auth';

interface ConsultationHistoryModalProps {
  currentTheme: DesignSystemTheme;
  onOpenNewBooking: () => void;
}

export const ConsultationHistoryModal: React.FC<ConsultationHistoryModalProps> = ({
  currentTheme,
  onOpenNewBooking,
}) => {
  const { isHistoryModalOpen, closeHistoryModal, consultations, cancelBooking, currentUser, openAuthModal, isAdmin } = useAuth();
  const [filterStatus, setFilterStatus] = useState<'ALL' | ConsultationStatus>('ALL');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeHistoryModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeHistoryModal]);

  if (!isHistoryModalOpen) return null;

  const isLime = currentTheme === 'lime';

  // For Admin: show all bookings. For regular user: show ONLY their own bookings
  const userBookings = consultations.filter((item) => {
    if (isAdmin) return true;
    if (!currentUser) return false;
    const userEmail = currentUser.email?.toLowerCase().trim();
    const contactEmail = item.contactInfo?.toLowerCase().trim();
    return (
      (userEmail && contactEmail && contactEmail === userEmail) ||
      (currentUser.id && item.userId === currentUser.id)
    );
  });

  const filtered = userBookings.filter((item) => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  const confirmedCount = userBookings.filter((c) => c.status === 'CONFIRMED').length;
  const completedCount = userBookings.filter((c) => c.status === 'COMPLETED').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transition-all duration-200 border-2 ${
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
                REGISTRY // CLIENT DOSSIER
              </span>
              {currentUser ? (
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{currentUser.name} ({currentUser.email})</span>
                </span>
              ) : (
                <span className="text-xs font-mono opacity-70">GUEST SESSION</span>
              )}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1">
              Consultation Booking History
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                closeHistoryModal();
                onOpenNewBooking();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
                isLime
                  ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23] shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px]'
                  : 'bg-white text-black border-white hover:bg-[#E5E5E5]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book New</span>
            </button>

            <button
              onClick={closeHistoryModal}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isLime
                  ? 'border-[#191A23] hover:bg-[#191A23] hover:text-white'
                  : 'border-[#333333] hover:bg-white hover:text-black rounded-none'
              }`}
              aria-label="Close history modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guest Authentication Banner if not signed in */}
        {!currentUser && (
          <div
            className={`p-4 mx-6 mt-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${
              isLime ? 'bg-[#B9FF66]/20 border-[#191A23]' : 'bg-[#141414] border-[#333333]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Sign in to sync your consultation history to your Firebase client account.</span>
            </div>
            <button
              onClick={() => {
                closeHistoryModal();
                openAuthModal('signin');
              }}
              className={`px-4 py-1.5 rounded-lg font-display font-bold uppercase text-xs border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
                isLime
                  ? 'bg-[#191A23] text-white border-[#191A23] hover:bg-black'
                  : 'bg-white text-black border-white'
              }`}
            >
              Sign In / Sign Up
            </button>
          </div>
        )}

        {/* Quick Stats Strip */}
        <div
          className={`grid grid-cols-3 p-4 border-b text-xs font-mono mt-2 ${
            isLime ? 'bg-[#F3F3F3] border-[#191A23]/10' : 'bg-[#141414] border-[#262626]'
          }`}
        >
          <div>
            <span className="opacity-60 block uppercase text-[10px]">TOTAL SESSIONS</span>
            <span className="font-display font-bold text-xl tabular-nums">{userBookings.length}</span>
          </div>
          <div>
            <span className="opacity-60 block uppercase text-[10px]">CONFIRMED / ACTIVE</span>
            <span className="font-display font-bold text-xl tabular-nums text-emerald-600 dark:text-emerald-400">
              {confirmedCount}
            </span>
          </div>
          <div>
            <span className="opacity-60 block uppercase text-[10px]">COMPLETED ARCHIVES</span>
            <span className="font-display font-bold text-xl tabular-nums opacity-80">{completedCount}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div
          className={`flex items-center gap-2 p-4 border-b ${
            isLime ? 'bg-white border-[#191A23]/10' : 'bg-[#0E0E0E] border-[#262626]'
          }`}
        >
          <span className="text-xs font-mono font-bold uppercase opacity-60 mr-2">Filter:</span>
          {(['ALL', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                filterStatus === st
                  ? isLime
                    ? 'bg-[#191A23] text-[#B9FF66]'
                    : 'bg-white text-black'
                  : isLime
                  ? 'bg-[#F3F3F3] text-[#191A23] hover:bg-[#E8E8E8]'
                  : 'bg-[#1A1A1A] text-[#888888] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length === 0 ? (
            <div
              className={`p-12 text-center rounded-2xl border-2 border-dashed ${
                isLime
                  ? 'border-[#191A23]/30 bg-[#F9F9F9] text-[#191A23]'
                  : 'border-[#333333] bg-[#141414] text-[#A3A3A3]'
              }`}
            >
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <h3 className="font-display text-lg font-bold uppercase">No Consultations Found</h3>
              <p className="text-xs font-mono mt-1 opacity-80">
                You currently have no consultations matching the selected filter.
              </p>
              <button
                onClick={() => {
                  closeHistoryModal();
                  onOpenNewBooking();
                }}
                className={`mt-4 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase border cursor-pointer ${
                  isLime
                    ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23]'
                    : 'bg-white text-black border-white'
                }`}
              >
                Book a Systems Consultation
              </button>
            </div>
          ) : (
            filtered.map((item) => {
              const whatsappUrl = `https://wa.me/919510477366?text=Regarding%20Consultation%20Ticket%20[${item.id}]:%20${encodeURIComponent(
                item.serviceDomain
              )}`;

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isLime
                      ? 'bg-[#F9F9F9] border-[#191A23] shadow-brutal-sm'
                      : 'bg-[#141414] border-[#262626] rounded-none'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-current/10">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-current/10">
                        {item.id}
                      </span>
                      <span className="font-display font-bold uppercase text-base">
                        {item.serviceDomain}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded border ${
                          item.status === 'CONFIRMED'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : item.status === 'COMPLETED'
                            ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                            : 'bg-neutral-500/15 text-neutral-600 dark:text-neutral-400 border-neutral-500/30'
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="font-mono text-[11px] opacity-60">{item.createdAt}</span>
                    </div>
                  </div>

                  <div className="py-3 text-xs font-mono space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="opacity-60 block text-[10px] uppercase">TIMELINE / SPRINT</span>
                        <span className="font-bold">{item.timeline}</span>
                      </div>
                      <div>
                        <span className="opacity-60 block text-[10px] uppercase">BUDGET ESTIMATION</span>
                        <span className="font-bold">{item.budget}</span>
                      </div>
                    </div>

                    <div>
                      <span className="opacity-60 block text-[10px] uppercase mb-0.5">PROJECT BRIEF</span>
                      <p className="font-body text-xs opacity-85 leading-relaxed bg-current/5 p-3 rounded-xl border border-current/10">
                        {item.projectBrief}
                      </p>
                    </div>

                    {item.scheduledSlot && (
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs pt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>SCHEDULED TIME: {item.scheduledSlot}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-current/10 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[11px] opacity-60">
                      LEAD ARCHITECT: VISHWAM PATEL
                    </span>

                    <div className="flex items-center gap-2">
                      {item.status === 'CONFIRMED' && (
                        <button
                          onClick={() => cancelBooking(item.id)}
                          className="px-3 py-1.5 rounded-lg border text-[11px] font-mono text-red-500 border-red-500/40 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                        >
                          Cancel Booking
                        </button>
                      )}

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-4 py-1.5 rounded-lg border text-xs font-display font-bold uppercase transition-all flex items-center gap-1.5 ${
                          isLime
                            ? 'bg-[#191A23] text-white border-[#191A23] hover:bg-[#B9FF66] hover:text-[#191A23]'
                            : 'bg-white text-black border-white hover:bg-[#E5E5E5]'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Thread</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex items-center justify-between text-[11px] font-mono ${
            isLime ? 'bg-[#F9F9F9] border-[#191A23]/15' : 'bg-[#0A0A0A] border-[#262626]'
          }`}
        >
          <span className="opacity-70">DIRECT LINE: +91 9510477366</span>
          <button
            onClick={closeHistoryModal}
            className="font-bold uppercase hover:underline cursor-pointer"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
