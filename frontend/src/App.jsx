import { createContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getStoredUser, clearAuth } from './utils/auth';

export const AuthContext = createContext(null);

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
        <Navbar />
        
        {/* === THIS IS THE FIX === */}
        {/* All width, margin, and padding classes removed */}
        <main>
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;