import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ConsultationBooking, ConsultationStatus } from '../types/auth';
import {
  registerWithEmail,
  loginWithEmail,
  logoutUser,
  resetPassword,
  subscribeToAuthChanges,
} from '../services/firebaseAuth';
import { User as FirebaseUser } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  authLoading: boolean;
  isAdmin: boolean;
  consultations: ConsultationBooking[];
  signIn: (identifier: string, pass: string) => Promise<void>;
  signUp: (name: string, email: string, pass: string, org?: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  addBooking: (booking: Omit<ConsultationBooking, 'id' | 'createdAt' | 'status'>) => ConsultationBooking;
  cancelBooking: (id: string) => void;
  updateBookingStatus: (id: string, status: ConsultationStatus, notes?: string, meetingLink?: string) => void;
  deleteBooking: (id: string) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'signin' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  authModalMode: 'signin' | 'signup' | 'forgot';
  isHistoryModalOpen: boolean;
  openHistoryModal: () => void;
  closeHistoryModal: () => void;
  isAdminPortalOpen: boolean;
  openAdminPortal: () => void;
  closeAdminPortal: () => void;
}

const INITIAL_BOOKINGS: ConsultationBooking[] = [
  {
    id: 'RPBX-REQ-9014',
    clientName: 'Dr. Evelyn Vance',
    contactInfo: 'evelyn.vance@vancetech.io',
    serviceDomain: 'Robotics & Embedded Systems',
    timeline: 'Immediate (Urgent Sprint)',
    budget: '$7,500 - $20,000+ (Enterprise)',
    projectBrief: 'ESP32-based RTOS agricultural sensor telemetry platform with low-power LoRaWAN edge gateway integration.',
    status: 'PENDING',
    createdAt: '2026-10-27 02:40 UTC',
    adminNotes: 'High-priority enterprise lead. Requires custom PCB KiCad review.',
  },
  {
    id: 'RPBX-REQ-8842',
    clientName: 'Marcus Sterling',
    contactInfo: 'm.sterling@orbitaldynamics.de',
    serviceDomain: 'Mission-Critical Web Platforms',
    timeline: 'Within 2-4 Weeks',
    budget: '$2,500 - $7,500 (Production Unit)',
    projectBrief: 'Real-time telemetry avionics console interface built with sub-millisecond WebSocket data visualization.',
    status: 'CONFIRMED',
    createdAt: '2026-10-26 19:15 UTC',
    scheduledSlot: 'Wed, 14:00 UTC',
    meetingLink: 'https://meet.google.com/rpb-orbital-console',
    adminNotes: 'Sprint scheduled with architecture team.',
  },
  {
    id: 'RPBX-REQ-8492',
    clientName: 'Ashwin Patel',
    contactInfo: 'patelashwin918@gmail.com',
    serviceDomain: 'Robotics & Embedded Systems',
    timeline: 'Within 2-4 Weeks',
    budget: '$2,500 - $7,500 (Production Unit)',
    projectBrief: 'ESP32 firmware customization and autonomous 4WD motor telemetry integration with custom sonar avoidance.',
    status: 'CONFIRMED',
    createdAt: '2026-10-24 14:30 UTC',
    scheduledSlot: 'Thursday, 15:00 UTC',
    meetingLink: 'https://meet.google.com/rpb-syst-rob',
    adminNotes: 'Initial technical requirements verified.',
  },
  {
    id: 'RPBX-REQ-8105',
    clientName: 'Sara Lindqvist',
    contactInfo: 'sara@nordicautomation.se',
    serviceDomain: 'AI Automation & Prospect Engines',
    timeline: '1-3 Months',
    budget: '$7,500 - $20,000+ (Enterprise)',
    projectBrief: 'Autonomous B2B prospect discovery pipeline with automated WhatsApp API dispatch & CRM synchronization.',
    status: 'IN_PROGRESS',
    createdAt: '2026-10-22 11:00 UTC',
    scheduledSlot: 'Sprint Active: Milestones 1-3',
    adminNotes: 'Prototype model validated on staging edge node.',
  },
  {
    id: 'RPBX-REQ-7201',
    clientName: 'Ashwin Patel',
    contactInfo: 'patelashwin918@gmail.com',
    serviceDomain: 'AI Automation & Prospect Engines',
    timeline: 'Immediate (Urgent Sprint)',
    budget: '$1,000 - $2,500 (Prototype)',
    projectBrief: 'High-intent B2B prospect extraction pipeline with DNS MX validation and automated WhatsApp dispatch.',
    status: 'COMPLETED',
    createdAt: '2026-10-18 09:15 UTC',
    scheduledSlot: 'Completed on Oct 20, 2026',
    adminNotes: 'Deliverables verified. Zero MX bounce rate achieved.',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('rpbx_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [consultations, setConsultations] = useState<ConsultationBooking[]>(() => {
    try {
      const saved = localStorage.getItem('rpbx_consultations');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  const isAdmin = Boolean(
    currentUser?.isAdmin === true ||
    currentUser?.email?.toLowerCase() === 'admin123@gmail.com'
  );

  // Real-time Firebase Authentication state tracking
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((fbUser) => {
      setFirebaseUser(fbUser);
      // Only overwrite if not already logged in as custom Admin session
      if (fbUser) {
        const isUserAdmin = fbUser.email?.toLowerCase() === 'admin123@gmail.com';
        const nameFallback = fbUser.email?.split('@')[0] || 'Client Member';
        const formattedName = nameFallback.charAt(0).toUpperCase() + nameFallback.slice(1);
        setCurrentUser({
          id: fbUser.uid,
          name: fbUser.displayName || (isUserAdmin ? 'Admin' : formattedName),
          email: fbUser.email || '',
          organization: isUserAdmin ? 'ROBOPIX Executive' : 'Verified Client',
          role: isUserAdmin ? 'System Administrator' : 'Technical Lead',
          firebaseUid: fbUser.uid,
          isAdmin: isUserAdmin,
        });
      } else {
        // If not logged in via Firebase, check if local Admin session exists
        try {
          const saved = localStorage.getItem('rpbx_user');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed?.isAdmin && parsed?.email?.toLowerCase() === 'admin123@gmail.com') {
              setCurrentUser(parsed);
              setAuthLoading(false);
              return;
            }
          }
        } catch {
          // ignore
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rpbx_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rpbx_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rpbx_consultations', JSON.stringify(consultations));
  }, [consultations]);

  // Sign In: Supports Admin credentials (User: Admin123@gmail.com / Password: 123456789) and Firebase Auth
  const signIn = async (identifier: string, pass: string): Promise<void> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check Admin Master Credentials: User = Admin123@gmail.com or Admin, Password = 123456789
    if (
      (cleanId === 'admin123@gmail.com' || cleanId === 'admin') &&
      cleanPass === '123456789'
    ) {
      const adminUser: User = {
        id: 'admin_root',
        name: 'Admin',
        email: 'Admin123@gmail.com',
        organization: 'ROBOPIX Executive Command',
        role: 'Master Administrator',
        isAdmin: true,
      };
      setCurrentUser(adminUser);
      setIsAuthModalOpen(false);
      return;
    }

    if ((cleanId === 'admin123@gmail.com' || cleanId === 'admin') && cleanPass !== '123456789') {
      throw new Error('Invalid credentials for Admin account. Please verify password.');
    }

    // Standard Firebase Email/Password Sign In
    await loginWithEmail(identifier, pass);
    setIsAuthModalOpen(false);
  };

  const signUp = async (name: string, email: string, pass: string, org?: string): Promise<void> => {
    const user = await registerWithEmail(name, email, pass);
    setCurrentUser({
      id: user.uid,
      name: name || user.email?.split('@')[0] || 'Client Member',
      email: user.email || email,
      organization: org || 'Engineering Partner',
      role: 'Systems Member',
      firebaseUid: user.uid,
      isAdmin: false,
    });
    setIsAuthModalOpen(false);
  };

  const signOut = async (): Promise<void> => {
    try {
      await logoutUser();
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setIsAdminPortalOpen(false);
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    await resetPassword(email);
  };

  const addBooking = (bookingData: Omit<ConsultationBooking, 'id' | 'createdAt' | 'status'>): ConsultationBooking => {
    const newBooking: ConsultationBooking = {
      ...bookingData,
      id: `RPBX-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      status: 'PENDING',
      scheduledSlot: 'Pending Architect Schedule',
      userId: currentUser?.id,
    };
    setConsultations((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setConsultations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'CANCELLED' } : item))
    );
  };

  const updateBookingStatus = (id: string, status: ConsultationStatus, notes?: string, meetingLink?: string) => {
    setConsultations((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          status,
          adminNotes: notes !== undefined ? notes : item.adminNotes,
          meetingLink: meetingLink !== undefined ? meetingLink : item.meetingLink,
          scheduledSlot: status === 'CONFIRMED' && !item.scheduledSlot ? 'Scheduled by Admin' : item.scheduledSlot,
        };
      })
    );
  };

  const deleteBooking = (id: string) => {
    setConsultations((prev) => prev.filter((item) => item.id !== id));
  };

  const openAuthModal = (mode: 'signin' | 'signup' | 'forgot' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openHistoryModal = () => setIsHistoryModalOpen(true);
  const closeHistoryModal = () => setIsHistoryModalOpen(false);

  const openAdminPortal = () => setIsAdminPortalOpen(true);
  const closeAdminPortal = () => setIsAdminPortalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        firebaseUser,
        authLoading,
        isAdmin,
        consultations,
        signIn,
        signUp,
        signOut,
        sendPasswordReset,
        addBooking,
        cancelBooking,
        updateBookingStatus,
        deleteBooking,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        isHistoryModalOpen,
        openHistoryModal,
        closeHistoryModal,
        isAdminPortalOpen,
        openAdminPortal,
        closeAdminPortal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
