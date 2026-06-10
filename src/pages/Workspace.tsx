import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiService, Chat } from '../services/api';
import { useAuth } from '../App';

export default function Workspace() {
  const { user } = useAuth();
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getRecentChats().then(setRecentChats);
  }, []);

  const handleNewChat = async () => {
    const chat = await ApiService.startChat('');
    navigate(`/chat/${chat.id}`);
  };

  return (
    <div className="w-full h-full p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto">
      <header className="mb-8 hidden md:flex items-start justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">My Academic Workspace</h1>
          <p className="text-body-sm text-on-surface-variant">Welcome back. What are we researching today?</p>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link to="/analyze" className="h-10 px-4 rounded-xl border border-outline-variant flex items-center gap-2 text-on-surface hover:border-outline transition-colors text-[14px]">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Upload
          </Link>
        </div>
      </header>

      {/* QUICK ACTIONS */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
        <button onClick={handleNewChat} className="flex-shrink-0 min-w-[140px] bg-surface-container-low border border-outline-variant rounded-3xl p-5 hover:border-outline hover:bg-surface-container transition-colors text-left flex flex-col justify-between h-[160px]">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">chat</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-on-surface">New Chat</h3>
            <p className="text-[12px] text-on-surface-variant leading-tight mt-1 hidden md:block">Start a focused dialogue with your AI tutor.</p>
          </div>
        </button>

        <Link to="/analyze" className="flex-shrink-0 min-w-[140px] bg-surface-container-low border border-outline-variant rounded-3xl p-5 hover:border-outline hover:bg-surface-container transition-colors text-left flex flex-col justify-between h-[160px]">
          <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant text-on-surface flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-on-surface">Analyze</h3>
            <p className="text-[12px] text-on-surface-variant leading-tight mt-1 hidden md:block">Extract insights from complex PDF documents.</p>
          </div>
        </Link>
        
        <Link to="/transcribe" className="flex-shrink-0 min-w-[140px] bg-surface-container-low border border-outline-variant rounded-3xl p-5 hover:border-outline hover:bg-surface-container transition-colors text-left flex flex-col justify-between h-[160px]">
          <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant text-on-surface flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">mic</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-on-surface">Transcribe</h3>
            <p className="text-[12px] text-on-surface-variant leading-tight mt-1 hidden md:block">Convert lecture recordings into notes.</p>
          </div>
        </Link>
        
        <Link to="/library" className="flex-shrink-0 min-w-[140px] bg-surface-container-low border border-outline-variant rounded-3xl p-5 hover:border-outline hover:bg-surface-container transition-colors text-left flex flex-col justify-between h-[160px]">
          <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant text-on-surface flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">library_books</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-on-surface">Library</h3>
            <p className="text-[12px] text-on-surface-variant leading-tight mt-1 hidden md:block">Access your stored academic resources.</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline-sm text-on-surface">Recent Chats</h2>
            <Link to="/chat" className="text-primary text-[14px]">View All</Link>
          </div>
          
          {recentChats.length === 0 ? (
            <div className="border border-dashed border-outline-variant rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-outline mb-3">
                <span className="material-symbols-outlined">chat_bubble_outline</span>
              </div>
              <p className="text-on-surface text-[14px]">No chats yet. Start a new conversation.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentChats.map(chat => (
                <Link key={chat.id} to={`/chat/${chat.id}`} className="flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant rounded-2xl hover:bg-surface-container transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">article</span>
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium text-on-surface truncate group-hover:text-primary transition-colors">{chat.title}</h4>
                      <p className="text-[12px] text-outline mt-0.5">Last activity: {new Date(chat.lastActivity).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary">chevron_right</span>
                </Link>
              ))}
            </div>
          )}
          
          {/* Quick Chat Input */}
          <div className="mt-8 bg-surface-container border border-outline-variant rounded-full p-2 flex items-center pr-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[20px]">attachment</span>
            </div>
            <input 
              type="text" 
              placeholder="Ask Kabu AI to summarize a paper or solve a problem..." 
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-on-surface px-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  ApiService.startChat(e.currentTarget.value).then(res => navigate(`/chat/${res.id}`));
                }
              }}
            />
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="font-headline-sm text-on-surface mb-4">Study Statistics</h2>
          <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-5 space-y-4">
            <div className="flex items-end justify-between">
              <span className="text-[14px] text-on-surface-variant">Focused Time</span>
              <span className="font-mono text-display-lg text-on-surface leading-none">24<span className="text-xl">h</span></span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
               <div className="bg-primary-container h-full w-[70%]"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-surface-container border border-outline-variant rounded-2xl p-4">
                 <div className="text-[12px] text-on-surface-variant mb-1">Documents Analyzed</div>
                 <div className="font-mono text-[24px] text-on-surface">128</div>
              </div>
              <div className="bg-surface-container border border-outline-variant rounded-2xl p-4">
                 <div className="text-[12px] text-on-surface-variant mb-1">Queries Answered</div>
                 <div className="font-mono text-[24px] text-on-surface">1.2k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
