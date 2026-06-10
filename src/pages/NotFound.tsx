import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-24 h-24 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-outline mb-6">
        <span className="material-symbols-outlined text-[48px]">search_off</span>
      </div>
      <h1 className="text-display-lg font-bold text-on-surface mb-2 text-center">404</h1>
      <h2 className="text-headline-sm text-on-surface mb-4 text-center">Page Not Found</h2>
      <p className="text-body-md text-on-surface-variant max-w-[400px] text-center mb-8">
        The academic resource or page you are looking for could not be located in our system.
      </p>
      
      <Link to="/" className="bg-primary-container text-on-primary-container hover:bg-inverse-primary rounded-xl px-8 h-12 flex items-center justify-center font-label-lg transition-colors">
        Return to Safety
      </Link>
    </div>
  );
}
