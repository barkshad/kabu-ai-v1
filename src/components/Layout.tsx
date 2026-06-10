import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Logo } from './Logo';

export function Layout() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex h-[100dvh] w-full bg-background text-on-surface overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10 pt-14 md:pt-0 pb-16 md:pb-0">
        {/* Mobile Top App Bar */}
        <header className="md:hidden absolute top-0 left-0 w-full h-[56px] border-b border-outline-variant bg-surface-container-lowest flex items-center px-4 justify-between z-30">
          <button className="text-on-surface p-2">
             <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 flex-shrink-0" />
            <span className="font-headline-lg-mobile text-lg font-bold">Kabu AI</span>
          </div>
          <button className="text-on-surface p-2">
             <span className="material-symbols-outlined">account_circle</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden absolute bottom-0 left-0 w-full z-20">
        <BottomNav />
      </div>
    </div>
  );
}
