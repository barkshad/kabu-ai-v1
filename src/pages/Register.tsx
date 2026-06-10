import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth';
import { Logo } from '../components/Logo';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Please agree to the terms.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!email.endsWith('@kabarak.ac.ke') && !email.endsWith('@student.kabarak.ac.ke')) {
      setError("Must use a Kabarak University email domain.");
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (password) {
        await AuthService.register(email, password, name);
        navigate('/workspace');
      } else {
        await AuthService.sendLoginLink(email);
        setMessage('A registration link has been sent to your email. Please check your inbox.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Logo className="w-10 h-10" />
        <span className="text-on-surface font-headline-md tracking-tight">Kabu AI</span>
      </div>

      <div className="w-full max-w-[420px] bg-surface-container-low border border-outline-variant rounded-[24px] p-6 md:p-8 shadow-2xl relative">
        {error && (
          <div className="absolute -top-16 left-0 right-0 bg-error-container/20 border border-error/30 rounded-xl p-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-error text-[20px]">error</span>
            <span className="text-on-error-container text-[14px]">{error}</span>
          </div>
        )}

        {message && (
          <div className="absolute -top-20 left-0 right-0 bg-primary-container/20 border border-primary/30 rounded-xl p-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
            <span className="text-on-surface text-[14px]">{message}</span>
          </div>
        )}

        <h1 className="text-headline-lg font-bold text-center mb-1">Create Your Account</h1>
        <p className="text-body-sm text-on-surface-variant text-center mb-6">For Kabarak University students only</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-label-lg text-on-surface-variant mb-1">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full h-[52px] bg-surface-container-low border border-outline-variant focus:border-primary rounded-xl pl-12 pr-4 text-on-surface placeholder-outline focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-label-lg text-on-surface-variant mb-1">University Email</label>
            <div className="relative mb-2">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-[52px] bg-surface-container-low border border-outline-variant focus:border-primary rounded-xl pl-12 pr-4 text-on-surface placeholder-outline focus:outline-none"
                placeholder="student@student.kabarak.ac.ke"
                required
              />
            </div>
            <div className="bg-surface-container border border-outline-variant rounded-xl p-3 flex gap-2">
               <span className="material-symbols-outlined text-outline text-[16px]">info</span>
               <p className="text-[12px] text-on-surface-variant leading-tight">
                 Only <span className="text-primary font-medium">@kabarak.ac.ke</span> and <span className="text-primary font-medium">@student.kabarak.ac.ke</span> emails are accepted.
               </p>
            </div>
          </div>

          <div>
            <label className="block text-label-lg text-on-surface-variant mb-1">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-[52px] bg-surface-container-low border border-outline-variant focus:border-primary rounded-xl pl-12 pr-12 text-on-surface placeholder-outline focus:outline-none"
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-label-lg text-on-surface-variant mb-1">Confirm Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">autorenew</span>
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full h-[52px] bg-surface-container-low border border-outline-variant focus:border-primary rounded-xl pl-12 pr-12 text-on-surface placeholder-outline focus:outline-none"
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer py-2">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest" 
            />
            <span className="text-[14px] text-on-surface-variant">
              I agree to the <span className="text-primary underline">Terms of Service</span> and <span className="text-primary underline">Privacy Policy</span>.
            </span>
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[48px] bg-primary-container text-on-primary-container hover:bg-inverse-primary rounded-xl font-label-lg transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Processing...' : 'Create Account →'}
          </button>
        </form>

        <div className="mt-6 text-center text-[14px] text-on-surface-variant">
          Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
