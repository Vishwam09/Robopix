import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, User, Calendar, LogOut, LogIn, UserPlus, ShieldAlert, ShieldCheck, Lock } from 'lucide-react';
import { DesignSystemTheme } from '../types/portfolio';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenConsultation: () => void;
  currentTheme: DesignSystemTheme;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, currentTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, signOut, openAuthModal, openHistoryModal, openAdminPortal, isAdmin, consultations } = useAuth();
  const isLime = currentTheme === "lime";

  const userBookingsCount = isAdmin
    ? consultations.length
    : currentUser
    ? consultations.filter(
        (c) =>
          c.contactInfo?.toLowerCase().trim() === currentUser.email?.toLowerCase().trim() ||
          c.userId === currentUser.id
      ).length
    : 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 backdrop-blur-md ${
        isLime
          ? 'bg-white/95 border-b border-[#191A23]/15 text-[#191A23]'
          : 'bg-[#000000]/95 border-b border-[#262626] text-[#E5E5E5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          aria-label="ROBOPIX Home"
        >
          <span
            className={`font-display text-2xl font-bold tracking-tight uppercase transition-colors ${
              isLime
                ? 'text-[#191A23] group-hover:text-black'
                : 'text-[#FFFFFF] group-hover:text-[#B9FF66]'
            }`}
          >
            ROBOPIX
          </span>
          <span
            className={`text-xs px-1.5 py-0.5 rounded font-mono font-bold uppercase transition-colors ${
              isLime
                ? 'bg-[#B9FF66] text-[#191A23] border border-[#191A23]'
                : 'bg-[#262626] text-[#E5E5E5] border border-[#404040]'
            }`}
          >
            V4.9
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-5 text-sm font-display font-medium tracking-wide"
          aria-label="Main Navigation"
        >
          <a
            href="#projects"
            className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
              isLime ? 'text-[#191A23] hover:text-black' : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
            }`}
          >
            Projects
          </a>
          <a
            href="#audit-table"
            className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
              isLime ? 'text-[#191A23] hover:text-black' : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
            }`}
          >
            Compliance Audit
          </a>
          <a
            href="#founder"
            className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
              isLime ? 'text-[#191A23] hover:text-black' : 'text-[#A3A3A3] hover:text-[#FFFFFF]'
            }`}
          >
            Founder Dossier
          </a>

          {/* Consultation History Button in Nav */}
          <button
            onClick={openHistoryModal}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
              isLime
                ? 'bg-[#F3F3F3] border-[#191A23]/30 text-[#191A23] hover:bg-[#B9FF66]'
                : 'bg-[#141414] border-[#333333] text-[#A3A3A3] hover:text-white'
            }`}
            title="View client consultation history"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Bookings [{userBookingsCount}]</span>
          </button>

          {/* Admin Portal Button - ONLY shown to logged-in Admin */}
          {isAdmin && (
            <button
              onClick={openAdminPortal}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
                isLime
                  ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] shadow-sm'
                  : 'bg-white text-black font-bold'
              }`}
              title="Admin Console Active"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B9FF66] dark:text-black" />
              <span>Admin Portal</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}
        </nav>

        {/* Zone 3: Auth & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* User Sign In / User Profile */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer ${
                  isAdmin
                    ? isLime
                      ? 'bg-[#B9FF66] border-[#191A23] text-[#191A23] shadow-sm'
                      : 'bg-white text-black border-white'
                    : isLime
                    ? 'bg-white border-[#191A23] text-[#191A23] hover:bg-[#F3F3F3]'
                    : 'bg-[#141414] border-[#333333] text-white hover:border-white'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] uppercase font-bold ${
                  isAdmin ? 'bg-black text-[#B9FF66]' : 'bg-[#3F6900] text-white'
                }`}>
                  {isAdmin ? '★' : currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline truncate max-w-[110px]">
                  {isAdmin ? 'Admin' : currentUser.name}
                </span>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 p-3 rounded-2xl border-2 shadow-brutal z-50 flex flex-col gap-2 ${
                    isLime ? 'bg-white border-[#191A23] text-[#191A23]' : 'bg-[#0E0E0E] border-[#333333] text-white'
                  }`}
                >
                  <div className="pb-2 border-b border-current/10">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold block text-sm">{currentUser.name}</span>
                      {isAdmin && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#B9FF66] text-[#191A23] border border-[#191A23]">
                          ROOT
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] opacity-70 block truncate">{currentUser.email}</span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">
                      {currentUser.role || 'Client Engineer'}
                    </span>
                  </div>

                  {/* Admin Portal option - ONLY shown to Admin */}
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openAdminPortal();
                      }}
                      className={`p-2 rounded-xl text-left text-xs font-display font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                        isLime
                          ? 'bg-[#191A23] text-[#B9FF66]'
                          : 'bg-white text-black'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Admin Portal Console</span>
                      </span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-current/10">
                        {consultations.length}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      openHistoryModal();
                    }}
                    className={`p-2 rounded-xl text-left text-xs font-display font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                      isLime ? 'hover:bg-[#B9FF66]' : 'hover:bg-[#1E1E1E]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Client Bookings</span>
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    className={`p-2 rounded-xl text-left text-xs font-display font-bold uppercase transition-all flex items-center gap-2 text-red-500 cursor-pointer ${
                      isLime ? 'hover:bg-red-50' : 'hover:bg-red-950/30'
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('signin')}
                className={`hidden sm:inline-flex px-3 py-1.5 text-xs font-display font-bold uppercase hover:underline cursor-pointer ${
                  isLime ? 'text-[#191A23]' : 'text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className={`hidden sm:inline-flex px-3 py-1.5 rounded-lg border text-xs font-display font-bold uppercase transition-all cursor-pointer ${
                  isLime
                    ? 'border-[#191A23] hover:bg-[#F3F3F3]'
                    : 'border-[#333333] text-white hover:border-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Primary Action Button: Book Consult */}
          <button
            onClick={onOpenConsultation}
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs font-display font-bold uppercase transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              isLime
                ? 'bg-[#B9FF66] text-[#191A23] border border-[#191A23] rounded-full shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none'
                : 'bg-[#FFFFFF] text-[#000000] border border-[#FFFFFF] rounded-none hover:bg-[#E5E5E5]'
            }`}
          >
            <span>Book Consult</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
              isLime
                ? 'border-[#191A23] text-[#191A23] hover:bg-[#F3F3F3]'
                : 'border-[#333333] text-white hover:bg-[#1A1A1A]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-6 py-6 border-b flex flex-col gap-4 font-display font-medium text-base ${
            isLime
              ? 'bg-white border-[#191A23]/15 text-[#191A23]'
              : 'bg-[#0A0A0A] border-[#262626] text-[#E5E5E5]'
          }`}
        >
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-[#B9FF66]"
          >
            Projects Archive
          </a>
          <a
            href="#audit-table"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-[#B9FF66]"
          >
            Compliance Audit
          </a>
          <a
            href="#founder"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 hover:text-[#B9FF66]"
          >
            Founder Dossier
          </a>

          {/* Admin Portal in Mobile - ONLY shown to Admin */}
          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAdminPortal();
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-display font-bold uppercase transition-all flex items-center justify-between border cursor-pointer ${
                isLime
                  ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23]'
                  : 'bg-white text-black'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Portal (Unlocked)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-current/10">
                {consultations.length} Requests
              </span>
            </button>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openHistoryModal();
            }}
            className={`w-full py-2.5 px-4 rounded-xl text-left text-xs font-display font-bold uppercase transition-all flex items-center justify-between border cursor-pointer ${
              isLime
                ? 'bg-[#F3F3F3] border-[#191A23]'
                : 'bg-[#141414] border-[#333333] text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Client Bookings</span>
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-current/10">
              {userBookingsCount}
            </span>
          </button>

          {!currentUser ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signin');
                }}
                className={`py-2 text-center text-xs font-bold uppercase rounded-lg border ${
                  isLime ? 'border-[#191A23]' : 'border-white text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signup');
                }}
                className={`py-2 text-center text-xs font-bold uppercase rounded-lg border ${
                  isLime
                    ? 'bg-[#191A23] text-white border-[#191A23]'
                    : 'bg-white text-black border-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2 border-t border-current/10">
              <div>
                <span className="text-sm font-bold block">{currentUser.name}</span>
                <span className="text-xs font-mono opacity-70 block">{currentUser.email}</span>
              </div>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-mono font-bold text-red-500 hover:underline"
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className={`w-full py-3 text-center text-xs font-bold uppercase rounded-lg border cursor-pointer mt-2 ${
              isLime
                ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23]'
                : 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
            }`}
          >
            Book Direct Consultation
          </button>
        </div>
      )}
    </header>
  );
};
