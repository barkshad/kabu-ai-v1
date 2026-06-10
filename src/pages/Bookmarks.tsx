export default function Bookmarks() {
  return (
    <div className="w-full h-full p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-surface-container border border-outline flex items-center justify-center text-primary">
            <span className="material-symbols-outlined font-variation-settings-'FILL'-1">bookmark</span>
          </div>
          <div>
            <h1 className="text-headline-lg font-bold text-on-surface">Bookmarks</h1>
            <p className="text-body-sm text-on-surface-variant">Your saved research items and important references.</p>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-5 hover:bg-surface-container transition-colors flex flex-col group">
           <div className="flex justify-between items-start mb-3">
             <span className="px-2 py-1 bg-surface-container-high text-primary rounded-xl text-[12px] font-medium flex items-center gap-1">
               <span className="material-symbols-outlined text-[14px]">forum</span> AI Chat
             </span>
             <button className="text-primary hover:text-outline transition-colors">
               <span className="material-symbols-outlined font-variation-settings-'FILL'-1">bookmark</span>
             </button>
           </div>
           <h3 className="text-[16px] font-bold text-on-surface mb-2">Quantum Entanglement Basics</h3>
           <p className="text-[14px] text-on-surface-variant line-clamp-2 mb-4">A detailed breakdown of EPR paradox and Bell's inequality, explaining how particles remain connected...</p>
           
           <div className="mt-auto pt-3 border-t border-outline-variant flex justify-between items-center text-[12px]">
             <span className="text-outline">Saved 2 days ago</span>
             <span className="text-primary flex items-center gap-1 font-medium group-hover:underline">Open <span className="material-symbols-outlined text-[14px]">arrow_forward</span></span>
           </div>
        </div>
      </div>
      
      <div className="w-full max-w-md mx-auto mt-20 border border-dashed border-outline-variant bg-surface-container-low rounded-3xl p-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-outline mb-6">
          <span className="material-symbols-outlined text-[28px]">bookmark_add</span>
        </div>
        <h2 className="text-headline-sm font-bold text-on-surface mb-2">No Bookmarks Yet</h2>
        <p className="text-body-sm text-on-surface-variant mb-6">Your repository is empty. Save important research chats, documents, and flashcards to quickly access them here later.</p>
        <button className="bg-primary text-on-primary font-label-lg px-6 py-3 rounded-xl hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">explore</span> Start Exploring
        </button>
      </div>
    </div>
  );
}
