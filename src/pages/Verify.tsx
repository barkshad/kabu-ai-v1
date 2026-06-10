import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth';

export default function Verify() {
  const [status, setStatus] = useState('Verifying your sign-in link...');
  const [error, setError] = useState('');
  const [needsEmail, setNeedsEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const navigate = useNavigate();
  const attemptRef = useRef(false);

  useEffect(() => {
    if (attemptRef.current) return;
    
    async function initVerification() {
      if (!AuthService.isSignInLink(window.location.href)) {
        setError('Invalid or expired magic link.');
        return;
      }

      const email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        setNeedsEmail(true);
        setStatus('Please confirm your email to continue.');
        return;
      }

      attemptRef.current = true;
      executeVerification(email);
    }
    
    initVerification();
  }, []);

  const executeVerification = async (email: string) => {
    try {
      setStatus('Authenticating...');
      setNeedsEmail(false);
      await AuthService.verifySignInLink(email, window.location.href);
      setStatus('Success! Redirecting...');
      setTimeout(() => {
        navigate('/workspace');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Error signing in with magic link.');
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    executeVerification(emailInput);
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-surface-container-low border border-outline-variant rounded-[24px] p-6 md:p-8 shadow-2xl relative text-center">
        {error ? (
          <div>
            <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">error</span>
            </div>
            <h1 className="text-headline-sm font-bold text-on-surface mb-2">Verification Failed</h1>
            <p className="text-body-md text-on-surface-variant mb-6">{error}</p>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-primary-container text-on-primary-container hover:bg-inverse-primary rounded-xl font-label-lg transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 rounded-full bg-primary-container text-primary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px] animate-pulse">lock_open</span>
            </div>
            <h1 className="text-headline-sm font-bold text-on-surface mb-2">Authenticating</h1>
            <p className="text-body-md text-on-surface-variant mb-6">{status}</p>
            {needsEmail && (
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4 mt-6 text-left">
                <div>
                  <label className="block text-label-lg text-on-surface-variant mb-2">Confirm Email</label>
                  <input 
                    type="email" 
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    className="w-full h-[52px] bg-surface-container border border-outline-variant focus:border-primary rounded-xl px-4 text-on-surface placeholder-outline focus:outline-none"
                    placeholder="student@kabarak.ac.ke"
                    required
                  />
                </div>
                <button type="submit" className="w-full h-[48px] bg-primary-container text-on-primary-container hover:bg-inverse-primary rounded-xl font-label-lg transition-colors">
                  Confirm and Sign In
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
