import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Building, ArrowRight, ShieldCheck, KeyRound, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DesignSystemTheme } from '../types/portfolio';
import { getFriendlyErrorMessage } from '../services/firebaseAuth';

interface AuthModalProps {
  currentTheme: DesignSystemTheme;
}

export const AuthModal: React.FC<AuthModalProps> = ({ currentTheme }) => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, signIn, signUp, sendPasswordReset } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup' | 'forgot'>(authModalMode);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  useEffect(() => {
    setTab(authModalMode);
    setErrorMessage('');
    setResetSuccessMessage('');
  }, [authModalMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const isLime = currentTheme === 'lime';

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResetSuccessMessage('');

    const isAdminIdentifier =
      email.trim().toLowerCase() === 'admin' || email.trim().toLowerCase() === 'admin@robopix.in';

    if (!isAdminIdentifier && !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address (or username "Admin").');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err: any) {
      setErrorMessage(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResetSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signUp(name.trim(), email.trim(), password, organization.trim());
    } catch (err: any) {
      setErrorMessage(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResetSuccessMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address to receive the reset link.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setResetSuccessMessage(`A password reset link has been dispatched to ${email.trim()}. Please check your inbox.`);
    } catch (err: any) {
      setErrorMessage(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md overflow-hidden transition-all duration-200 border-2 ${
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
                FIREBASE // AUTH CLUSTER
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight mt-1">
              {tab === 'signin'
                ? 'Sign In to Portal'
                : tab === 'signup'
                ? 'Create Client Account'
                : 'Reset Password'}
            </h2>
          </div>

          <button
            onClick={closeAuthModal}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isLime
                ? 'border-[#191A23] hover:bg-[#191A23] hover:text-white'
                : 'border-[#333333] hover:bg-white hover:text-black rounded-none'
            }`}
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch (Sign In vs Sign Up) */}
        {tab !== 'forgot' && (
          <div className="grid grid-cols-2 p-1.5 m-6 mb-2 rounded-xl bg-current/5 border border-current/15 text-xs font-display font-bold uppercase">
            <button
              onClick={() => {
                setTab('signin');
                setErrorMessage('');
                setResetSuccessMessage('');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                tab === 'signin'
                  ? isLime
                    ? 'bg-[#191A23] text-white shadow-sm'
                    : 'bg-white text-black'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setTab('signup');
                setErrorMessage('');
                setResetSuccessMessage('');
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                tab === 'signup'
                  ? isLime
                    ? 'bg-[#191A23] text-white shadow-sm'
                    : 'bg-white text-black'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 pt-3 space-y-4">
          {errorMessage && (
            <div className="p-3 text-xs font-mono rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          {resetSuccessMessage && (
            <div className="p-3.5 text-xs font-mono rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{resetSuccessMessage}</span>
            </div>
          )}

          {/* SIGN IN VIEW */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase opacity-80">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTab('forgot');
                      setErrorMessage('');
                      setResetSuccessMessage('');
                    }}
                    className="text-[10px] font-mono opacity-70 hover:opacity-100 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                  isLime
                    ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] shadow-brutal-sm hover:bg-black'
                    : 'bg-white text-black font-bold border-white hover:bg-[#E5E5E5]'
                } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Client Demo Fast Track */}
              <div className="pt-2 border-t border-current/15">
                <span className="text-[10px] font-mono uppercase opacity-60 block mb-1.5">
                  DEMO CLIENT QUICK FILL
                </span>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('patelashwin918@gmail.com');
                      setPassword('demo-access-2026');
                    }}
                    className={`w-full py-1.5 px-2 rounded-lg border text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isLime
                        ? 'bg-[#F3F3F3] border-[#191A23]/30 text-[#191A23] hover:bg-[#E8E8E8]'
                        : 'bg-[#141414] border-[#333333] text-white hover:border-white'
                    }`}
                  >
                    <span>Client: Ashwin Patel (Verified Lead)</span>
                  </button>
                </div>
              </div>
                    className={`py-1.5 px-2 rounded-lg border text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      isLime
                        ? 'bg-[#F3F3F3] border-[#191A23]/30 hover:bg-[#E8E8E8]'
                        : 'bg-[#141414] border-[#333333] hover:text-white'
                    }`}
                  >
                    Client (Demo)
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* SIGN UP VIEW */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5 font-mono text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashwin Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                  Work Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="email"
                    required
                    placeholder="patelashwin918@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="text"
                    placeholder="e.g. AeroSystems Engineering"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    <input
                      type="password"
                      required
                      placeholder="Min 6 chars"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                        isLime
                          ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                          : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    <input
                      type="password"
                      required
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                        isLime
                          ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                          : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                  isLime
                    ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] shadow-brutal-sm hover:bg-black'
                    : 'bg-white text-black font-bold border-white hover:bg-[#E5E5E5]'
                } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register Client Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {tab === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4 font-mono text-xs">
              <p className="text-xs opacity-80 leading-relaxed font-body">
                Enter your registered email address to receive a secure Firebase password reset link.
              </p>

              <div>
                <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-[#F9F9F9] border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setTab('signin');
                    setErrorMessage('');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all border cursor-pointer ${
                    isLime ? 'border-[#191A23] hover:bg-[#F3F3F3]' : 'border-[#333333] hover:border-white'
                  }`}
                >
                  Back to Sign In
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-2.5 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                    isLime
                      ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] shadow-brutal-sm hover:bg-black'
                      : 'bg-white text-black font-bold border-white hover:bg-[#E5E5E5]'
                  } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div
          className={`p-4 border-t flex items-center justify-between text-[11px] font-mono ${
            isLime ? 'bg-[#F9F9F9] border-[#191A23]/15' : 'bg-[#0A0A0A] border-[#262626]'
          }`}
        >
          <div className="flex items-center gap-2 opacity-70">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Firebase Security · TLS 1.3 End-to-End</span>
          </div>
          <span className="opacity-60">ROBOPIX V4.9</span>
        </div>
      </div>
    </div>
  );
};
