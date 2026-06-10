import { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { User } from 'firebase/auth';
import { AuthService } from './services/auth';
import { Layout } from './components/Layout';

// Pages
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import Workspace from './pages/Workspace';
import Chat from './pages/Chat';
import Analyze from './pages/Analyze';
import Transcribe from './pages/Transcribe';
import Library from './pages/Library';
import Flashcards from './pages/Flashcards';
import Bookmarks from './pages/Bookmarks';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

function ProtectedRoute({ requireAdmin = false }: { requireAdmin?: boolean }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-background flex flex-col items-center justify-center"><div className="animate-spin text-primary rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  
  // Note: For a real app we'd check Custom Claims or DB for admin role. 
  // Since we use Firebase Auth ONLY for now, anyone logged in passes basic auth, 
  // but if requireAdmin is true, we might mock restrict it or allow for preview.
  
  return <Layout />;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes (Wrapper inside Layout) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/transcribe" element={<Transcribe />} />
            <Route path="/library" element={<Library />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

