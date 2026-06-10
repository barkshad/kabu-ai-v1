import { useEffect, useState } from 'react';
import { ApiService, Document } from '../services/api';

const CATEGORIES = ['All', 'Law', 'Science', 'Business', 'Medicine', 'Engineering', 'Social Sciences'];

export default function Library() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    ApiService.getLibraryDocuments().then(setDocuments);
  }, []);

  return (
    <div className="w-full h-full p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto relative">
      <header className="mb-6">
        <h1 className="text-headline-lg font-bold text-on-surface mb-4">Academic Library</h1>
        
        <div className="relative max-w-2xl mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            type="text" 
            placeholder="Search publications, authors, or topics..." 
            className="w-full h-[48px] bg-surface-container-low border border-outline-variant focus:border-primary rounded-full pl-12 pr-4 text-on-surface focus:outline-none placeholder-outline"
          />
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.filter(d => activeCategory === 'All' || d.category === activeCategory).map(doc => (
          <div key={doc.id} className="bg-surface-container-low border border-outline-variant rounded-3xl p-5 hover:border-outline hover:bg-surface-container transition-all flex flex-col group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">
                  {doc.category === 'Law' ? 'gavel' : doc.category === 'Science' ? 'science' : doc.category === 'Business' ? 'trending_up' : 'article'}
                </span>
              </div>
              <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-[12px] text-on-surface-variant">
                {doc.category}
              </span>
            </div>
            
            <h3 className="text-[16px] font-semibold text-on-surface mb-1 flex-1 leading-snug">{doc.title}</h3>
            
            <div className="flex items-center justify-between mt-4 border-t border-outline-variant pt-3">
               <div className="flex flex-col">
                 <span className="text-[14px] text-outline">{doc.author}</span>
                 <span className="text-[12px] text-outline opacity-70">{doc.year}</span>
               </div>
               <span className="text-primary text-[14px] font-medium flex items-center gap-1 group-hover:underline">
                 Open <span className="material-symbols-outlined text-[16px]">chevron_right</span>
               </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-surface-container border border-outline-variant text-on-surface rounded-xl hover:bg-surface-container-high transition-colors font-medium">
          Load More Documents
        </button>
      </div>

      {/* FAB - Using absolute positioning within the relative container */}
      <button className="fixed md:absolute bottom-20 md:bottom-10 right-4 md:right-10 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-30 isolate">
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>
    </div>
  );
}
