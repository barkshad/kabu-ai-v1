import { useState } from 'react';

export default function Flashcards() {
  const [studying, setStudying] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full h-full p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto">
      {!studying ? (
        <>
          <header className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-headline-lg font-bold text-on-surface">Flashcards</h1>
            </div>
            <button className="bg-primary text-on-primary font-label-lg px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-primary-container transition-colors">
              Generate with AI <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-5 flex flex-col">
               <h3 className="text-[16px] font-semibold text-on-surface mb-2">Const Law: Article 19 Rights</h3>
               <div className="flex gap-2 mb-4">
                 <span className="px-2 py-1 bg-surface-container rounded-lg text-[12px] text-on-surface-variant">Law</span>
                 <span className="px-2 py-1 bg-primary/20 text-primary-fixed-dim rounded-lg text-[12px] font-medium">20 cards</span>
               </div>
               <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant">
                 <span className="text-[12px] text-outline">Created today</span>
                 <button onClick={() => setStudying(true)} className="text-primary text-[14px] font-medium flex items-center gap-1 hover:underline">
                   Study <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                 </button>
               </div>
             </div>
          </div>
        </>
      ) : (
        <div className="w-full max-w-xl mx-auto h-full flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setStudying(false)} className="text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-medium">
               <span className="material-symbols-outlined">arrow_back</span> Back
            </button>
            <span className="font-label-lg text-on-surface-variant">1 / 20</span>
            <button className="text-on-surface-variant hover:text-on-surface">
               <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          
          <div className="flex-1 w-full bg-transparent perspective-1000">
            <div 
              style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
              className="relative w-full h-[60vh] min-h-[400px] transition-transform duration-500 transform-style-preserve-3d"
            >
              {/* Front */}
              <div className="absolute inset-0 w-full h-full bg-surface-container-low border border-outline-variant rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden shadow-2xl">
                 <div className="absolute top-6 left-6 text-[12px] text-outline font-medium uppercase tracking-wider">Question</div>
                 <h2 className="text-[24px] font-bold text-on-surface text-center mb-12">What are the fundamental rights under Article 19 of the Constitution of Kenya?</h2>
                 <button onClick={() => setFlipped(true)} className="mt-auto px-6 py-2.5 bg-transparent border border-outline-variant text-on-surface rounded-full hover:bg-surface-container font-medium transition-colors">
                   Show Answer
                 </button>
              </div>

              {/* Back */}
              <div 
                style={{ transform: 'rotateY(180deg)' }}
                className="absolute inset-0 w-full h-full bg-surface-container border border-[#4caf50]/30 rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden shadow-2xl"
              >
                 <div className="absolute top-6 left-6 text-[12px] text-[#4caf50] font-medium uppercase tracking-wider">Answer</div>
                 <p className="text-[18px] text-on-surface text-center mb-12 leading-relaxed">
                   Article 19 recognizes and protects fundamental rights and freedoms, emphasizing they belong to each individual and are not granted by the State, but are inherent.
                 </p>
                 <button onClick={() => setFlipped(false)} className="mt-auto px-6 py-2.5 bg-transparent border border-outline-variant text-on-surface rounded-full hover:bg-surface-container-high font-medium transition-colors">
                   Hide Answer
                 </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8 pb-10">
             <button className="flex items-center gap-2 text-outline hover:text-on-surface font-medium transition-colors">
               <span className="material-symbols-outlined">chevron_left</span> Previous
             </button>
             <button className="flex items-center gap-2 text-on-surface hover:text-primary font-medium transition-colors">
               Next <span className="material-symbols-outlined">chevron_right</span>
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
