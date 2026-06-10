import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../App';
import { Logo } from './Logo';

const NAV_ITEMS = [
  { icon: 'dashboard', label: 'Workspace', path: '/workspace' },
  { icon: 'chat', label: 'Research Assistant', path: '/chat' },
  { icon: 'library_books', label: 'Library Resources', path: '/library' },
  { icon: 'upload_file', label: 'Uploaded Documents', path: '/analyze' },
  { icon: 'mic', label: 'Transcription', path: '/transcribe' },
  { icon: 'style', label: 'Flashcards', path: '/flashcards' },
  { icon: 'bookmark', label: 'Bookmarks', path: '/bookmarks' },
  { icon: 'settings', label: 'Settings', path: '/settings' }
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  return (
    <nav className="w-[260px] h-full bg-surface-container-lowest border-r border-outline-variant flex flex-col">
      <div className="p-5 flex items-center gap-3">
        <Logo className="w-10 h-10 flex-shrink-0" />
        <span className="text-on-surface font-headline-md tracking-tight">Kabu AI</span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors h-[44px]",
                isActive 
                  ? "bg-surface-container-high text-primary border-l-4 border-l-primary" 
                  : "text-on-surface hover:bg-surface-container-low"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-label-lg text-[14px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-outline-variant flex items-center gap-3">
         <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface border border-outline">
           <span className="material-symbols-outlined">person</span>
         </div>
         <div className="flex flex-col">
           <span className="text-on-surface text-[14px] font-semibold truncate max-w-[140px]">{user?.user_metadata?.full_name || 'Kabu Student'}</span>
           <span className="text-outline text-[12px]">Kabarak University</span>
         </div>
      </div>
    </nav>
  );
}
