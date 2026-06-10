import { useState } from 'react';
import { useAuth } from '../App';
import { AuthService } from '../services/auth';

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await AuthService.logout();
  };

  return (
    <div className="w-full h-full p-4 md:p-10 max-w-container-max mx-auto overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-headline-lg font-bold text-on-surface">Account Settings</h1>
        <p className="text-body-sm text-on-surface-variant">Manage your profile, security preferences, and account controls.</p>
      </header>
      
      <div className="w-full max-w-3xl space-y-8">
        {/* Profile */}
        <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined font-variation-settings-'FILL'-1 text-outline">person</span>
            <h2 className="text-headline-sm font-bold text-on-surface">Profile</h2>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2">
              <div className="w-20 h-20 rounded-full bg-surface-container-high border border-outline flex items-center justify-center text-[32px] text-primary">
                 {user?.user_metadata?.full_name?.charAt(0) || 'K'}
              </div>
              <button className="text-primary text-[14px] hover:underline font-medium">Change Avatar</button>
            </div>
            
            <div>
               <label className="block text-[12px] font-medium text-on-surface-variant mb-1">Full Name</label>
               <input type="text" defaultValue={user?.user_metadata?.full_name || ''} className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary" />
            </div>
            
            <div>
               <label className="flex items-center gap-1 text-[12px] font-medium text-on-surface-variant mb-1">
                 Email Address <span className="material-symbols-outlined text-[14px]">lock</span>
               </label>
               <input type="text" readOnly value={user?.email || ''} className="w-full bg-surface-container-highest border border-outline-variant rounded-xl p-3 text-outline focus:outline-none cursor-not-allowed" />
               <p className="text-[11px] text-outline mt-1">Email address cannot be changed. Contact admin for support.</p>
            </div>
            
            <div className="flex justify-end mt-2">
              <button className="bg-primary text-on-primary font-label-lg px-6 py-2.5 rounded-xl hover:bg-primary-container transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        
        {/* Security */}
        <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined font-variation-settings-'FILL'-1 text-outline">security</span>
            <h2 className="text-headline-sm font-bold text-on-surface">Security</h2>
          </div>
          
          <div className="space-y-4">
             <div>
               <label className="block text-[12px] font-medium text-on-surface-variant mb-1">Current Password</label>
               <input type="password" placeholder="••••••••" className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary" />
             </div>
             <div>
               <label className="block text-[12px] font-medium text-on-surface-variant mb-1">New Password</label>
               <input type="password" placeholder="Enter new password" className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary" />
             </div>
             <div>
               <label className="block text-[12px] font-medium text-on-surface-variant mb-1">Confirm Password</label>
               <input type="password" placeholder="Confirm new password" className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary" />
             </div>
             <button className="bg-transparent border border-outline-variant text-on-surface font-label-lg px-6 py-2.5 rounded-xl hover:bg-surface-container-high transition-colors">
                Update Password
              </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#93000a]/10 border border-[#ffb4ab]/20 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#ffb4ab]">warning</span>
            <h2 className="text-headline-sm font-bold text-[#ffb4ab]">Danger Zone</h2>
          </div>
          <p className="text-[14px] text-[#ffdad6] mb-6 opacity-80">
            Once you delete your account, there is no going back. All your research history, saved documents, and settings will be permanently destroyed. Please be certain.
          </p>
          <button className="bg-[#93000a] text-[#ffdad6] font-label-lg px-6 py-2.5 rounded-xl hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">delete</span> Delete Account
          </button>
          
          <div className="mt-8 pt-8 border-t border-[#ffb4ab]/20 flex justify-end">
             <button onClick={handleLogout} disabled={loading} className="bg-transparent text-on-surface font-label-lg px-6 py-2.5 rounded-xl hover:bg-surface-container-high transition-colors border border-outline flex items-center gap-2">
               <span className="material-symbols-outlined text-[20px]">logout</span> {loading ? 'Logging out...' : 'Logout'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
