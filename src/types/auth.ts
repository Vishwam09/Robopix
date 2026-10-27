export interface User {
  id: string;
  name: string;
  email: string;
  organization?: string;
  role?: string;
  avatar?: string;
  firebaseUid?: string;
  isAdmin?: boolean;
}

export type ConsultationStatus = 'CONFIRMED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ConsultationBooking {
  id: string;
  userId?: string;
  clientName: string;
  contactInfo: string;
  serviceDomain: string;
  timeline: string;
  budget: string;
  projectBrief: string;
  status: ConsultationStatus;
  createdAt: string;
  scheduledSlot?: string;
  meetingLink?: string;
  adminNotes?: string;
}
