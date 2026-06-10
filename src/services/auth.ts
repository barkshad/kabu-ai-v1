import { 
  signOut, 
  onAuthStateChanged,
  User,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export const AuthService = {
  subscribeToAuthChanges(callback: (user: User | null) => void) {
    if (!auth) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },

  async sendLoginLink(email: string) {
    if (!auth) throw new Error("Firebase Auth not initialized");
    const actionCodeSettings = {
      url: window.location.origin + '/verify', // Must match our route
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (err: any) {
      console.error("Firebase sendSignInLinkToEmail Error:", err);
      if (err.code === 'auth/unauthorized-continue-uri') {
        throw new Error(`Domain not allowed by Firebase. Please add "${window.location.hostname}" to the Authorized Domains list in your Firebase Console (Authentication -> Settings).`);
      }
      throw err;
    }
  },

  isSignInLink(link: string) {
    if (!auth) return false;
    return isSignInWithEmailLink(auth, link);
  },

  async verifySignInLink(email: string, link: string) {
    if (!auth) throw new Error("Firebase Auth not initialized");
    const result = await signInWithEmailLink(auth, email, link);
    window.localStorage.removeItem('emailForSignIn');
    return result.user;
  },

  async logout() {
    if (!auth) throw new Error("Firebase Auth not initialized");
    await signOut(auth);
  }
};
