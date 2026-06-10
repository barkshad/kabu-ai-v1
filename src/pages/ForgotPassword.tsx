import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth';
import { Logo } from '../components/Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      await AuthService.sendLoginLink(email);
      setMessage('Magic link instructions sent to your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to send connect link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-3 mb-8">
        <Logo className="w-10 h-10" />
        <span className="text-on-surface font-headline-md tracking-tight">Kabu AI</span>
      </div>

      <div className="w-full max-w-[420px] bg-surface-container-low border border-outline-variant rounded-[24px] p-6 md:p-8 shadow-2xl relative">
        {error && (
          <div className="mb-4 bg-error-container/20 border border-error/30 rounded-xl p-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-error text-[20px]">error</span>
            <span className="text-on-error-container text-[14px]">{error}</span>
          </div>
        )}
        
        {message && (
          <div className="mb-4 bg-primary-container/20 border border-primary/30 rounded-xl p-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
            <span className="text-on-surface text-[14px]">{message}</span>
          </div>
        )}

        <h1 className="text-headline-lg font-bold text-center mb-2">Login Help</h1>
        <p className="text-body-sm text-on-surface-variant text-center mb-8">Enter your university email to receive a new magic link.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-label-lg text-on-surface-variant mb-2">University Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-[52px] bg-surface-container-low border border-outline-variant focus:border-primary rounded-xl pl-12 pr-4 text-on-surface placeholder-outline focus:outline-none"
                placeholder="student@kabarak.ac.ke"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !email}
            className="w-full h-[48px] bg-primary-container text-on-primary-container hover:bg-inverse-primary rounded-xl font-label-lg transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="flex items-center justify-center gap-1 text-[14px] text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
