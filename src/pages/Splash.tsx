import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

export default function Splash() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden" 
         style={{ background: 'radial-gradient(circle at center, #0d1c2d 0%, #051424 100%)' }}>
      <div className="w-full max-w-[480px] bg-surface-container-low border border-outline-variant rounded-[24px] p-8 md:p-10 flex flex-col items-center relative z-10 shadow-2xl">
        <Logo className="w-20 h-20 mb-6" />
        
        <div className="text-primary text-[12px] font-medium tracking-widest uppercase mb-4">
          Kabu AI
        </div>
        
        <h1 className="text-display-lg text-on-surface font-bold text-center tracking-tight leading-[52px] mb-4">
          Academic<br/>Intelligence
        </h1>
        
        <p className="text-on-surface-variant text-[16px] text-center mb-8 max-w-[80%]">
          Exclusive AI research companion for Kabarak University students and faculty.
        </p>
        
        <div className="w-full space-y-4">
          <Link to="/login" className="flex items-center justify-center gap-2 w-full bg-primary-container text-on-primary-container hover:bg-inverse-primary rounded-xl h-12 font-label-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">school</span>
            University Login
          </Link>
          
          <Link to="/register" className="flex items-center justify-center gap-2 w-full bg-transparent border border-outline-variant text-on-surface hover:border-outline rounded-xl h-12 font-label-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Register Access
          </Link>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <button className="text-primary hover:text-on-surface text-[14px] mb-2 transition-colors">
            IT Helpdesk
          </button>
          <span className="text-outline text-[12px]">© Kabarak University Innovation</span>
        </div>
      </div>
    </div>
  );
}
