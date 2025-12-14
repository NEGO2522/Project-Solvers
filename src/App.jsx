import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import ContactUs from './Pages/ContactU';
import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const auth = getAuth(app);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c2b490]"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {user && <Navbar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <div className={`${user ? "pt-16" : ""} transition-all duration-300 ${user && sidebarOpen ? "ml-64" : ""}`}>
          {/* Main Content */}
          <Routes>
            <Route 
              path="/signup" 
              element={!user ? <div className="relative h-screen w-full"><SignUp /></div> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <div className="relative h-screen w-full"><Login /></div> : <Navigate to="/" />} 
            />
            <Route 
              path="/contact" 
              element={<ContactUs />} 
            />
            <Route 
              path="/about" 
              element={
                user ? (
                  <div className="flex-1 min-h-[calc(100vh-4rem)]">
                    <About />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                user ? (
                  <div className="flex-1 min-h-[calc(100vh-4rem)]">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <Home sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;