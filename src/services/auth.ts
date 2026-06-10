import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export const AuthService = {
  subscribeToAuthChanges(callback: (user: User | null) => void) {
    // Initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      callback(session?.user || null);
    });

    // Listen for changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        callback(session?.user || null);
      }
    );

    return () => authListener.subscription.unsubscribe();
  },

  async login(email: string, password?: string) {
    if (password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data.user;
    } else {
      return this.sendLoginLink(email);
    }
  },

  async register(email: string, password?: string, fullName?: string) {
    if (password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      return data.user;
    } else {
      return this.sendLoginLink(email);
    }
  },

  async sendLoginLink(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/verify',
      },
    });
    if (error) throw error;
    window.localStorage.setItem('emailForSignIn', email);
  },

  isSignInLink(link: string) {
    return link.includes('access_token=') || link.includes('type=magiclink');
  },

  async verifySignInLink(email: string, link?: string) {
    // Supabase handles the magic link token automatically via the URL fragment.
    // getSession will automatically exchange the #access_token if present.
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (!data.session) throw new Error("No active session. Magic link may have expired.");
    window.localStorage.removeItem('emailForSignIn');
    return data.session.user;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};

