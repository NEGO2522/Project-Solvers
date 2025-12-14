import { useState, useEffect, useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import gsap from "gsap";
import { app, database } from '../firebase';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const leftBgRef = useRef(null);
  const rightBgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save Google user data to Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        provider: 'google.com',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: 'user' // Default role
      });
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with display name
      await updateProfile(user, {
        displayName: name
      });
      
      // Save additional user data to Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: 'user' // Default role
      });
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // GSAP Animations (same as login page)
  useEffect(() => {
    gsap.registerPlugin();
    
    const setupAnimations = () => {
      if (!leftBgRef.current || !rightBgRef.current) return;
      
      gsap.killTweensOf([leftBgRef.current, rightBgRef.current]);
      gsap.set([leftBgRef.current, rightBgRef.current], { clearProps: 'all' });
      
      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
      
      // Left circle animation
      tl.fromTo(leftBgRef.current,
        { x: -200, y: -100, opacity: 0, scale: 0.5 },
        { 
          x: 0, 
          y: 0, 
          opacity: 0.2, 
          scale: 1, 
          duration: 2,
          ease: 'elastic.out(1, 0.5)'
        },
        'start'
      );
      
      // Right circle animation
      tl.fromTo(rightBgRef.current,
        { x: 200, y: 100, opacity: 0, scale: 0.5 },
        { 
          x: 0, 
          y: 0, 
          opacity: 0.15, 
          scale: 1, 
          duration: 2,
          ease: 'elastic.out(1, 0.5)'
        },
        'start+=0.2'
      );
      
      // Continuous floating animations
      const floatLeft = gsap.to(leftBgRef.current, {
        y: '+=40',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      });
      
      const floatRight = gsap.to(rightBgRef.current, {
        y: '-=40',
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });
      
      return () => {
        floatLeft.kill();
        floatRight.kill();
        gsap.killTweensOf([leftBgRef.current, rightBgRef.current]);
      };
    };
    
    const timer = setTimeout(() => {
      setupAnimations();
    }, 100);
    
    window.addEventListener('resize', setupAnimations);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', setupAnimations);
      gsap.killTweensOf([leftBgRef.current, rightBgRef.current]);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-[#feda6a]">
      {/* Left side with gradient background - Same as login */}
      <div className="hidden md:flex md:w-1/2 bg-[#c2b490] items-center justify-center p-8">
        <div className="max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4.444 4.444 0 00-.5 0 13.876 13.876 0 00-6.105 2.542l-.054.09m14.71 0l-.054.09a13.916 13.916 0 01-6.105 2.541M12 8c0-3.517 1.009-6.799 2.753-9.571m3.44 2.04l-.054.09A13.916 13.916 0 0116 11a4.444 4.444 0 01-.5 0 13.876 13.876 0 016.105-2.542l.054-.09m-14.71 0l.054.09A13.916 13.916 0 008 11a4.444 4.444 0 01.5 0 13.876 13.876 0 016.105 2.541" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Join Us Today!</h1>
            <p className="text-white/90 text-lg">
              Create an account to get started with our platform and unlock all features.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Get Started Quickly</h3>
                <p className="text-white/80 text-sm">Create your account in just a few simple steps.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Exclusive Access</h3>
                <p className="text-white/80 text-sm">Unlock premium features and content.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Secure & Private</h3>
                <p className="text-white/80 text-sm">Your data is always protected.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/20">
            <p className="text-center text-white/80 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-medium hover:text-white/80 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 bg-[#e4decd] flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div 
          ref={rightBgRef} 
          className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#c2b490] opacity-20 rounded-full -mr-60 -mt-60 transition-all duration-1000 pointer-events-none"
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransform: 'translate3d(0,0,0)'
          }}
        ></div>
        <div 
          ref={leftBgRef} 
          className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#c2b490] opacity-15 rounded-full -ml-80 -mb-80 transition-all duration-1000 pointer-events-none"
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransform: 'translate3d(0,0,0)'
          }}
        ></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-[#c2b490]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Create Account
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-[#c2b490] hover:text-[#a08f6e] transition-colors duration-200">
                    Sign In
                  </Link>
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <button
                    onClick={handleGoogleSignUp}
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-white/30 text-sm font-medium rounded-lg text-gray-700 bg-white/80 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490]/50 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <FcGoogle className="h-5 w-5" />
                    </span>
                    {isLoading ? 'Creating Account...' : 'Sign up with Google'}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-500">Or continue with email</span>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleEmailSignUp}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-700" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-[#c2b490]/50 focus:border-transparent block w-full pl-10 sm:text-sm border border-white/30 rounded-lg py-3 pr-3 transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-700" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-[#c2b490]/50 focus:border-transparent block w-full pl-10 sm:text-sm border border-white/30 rounded-lg py-3 pr-3 transition-all duration-200"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-700" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength="6"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-[#c2b490]/50 focus:border-transparent block w-full pl-10 sm:text-sm border border-white/30 rounded-lg py-3 pr-3 transition-all duration-200"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-700" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength="6"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-[#c2b490]/50 focus:border-transparent block w-full pl-10 sm:text-sm border border-white/30 rounded-lg py-3 pr-3 transition-all duration-200"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#c2b490] hover:bg-[#a08f6e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490]/50 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;