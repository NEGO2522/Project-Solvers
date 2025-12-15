import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Register from './Pages/Register';
import ContactUs from './Pages/ContactU';
import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar';
import Organizer from './Pages/Organizer';
import CreateEvent from './Pages/Create_Event';
import Event_Detail from './Pages/Event_Detail';
import Landing from './Pages/Landing';
import Technology from './Pages/Technology';
import Sports from './Pages/Sports';
import Music from './Pages/Music';
import Business from './Pages/Business';
import Fashion from './Pages/Fashion';
import Social from './Pages/Social';
import Career from './Pages/Career';
import Arts from './Pages/Arts';
import Survey from './components/Survey';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSurvey, setShowSurvey] = useState(false);
  const auth = getAuth(app);
  
  // Check if user has completed the survey
  useEffect(() => {
    if (user) {
      // In a real app, you would check this from the user's profile in your database
      const hasCompletedSurvey = localStorage.getItem(`surveyCompleted_${user.uid}`);
      if (!hasCompletedSurvey) {
        // Small delay to ensure the main content loads first
        const timer = setTimeout(() => {
          setShowSurvey(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [user]);
  
  const handleSurveyComplete = () => {
    if (user) {
      localStorage.setItem(`surveyCompleted_${user.uid}`, 'true');
    }
    setShowSurvey(false);
  };
  
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
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c2b490]"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {showSurvey && (
          <Survey onClose={handleSurveyComplete} />
        )}
        <Routes>
          <Route 
            path="/" 
            element={
              <Landing />
            } 
          />
          <Route 
            path="*" 
            element={
              <>
                {user && <Navbar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
                <div className={`${user ? "pt-16" : ""} transition-all duration-300 ${user && sidebarOpen ? "ml-64" : ""}`}>
                  <Routes>
                    <Route 
                      path="/home" 
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
                          <Navigate to="/" />
                        )
                      } 
                    />
                    <Route 
                      path="/signup" 
                      element={!user ? <div className="relative h-screen w-full"><SignUp /></div> : <Navigate to="/home" />} 
                    />
                    <Route 
                      path="/register" 
                      element={
                        <div className="relative h-screen w-full">
                          <Register />
                        </div>
                      } 
                    />
                    <Route 
                      path="/login" 
                      element={!user ? <div className="relative h-screen w-full"><Login /></div> : <Navigate to="/home" />} 
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
                    {user && (
                      <>
                        <Route path="/organizer" element={<Organizer />} />
                        <Route path="/create-event" element={<CreateEvent />} />
                        <Route path="/event" element={<Event_Detail />} />
                        <Route 
                          path="/technology" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Technology />
                            </div>
                          } 
                        />
                        <Route 
                          path="/sports" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Sports />
                            </div>
                          } 
                        />
                        <Route 
                          path="/music" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Music />
                            </div>
                          } 
                        />
                        <Route 
                          path="/business" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Business />
                            </div>
                          } 
                        />
                        <Route 
                          path="/fashion" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Fashion />
                            </div>
                          } 
                        />
                        <Route 
                          path="/social" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Social />
                            </div>
                          } 
                        />
                        <Route 
                          path="/career" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Career />
                            </div>
                          } 
                        />
                        <Route 
                          path="/arts" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Arts />
                            </div>
                          } 
                        />
                        <Route 
                          path="/survey" 
                          element={
                            <div className="flex-1 min-h-[calc(100vh-4rem)]">
                              <Survey onClose={() => {
                                if (user) {
                                  localStorage.setItem(`surveyCompleted_${user.uid}`, 'true');
                                }
                                navigate('/home');
                              }} />
                            </div>
                          } 
                        />
                      </>
                    )}
                    <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
                  </Routes>
                </div>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;