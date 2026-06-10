import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { useAuth } from '../App';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  mode?: 'RAG' | 'GENERAL';
  sources?: { title: string, url: string }[];
  isWebSearch?: boolean;
}

export default function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Mock AI Response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `I'm Kabu AI, analyzing your query: "${newMsg.content}". In a fully connected environment, I would synthesize data from your uploaded documents or the Kabarak Library.`,
        mode: isWebSearchEnabled ? 'GENERAL' : 'RAG',
        isWebSearch: isWebSearchEnabled,
        sources: isWebSearchEnabled ? [] : [{ title: "Foundations of Computer Science v2.pdf", url: "#" }]
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] md:h-full w-full bg-background relative">
      <header className="hidden md:flex h-[64px] border-b border-outline-variant items-center justify-between px-6 bg-surface-container-lowest shrink-0">
        <h2 className="font-headline-md text-on-surface">AI Research Chat</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[12px] text-on-surface-variant">Active Model: Kabu-v2</span>
          </div>
          <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto w-full max-w-[800px] mx-auto p-4 md:p-8 flex flex-col gap-6">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-[-10vh]">
            <div className="w-20 h-20 bg-surface-container border border-outline-variant rounded-full flex items-center justify-center mb-6 shadow-xl">
               <span className="material-symbols-outlined text-[32px] text-primary">school</span>
            </div>
            <h1 className="text-headline-lg font-bold text-on-surface mb-2 tracking-tight">How can I assist your research today?</h1>
            <p className="text-body-md text-on-surface-variant max-w-[500px]">Access internal Kabarak academic journals, global databases, and intelligent analysis in one interface.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 w-full max-w-[600px]">
               {['Summarize the latest 2024 AI trends', 'Analyze Kabarak Library\'s 2023 journals', 'Generate a thesis outline for Cyber Security', 'Find citations for Renewables in Africa'].map(text => (
                 <button key={text} onClick={() => { setInput(text); }} className="bg-surface-container-low border border-outline-variant hover:border-primary hover:bg-surface-container-high text-left p-4 rounded-2xl transition-all">
                    <p className="text-[14px] text-on-surface font-medium">{text}</p>
                 </button>
               ))}
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline flex items-center justify-center text-primary mr-3 flex-shrink-0 mt-1">
                  K
                </div>
              )}
              <div className={cn(
                "max-w-[85%] md:max-w-[75%]",
                msg.role === 'user' 
                  ? "bg-surface-container-high border border-outline-variant rounded-2xl rounded-br-sm px-4 py-3"
                  : "pt-1"
              )}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    {msg.mode === 'RAG' ? (
                      <span className="px-2 py-0.5 rounded border border-primary-container/30 bg-surface-container text-primary text-[10px] uppercase font-bold tracking-wider">RAG MODE</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded border border-outline-variant bg-surface-container-high text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">GENERAL</span>
                    )}
                    {msg.isWebSearch && (
                      <span className="flex items-center gap-1 text-[10px] text-on-surface-variant uppercase font-bold"><span className="material-symbols-outlined text-[12px]">globe</span> Web Search</span>
                    )}
                  </div>
                )}
                
                <div className={cn(
                  "prose prose-invert max-w-none text-[15px]",
                  msg.role === 'user' ? "text-on-surface" : "text-on-surface"
                )}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                
                {msg.role === 'ai' && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-outline-variant">
                    <span className="text-[12px] text-outline uppercase font-bold tracking-wider flex items-center gap-1 mb-2">
                      <span className="material-symbols-outlined text-[14px]">library_books</span> Sources
                    </span>
                    <div className="flex flex-col gap-2">
                      {msg.sources.map((src, i) => (
                        <div key={i} className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-xl p-3 hover:bg-surface-container transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <span className="material-symbols-outlined text-outline">description</span>
                            <span className="text-[13px] text-on-surface truncate">{src.title}</span>
                          </div>
                          <span className="material-symbols-outlined text-outline group-hover:text-primary">chevron_right</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={endOfMessagesRef} className="h-4" />
      </div>

      <div className="w-full bg-background border-t border-outline-variant md:border-none md:bg-transparent p-4 pb-safe justify-center flex">
        <div className="w-full max-w-[800px] flex flex-col gap-2">
          <div className="flex bg-surface-container-low border border-outline-variant rounded-3xl p-2.5 items-end shadow-2xl">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors shrink-0">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
            <button 
              onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 mr-2",
                isWebSearchEnabled ? "text-primary bg-primary-container/10" : "text-outline hover:text-on-surface hover:bg-surface-container"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
            </button>
            
            <textarea 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask your academic assistant..."
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-on-surface min-h-[40px] max-h-[120px] resize-none py-2"
              rows={1}
            />
            
            <button 
              onClick={() => setIsListening(!isListening)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ml-2 mx-1",
                isListening ? "text-error bg-error-container/20 animate-pulse" : "text-outline hover:text-on-surface hover:bg-surface-container"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-on-surface text-background flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50 disabled:bg-surface-container-highest shrink-0"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">arrow_upward</span>
            </button>
          </div>
          <div className="flex justify-between px-4 text-[11px] text-outline font-medium tracking-wide">
             <span>AI can make mistakes. Verify important academic information.</span>
             <span className="hidden md:flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> RAG Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
