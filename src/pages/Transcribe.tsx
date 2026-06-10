import { useState, useRef, useEffect } from 'react';

export default function Transcribe() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState('');
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        if (timer % 5 === 0) {
          setTranscript(prev => prev + ' The core structure of convolutional networks... ');
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto">
      <header className="mb-8 shrink-0">
        <h1 className="text-headline-lg font-bold text-on-surface">Lecture Transcription</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">Real-time speech-to-text processing for academic lectures.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[500px]">
        {/* Left Column */}
        <div className="lg:col-span-4 bg-surface-container rounded-3xl border border-outline-variant p-6 relative overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none rounded-3xl"></div>
          
          <h2 className={`font-headline-sm mb-4 ${isRecording ? 'text-error animate-pulse' : 'text-on-surface'}`}>
            {isRecording ? 'Recording...' : 'Ready to Record'}
          </h2>
          
          <div className="font-mono text-display-lg text-primary font-bold mb-8">
            {formatTime(timer)}
          </div>
          
          <div className={`flex justify-center items-end h-16 gap-1.5 mb-12 transition-opacity ${isRecording ? 'opacity-100' : 'opacity-30'}`}>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2.5 rounded-full ${isRecording ? 'bg-error animate-pulse' : 'bg-primary'}`} 
                style={{ height: `${Math.max(16, Math.random() * 64)}px`, animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
          
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-[32px] transition-all relative z-10 
              ${isRecording 
                ? 'bg-[#93000a]/20 border-2 border-[#ffb4ab]/50 text-error shadow-[0_0_30px_#ffb4ab_0.2]' 
                : 'bg-surface-container-high border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50'
              }`}
          >
            <span className="material-symbols-outlined font-variation-settings-'FILL'-1 text-[32px]">
              {isRecording ? 'mic_off' : 'mic'}
            </span>
          </button>
          <p className="text-[12px] text-on-surface-variant mt-4">
            {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
          </p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col bg-surface-container rounded-3xl border border-outline-variant p-1.5">
          <div className="flex justify-between items-center px-4 py-3 border-b border-outline-variant/50">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-primary animate-pulse' : 'bg-outline'}`}></span>
              <span className="font-label-lg text-on-surface">Live Transcript</span>
            </div>
            <button className="flex items-center gap-1 text-[12px] text-on-surface-variant hover:bg-surface-variant px-2 py-1.5 rounded-md transition-colors">
              <span className="material-symbols-outlined text-[16px]">content_copy</span> Copy
            </button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {transcript ? (
               <p className="text-[16px] leading-relaxed text-on-surface">
                 <span className="text-primary font-medium mr-2">[00:00:00]</span>
                 {transcript}
               </p>
            ) : (
               <p className="text-[16px] text-on-surface-variant italic opacity-70">Waiting for audio input...</p>
            )}
          </div>
          
          <div className="p-4 border-t border-outline-variant/50 flex flex-wrap gap-3">
             <button className="bg-primary text-on-primary font-label-lg px-4 py-2.5 rounded-xl hover:bg-primary-container transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">summarize</span> Generate Summary
             </button>
             <button className="bg-transparent border border-outline text-on-surface font-label-lg px-4 py-2.5 rounded-xl hover:bg-surface-variant transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">style</span> Create Flashcards
             </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-headline-sm mb-4">Recent Transcriptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center text-primary group-hover:bg-primary/20">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div>
              <h4 className="font-medium text-[14px] text-on-surface group-hover:text-primary">Intro to Machine Learning CS301</h4>
              <div className="flex gap-3 mt-1 text-[12px] text-on-surface-variant">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> Oct 12</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 45m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
