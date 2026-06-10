export default function AdminDashboard() {
  return (
    <div className="w-full h-full p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-headline-lg font-bold text-on-surface">Admin Dashboard</h1>
        <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
           <span className="material-symbols-outlined text-[16px]">verified_user</span> System Management
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-6">
            <span className="text-[14px] text-on-surface-variant mb-1 font-medium">Total Registered Users</span>
            <div className="text-display-lg text-primary font-bold font-mono">1,402</div>
            <span className="text-[12px] text-[#4caf50] flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +24 this week
            </span>
         </div>
         
         <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-6">
            <span className="text-[14px] text-on-surface-variant mb-1 font-medium">Total Documents Analyzed</span>
            <div className="text-display-lg text-primary font-bold font-mono">8,930</div>
            <span className="text-[12px] text-[#4caf50] flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +112 this week
            </span>
         </div>
         
         <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-6">
            <span className="text-[14px] text-on-surface-variant mb-1 font-medium">Total AI Queries</span>
            <div className="text-display-lg text-primary font-bold font-mono">42k</div>
            <span className="text-[12px] text-[#4caf50] flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +5.2k this week
            </span>
         </div>
      </div>
      
      <div className="bg-surface-container-low border border-outline-variant rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h2 className="text-headline-sm font-bold text-on-surface">Recent User Registrations</h2>
          <button className="text-primary hover:text-on-surface transition-colors font-medium text-[14px]">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant">
                <th className="p-4 text-[12px] uppercase text-outline font-medium tracking-wider">User</th>
                <th className="p-4 text-[12px] uppercase text-outline font-medium tracking-wider">Email</th>
                <th className="p-4 text-[12px] uppercase text-outline font-medium tracking-wider">Status</th>
                <th className="p-4 text-[12px] uppercase text-outline font-medium tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-outline-variant/30 hover:bg-surface-container-high/50 transition-colors">
                  <td className="p-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline flex items-center justify-center text-[12px] font-bold text-primary">
                          S{i}
                        </div>
                        <span className="text-[14px] text-on-surface font-medium">Student {i}</span>
                     </div>
                  </td>
                  <td className="p-4 text-[14px] text-on-surface-variant">student{i}@kabarak.ac.ke</td>
                  <td className="p-4">
                     <span className="px-2 py-1 bg-[#1e4620]/30 border border-[#4caf50]/30 text-[#4caf50] text-[10px] uppercase font-bold tracking-wider rounded-md">Active</span>
                  </td>
                  <td className="p-4">
                     <button className="text-outline hover:text-on-surface">
                       <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
