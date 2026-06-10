import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const MOBILE_TABS = [
  { icon: 'chat', label: 'Chat', path: '/chat' },
  { icon: 'library_books', label: 'Library', path: '/library' },
  { icon: 'upload_file', label: 'Upload', path: '/analyze' },
  { icon: 'style', label: 'Flashcards', path: '/flashcards' },
  { icon: 'person', label: 'Profile', path: '/settings' }
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="h-[64px] bg-surface-container-lowest border-t border-outline-variant flex items-center justify-around px-2">
      {MOBILE_TABS.map(tab => {
        const isActive = location.pathname.startsWith(tab.path);
        return (
          <Link 
            key={tab.path}
            to={tab.path}
            className="flex flex-col items-center justify-center w-16"
          >
            <div className={cn(
              "w-10 h-8 rounded-full flex items-center justify-center transition-colors",
              isActive ? "bg-surface-container-high text-primary" : "text-outline"
            )}>
              <span className={cn(
                "material-symbols-outlined text-[24px]",
                isActive && "font-variation-settings-'FILL'-1"
              )}>{tab.icon}</span>
            </div>
            <span className={cn(
              "text-[10px] mt-1 font-medium",
              isActive ? "text-primary" : "text-outline"
            )}>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  );
}
