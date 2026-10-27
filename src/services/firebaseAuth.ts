import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  NextOrObserver,
} from 'firebase/auth';
import { app } from '../firebase';

// Use the existing Firebase app instance to obtain Authentication with getAuth(app)
export const auth = getAuth(app);

export function getFriendlyErrorMessage(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in.';
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/user-not-found':
      return 'No registered account found with this email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/too-many-requests':
      return 'Access temporarily restricted due to multiple failed attempts. Please try again later or reset password.';
    case 'auth/network-request-failed':
      return 'Network connection issue. Please check your connection and try again.';
    case 'auth/popup-closed-by-user':
      return 'Authentication window was closed before completion.';
    default:
      return error?.message || 'Authentication error occurred. Please try again.';
  }
}

export async function registerWithEmail(name: string, email: string, pass: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  if (name.trim()) {
    try {
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });
    } catch {
      // profile update non-fatal
    }
  }
  return userCredential.user;
}

export async function loginWithEmail(email: string, pass: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass);
  return userCredential.user;
}

export async function logoutUser() {
  await firebaseSignOut(auth);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email.trim());
}

export function subscribeToAuthChanges(callback: NextOrObserver<FirebaseUser | null>) {
  return onAuthStateChanged(auth, callback);
}
