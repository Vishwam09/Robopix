import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Search,
  Download,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DesignSystemTheme } from '../types/portfolio';
import { ConsultationStatus, ConsultationBooking } from '../types/auth';

interface AdminPortalModalProps {
  currentTheme: DesignSystemTheme;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ currentTheme }) => {
  const {
    isAdminPortalOpen,
    closeAdminPortal,
    isAdmin,
    currentUser,
    signIn,
    signOut,
    consultations,
    updateBookingStatus,
    deleteBooking,
  } = useAuth();

  // Admin Login Gate State (for when not logged in as Admin)
  const [adminUser, setAdminUser] = useState('Admin123@gmail.com');
  const [adminPass, setAdminPass] = useState('');
  const [gateError, setGateError] = useState('');
  const [gateLoading, setGateLoading] = useState(false);

  // Admin Dashboard State (when logged in as Admin)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | ConsultationStatus>('ALL');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editMeetingLink, setEditMeetingLink] = useState('');

  const isLime = currentTheme === 'lime';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAdminPortal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAdminPortal]);

  if (!isAdminPortalOpen) return null;

  // Handle Admin Gate Login
  const handleAdminGateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError('');
    setGateLoading(true);
    try {
      await signIn(adminUser.trim(), adminPass.trim());
      setAdminPass('');
    } catch (err: any) {
      setGateError(err?.message || 'Access Denied. Only Admin account can view requests.');
    } finally {
      setGateLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setAdminUser('Admin123@gmail.com');
    setAdminPass('123456789');
    setGateError('');
  };

  // Filtered requests
  const filteredRequests = consultations.filter((item) => {
    const matchesFilter = filterStatus === 'ALL' || item.status === filterStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serviceDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectBrief.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const pendingCount = consultations.filter((c) => c.status === 'PENDING').length;
  const confirmedCount = consultations.filter((c) => c.status === 'CONFIRMED' || c.status === 'IN_PROGRESS').length;
  const completedCount = consultations.filter((c) => c.status === 'COMPLETED').length;

  const handleExportCSV = () => {
    const headers = [
      'Request_ID',
      'Client_Name',
      'Contact_Info',
      'Service_Domain',
      'Timeline',
      'Budget_Tier',
      'Status',
      'Created_At',
      'Scheduled_Slot',
      'Meeting_Link',
      'Admin_Notes',
    ];

    const rows = consultations.map((item) => [
      item.id,
      `"${item.clientName.replace(/"/g, '""')}"`,
      `"${item.contactInfo.replace(/"/g, '""')}"`,
      `"${item.serviceDomain.replace(/"/g, '""')}"`,
      `"${item.timeline}"`,
      `"${item.budget}"`,
      item.status,
      item.createdAt,
      `"${item.scheduledSlot || ''}"`,
      `"${item.meetingLink || ''}"`,
      `"${(item.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ROBOPIX_Consultation_Requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startEditing = (req: ConsultationBooking) => {
    setEditingId(req.id);
    setEditNotes(req.adminNotes || '');
    setEditMeetingLink(req.meetingLink || '');
  };

  const saveEditing = (id: string, currentStatus: ConsultationStatus) => {
    updateBookingStatus(id, currentStatus, editNotes, editMeetingLink);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden transition-all duration-200 border-2 ${
          isLime
            ? 'bg-white border-[#191A23] rounded-3xl shadow-brutal-lg text-[#191A23]'
            : 'bg-[#0E0E0E] border-[#333333] rounded-none text-[#E5E5E5]'
        }`}
      >
        {/* ================= IF NOT ADMIN: SECURE LOGIN GATE ================= */}
        {!isAdmin ? (
          <div className="flex flex-col">
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between p-6 border-b ${
                isLime ? 'border-[#191A23]/15 bg-[#F9F9F9]' : 'border-[#262626] bg-[#0A0A0A]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-red-500/20 text-red-500 border border-red-500/30">
                  <ShieldAlert className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-mono text-xs font-bold text-red-500 uppercase">
                    RESTRICTED ARCHITECTURE // ADMIN PORTAL
                  </div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                    Admin Authentication Required
                  </h2>
                </div>
              </div>

              <button
                onClick={closeAdminPortal}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isLime
                    ? 'border-[#191A23] hover:bg-[#191A23] hover:text-white'
                    : 'border-[#333333] hover:bg-white hover:text-black rounded-none'
                }`}
                aria-label="Close Admin Portal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gate Body */}
            <div className="p-8 max-w-md mx-auto w-full space-y-6">
              <div
                className={`p-4 rounded-2xl border text-center space-y-2 ${
                  isLime ? 'bg-[#F9F9F9] border-[#191A23]/20' : 'bg-[#141414] border-[#333333]'
                }`}
              >
                <Lock className="w-8 h-8 mx-auto text-red-500 opacity-80" />
                <h3 className="font-display font-bold text-base uppercase">
                  Protected System Area
                </h3>
                <p className="text-xs font-mono opacity-80 leading-relaxed">
                  Only users authenticated with Admin account (<strong>Admin123@gmail.com</strong>) can view and manage inbound client consultation requests.
                </p>
              </div>

              {gateError && (
                <div className="p-3.5 text-xs font-mono rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
                  {gateError}
                </div>
              )}

              <form onSubmit={handleAdminGateLogin} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    User Account / Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Admin123@gmail.com"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-white border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase opacity-80 mb-1">
                    Admin Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      isLime
                        ? 'bg-white border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                        : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={gateLoading}
                  className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                    isLime
                      ? 'bg-[#191A23] text-[#B9FF66] border-[#191A23] shadow-brutal-sm hover:bg-black'
                      : 'bg-white text-black font-bold border-white hover:bg-[#E5E5E5]'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{gateLoading ? 'Verifying Admin Clearance...' : 'Authenticate as Admin'}</span>
                </button>
              </form>

              {/* Quick Fill Helper */}
              <div
                className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between ${
                  isLime ? 'bg-[#B9FF66]/25 border-[#191A23]' : 'bg-[#1E1E1E] border-[#404040]'
                }`}
              >
                <div>
                  <span className="block font-bold">Admin Credentials Preset:</span>
                  <span className="opacity-75 text-[11px]">User: Admin123@gmail.com · Password: 123456789</span>
                </div>
                <button
                  type="button"
                  onClick={fillAdminCredentials}
                  className={`px-3 py-1 rounded-lg border font-bold text-[11px] uppercase transition-all cursor-pointer ${
                    isLime ? 'bg-white border-[#191A23] hover:bg-black hover:text-white' : 'bg-white text-black'
                  }`}
                >
                  Quick Fill
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= IF AUTHENTICATED ADMIN: FULL COMMAND PORTAL ================= */
          <div className="flex flex-col h-full overflow-hidden">
            {/* Modal Top Header */}
            <div
              className={`flex flex-wrap items-center justify-between p-6 border-b gap-4 ${
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
                    ROOT // EXECUTIVE ADMIN CONSOLE
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>LOGGED IN AS: ADMIN</span>
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1">
                  Inbound Consultation Requests
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCSV}
                  className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
                    isLime
                      ? 'bg-white text-[#191A23] border-[#191A23] shadow-brutal-sm hover:bg-[#B9FF66]'
                      : 'bg-[#141414] text-white border-[#333333] hover:border-white'
                  }`}
                  title="Export all requests to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={closeAdminPortal}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isLime
                      ? 'border-[#191A23] hover:bg-[#191A23] hover:text-white'
                      : 'border-[#333333] hover:bg-white hover:text-black rounded-none'
                  }`}
                  aria-label="Close Admin Portal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Admin Metric Cards Strip */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 p-4 border-b text-xs font-mono gap-3 ${
                isLime ? 'bg-[#F3F3F3] border-[#191A23]/10' : 'bg-[#141414] border-[#262626]'
              }`}
            >
              <div>
                <span className="opacity-60 block uppercase text-[10px]">TOTAL INBOUND</span>
                <span className="font-display font-bold text-2xl tabular-nums">{consultations.length}</span>
                <span className="text-[10px] opacity-70">Client submissions</span>
              </div>
              <div>
                <span className="opacity-60 block uppercase text-[10px]">PENDING TRIAGE</span>
                <span className="font-display font-bold text-2xl tabular-nums text-amber-600 dark:text-amber-400">
                  {pendingCount}
                </span>
                <span className="text-[10px] opacity-70">Requires response</span>
              </div>
              <div>
                <span className="opacity-60 block uppercase text-[10px]">CONFIRMED / ACTIVE</span>
                <span className="font-display font-bold text-2xl tabular-nums text-emerald-600 dark:text-emerald-400">
                  {confirmedCount}
                </span>
                <span className="text-[10px] opacity-70">Scheduled sprints</span>
              </div>
              <div>
                <span className="opacity-60 block uppercase text-[10px]">COMPLETED ARCHIVES</span>
                <span className="font-display font-bold text-2xl tabular-nums opacity-80">{completedCount}</span>
                <span className="text-[10px] opacity-70">Closed contracts</span>
              </div>
            </div>

            {/* Search and Status Filters */}
            <div
              className={`p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isLime ? 'bg-white border-[#191A23]/10' : 'bg-[#0E0E0E] border-[#262626]'
              }`}
            >
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Search client, email, domain, or request ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border transition-all ${
                    isLime
                      ? 'bg-white border-[#191A23] text-[#191A23] focus:ring-2 focus:ring-[#B9FF66]'
                      : 'bg-[#141414] border-[#333333] text-white focus:border-white'
                  }`}
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 font-mono text-xs font-bold uppercase">
                {(['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
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
            </div>

            {/* Consultation Requests List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filteredRequests.length === 0 ? (
                <div
                  className={`p-12 text-center rounded-2xl border-2 border-dashed ${
                    isLime
                      ? 'border-[#191A23]/30 bg-[#F9F9F9] text-[#191A23]'
                      : 'border-[#333333] bg-[#141414] text-[#A3A3A3]'
                  }`}
                >
                  <Layers className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <h3 className="font-display text-lg font-bold uppercase">No Consultation Requests Found</h3>
                  <p className="text-xs font-mono mt-1 opacity-80">
                    No records match the active filter or search query.
                  </p>
                </div>
              ) : (
                filteredRequests.map((req) => {
                  const isEditing = editingId === req.id;
                  const whatsappClientUrl = `https://wa.me/919510477366?text=ROBOPIX%20Systems%20Admin:%20Hello%20${encodeURIComponent(
                    req.clientName
                  )},%20regarding%20your%20request%20[${req.id}]:%20${encodeURIComponent(req.serviceDomain)}`;

                  return (
                    <div
                      key={req.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isLime
                          ? req.status === 'PENDING'
                            ? 'bg-amber-500/5 border-amber-600/40 shadow-sm'
                            : 'bg-[#F9F9F9] border-[#191A23] shadow-brutal-sm'
                          : req.status === 'PENDING'
                          ? 'bg-[#18150F] border-amber-500/40'
                          : 'bg-[#141414] border-[#262626] rounded-none'
                      }`}
                    >
                      {/* Top Header of Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-current/10">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-current/10">
                            {req.id}
                          </span>
                          <div>
                            <span className="font-display font-bold uppercase text-base block">
                              {req.clientName}
                            </span>
                            <span className="font-mono text-xs text-[#3F6900] dark:text-[#B9FF66] font-bold block">
                              {req.serviceDomain}
                            </span>
                          </div>
                        </div>

                        {/* Status Change Selector for Admin */}
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] font-mono font-bold uppercase opacity-60 hidden sm:inline">
                            Status:
                          </label>
                          <select
                            value={req.status}
                            onChange={(e) => updateBookingStatus(req.id, e.target.value as ConsultationStatus)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase border cursor-pointer ${
                              req.status === 'CONFIRMED'
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                                : req.status === 'PENDING'
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40'
                                : req.status === 'IN_PROGRESS'
                                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40'
                                : 'bg-neutral-500/20 text-neutral-600 dark:text-neutral-400 border-neutral-500/40'
                            }`}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>
                      </div>

                      {/* Request Details Matrix */}
                      <div className="py-3 text-xs font-mono space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-2.5 rounded-xl bg-current/5 border border-current/10">
                            <span className="opacity-60 block text-[10px] uppercase">CLIENT CONTACT</span>
                            <span className="font-bold flex items-center gap-1.5 mt-0.5">
                              <Mail className="w-3 h-3 opacity-60" />
                              <a href={`mailto:${req.contactInfo}`} className="hover:underline">
                                {req.contactInfo}
                              </a>
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-current/5 border border-current/10">
                            <span className="opacity-60 block text-[10px] uppercase">BUDGET ESTIMATION</span>
                            <span className="font-bold block mt-0.5">{req.budget}</span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-current/5 border border-current/10">
                            <span className="opacity-60 block text-[10px] uppercase">TIMELINE SPRINT</span>
                            <span className="font-bold block mt-0.5">{req.timeline}</span>
                          </div>
                        </div>

                        {/* Project Brief */}
                        <div>
                          <span className="opacity-60 block text-[10px] uppercase mb-1">
                            CLIENT SPECIFICATIONS / PROBLEM BRIEF
                          </span>
                          <p className="font-body text-xs sm:text-sm p-3.5 rounded-xl bg-current/5 border border-current/10 leading-relaxed">
                            {req.projectBrief}
                          </p>
                        </div>

                        {/* Admin Notes & Meeting Link */}
                        {isEditing ? (
                          <div className="p-3.5 rounded-xl border border-dashed border-current/30 space-y-2 bg-current/5">
                            <span className="text-[10px] font-bold uppercase opacity-80 block">
                              EDIT ARCHITECT NOTES &amp; MEETING URL
                            </span>
                            <input
                              type="text"
                              placeholder="Google Meet or Zoom URL (e.g. https://meet.google.com/xyz)"
                              value={editMeetingLink}
                              onChange={(e) => setEditMeetingLink(e.target.value)}
                              className={`w-full p-2 rounded-lg border text-xs font-mono ${
                                isLime ? 'bg-white border-[#191A23]' : 'bg-[#141414] border-[#333333]'
                              }`}
                            />
                            <textarea
                              rows={2}
                              placeholder="Internal architect notes (e.g. PCB KiCad review scheduled, client contacted)"
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              className={`w-full p-2 rounded-lg border text-xs font-mono ${
                                isLime ? 'bg-white border-[#191A23]' : 'bg-[#141414] border-[#333333]'
                              }`}
                            />
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1 rounded-lg border text-[11px] font-bold uppercase"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => saveEditing(req.id, req.status)}
                                className={`px-4 py-1 rounded-lg font-bold text-[11px] uppercase ${
                                  isLime ? 'bg-[#191A23] text-[#B9FF66]' : 'bg-white text-black'
                                }`}
                              >
                                Save Notes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-current/5 border border-current/10 text-[11px]">
                            <div className="space-y-0.5">
                              {req.meetingLink && (
                                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>Meeting: {req.meetingLink}</span>
                                </div>
                              )}
                              {req.adminNotes && (
                                <div>
                                  <span className="opacity-60">Architect Notes: </span>
                                  <span>{req.adminNotes}</span>
                                </div>
                              )}
                              {!req.meetingLink && !req.adminNotes && (
                                <span className="opacity-60 italic">No architect notes recorded yet.</span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => startEditing(req)}
                              className="px-2.5 py-1 rounded border text-[10px] font-bold uppercase hover:bg-current/10 transition-all flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{req.adminNotes ? 'Edit Notes' : 'Add Notes'}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-current/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <span className="opacity-60 text-[11px]">RECEIVED: {req.createdAt}</span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete request ${req.id} from ${req.clientName}?`)) {
                                deleteBooking(req.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <a
                            href={whatsappClientUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-all flex items-center gap-1.5 border ${
                              isLime
                                ? 'bg-[#191A23] text-white border-[#191A23] hover:bg-[#B9FF66] hover:text-[#191A23]'
                                : 'bg-white text-black border-white hover:bg-[#E5E5E5]'
                            }`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Reply via WhatsApp</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Admin Bottom Bar */}
            <div
              className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
                isLime ? 'bg-[#F9F9F9] border-[#191A23]/15' : 'bg-[#0A0A0A] border-[#262626]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Authorized Admin Session: <strong>Admin</strong> (Admin123@gmail.com)</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => signOut()}
                  className="text-red-500 font-bold uppercase hover:underline cursor-pointer"
                >
                  Sign Out of Admin
                </button>
                <button
                  onClick={closeAdminPortal}
                  className="font-bold uppercase hover:underline cursor-pointer"
                >
                  Close Console
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
