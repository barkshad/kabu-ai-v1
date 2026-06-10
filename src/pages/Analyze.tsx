import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Analyze() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (selectedFile: File) => {
    setUploading(true);
    // Mock upload & analysis delay
    setTimeout(() => {
      setUploading(false);
      setAnalyzed(true);
    }, 3000);
  };

  return (
    <div className="w-full h-full p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-headline-lg font-bold text-on-surface">Document Analyzer</h1>
        <p className="text-body-sm text-on-surface-variant flex items-center gap-2 mt-1">Upload and analyze academic papers, theses, and notes.</p>
      </header>

      {!file && !uploading && !analyzed && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-3xl mx-auto bg-surface-container-low border-2 border-dashed border-outline-variant hover:border-primary/50 hover:bg-surface-container rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all mt-10 group"
        >
          <div className="w-14 h-14 rounded-full bg-surface-container-high border border-outline flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined text-[28px]">upload</span>
          </div>
          <h2 className="font-headline-sm text-on-surface mb-2">Drop your document here</h2>
          <p className="text-body-sm text-on-surface-variant mb-8">or click to browse</p>
          
          <div className="flex gap-3 justify-center">
             {['PDF', 'DOCX', 'TXT', 'PPTX'].map(ext => (
               <div key={ext} className="px-3 py-1 bg-surface-container border border-outline-variant rounded-lg text-[12px] font-medium text-on-surface-variant">
                 {ext}
               </div>
             ))}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.docx,.txt,.pptx"
          />
        </div>
      )}

      {uploading && (
        <div className="w-full max-w-3xl mx-auto bg-surface-container-low border border-outline-variant rounded-3xl p-16 flex flex-col items-center justify-center text-center mt-10 shadow-2xl">
          <div className="w-14 h-14 rounded-full border-2 border-outline-variant border-t-primary animate-spin mb-6"></div>
          <h3 className="text-[18px] font-semibold text-on-surface mb-2">{file?.name}</h3>
          <p className="text-[14px] text-primary animate-pulse mb-8">Indexing to knowledge base...</p>
          <div className="w-full max-w-md h-1.5 bg-surface-container-high rounded-full overflow-hidden">
             <div className="h-full bg-primary w-[60%] transition-all duration-1000 ease-in-out"></div>
          </div>
        </div>
      )}

      {analyzed && (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 mt-10">
          <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#1e4620]/30 border border-[#4caf50]/30 flex items-center justify-center text-[#4caf50] mb-4">
               <span className="material-symbols-outlined text-[32px] font-variation-settings-'FILL'-1">check_circle</span>
            </div>
            <h3 className="text-headline-sm text-on-surface mb-2 truncate max-w-full px-4">{file?.name}</h3>
            <p className="text-[14px] text-on-surface-variant mb-8">1,240 words • 6 chunks indexed</p>
            
            <div className="flex gap-4 w-full max-w-md">
              <button 
                onClick={() => navigate('/chat')}
                className="flex-1 bg-primary-container text-on-primary-container hover:bg-inverse-primary h-12 rounded-xl font-label-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Chat with Document
              </button>
              <button 
                onClick={() => navigate('/flashcards')}
                className="flex-1 bg-transparent border border-outline text-on-surface hover:bg-surface-container-high h-12 rounded-xl font-label-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">style</span>
                Generate Flashcards
              </button>
            </div>
            
            <button 
              onClick={() => { setFile(null); setAnalyzed(false); }}
              className="mt-6 text-primary hover:text-on-surface text-[14px] transition-colors font-medium"
            >
              Upload another document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
