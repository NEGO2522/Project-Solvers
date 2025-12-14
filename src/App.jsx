import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import ContactUs from './Pages/ContactU';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PopularCommunities from './components/PopularCommunities';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <Navbar onMenuClick={toggleSidebar} />
        <div className="pt-16">
          <div className="flex relative">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-20' : 'hidden'} lg:block lg:relative lg:flex-shrink-0`}>
              <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            </div>
            
            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] ${sidebarOpen ? 'lg:ml-64' : ''}`}>
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <main className="flex-1 min-w-0 lg:pr-8">
                    <Routes>
                      <Route 
                        path="/signup" 
                        element={!user ? <SignUp /> : <Navigate to="/" />} 
                      />
                      <Route 
                        path="/login" 
                        element={!user ? <Login /> : <Navigate to="/" />} 
                      />
                      <Route 
                        path="/contact" 
                        element={<ContactUs />} 
                      />
                      <Route 
                        path="/" 
                        element={
                          user ? (
                            <Home />
                          ) : (
                            <Navigate to="/login" />
                          )
                        } 
                      />
                      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
                    </Routes>
                  </main>
                  
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="sticky top-24">
                      <PopularCommunities />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;