import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ai_icon from '../assets/ai_icon.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onMenuClick, sidebarOpen, setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showHostDropdown, setShowHostDropdown] = useState(false);
  const [showAISearch, setShowAISearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'Upcoming tech events in Bangalore',
    'Music festivals next month',
    'Free workshops this weekend',
    'Networking events for entrepreneurs'
  ]);
  const isSidebarOpen = sidebarOpen || false;
  const [filters, setFilters] = useState({
    category: 'all',
    date: 'any',
    price: 'any',
    location: ''
  });

  const searchCardRef = useRef(null);
  const categoriesRef = useRef(null);
  const profileCardRef = useRef(null);

  const categories = [
    'Music', 'Sports', 'Technology', 'Business', 'Food & Drink', 
    'Arts', 'Fashion', 'Health', 'Education', 'Other'
  ];

  // Close categories dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close profile card when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const profileCircle = document.querySelector('[data-profile-circle]');
      const clickedOutsideCard = profileCardRef.current && !profileCardRef.current.contains(event.target);
      const clickedOutsideCircle = profileCircle && !profileCircle.contains(event.target);
      
      if (clickedOutsideCard && clickedOutsideCircle) {
        setShowProfileCard(false);
      }
    }

    if (showProfileCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileCard]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Handle profile card
      const profileCircle = document.querySelector('[data-profile-circle]');
      const clickedOutsideProfileCard = profileCardRef.current && !profileCardRef.current.contains(event.target);
      const clickedOutsideProfileCircle = profileCircle && !profileCircle.contains(event.target);
      
      // Handle host dropdown
      const hostButton = document.querySelector('[data-host-button]');
      const clickedOutsideHostDropdown = hostButton && !hostButton.contains(event.target);
      
      if (clickedOutsideProfileCard && clickedOutsideProfileCircle) {
        setShowProfileCard(false);
      }
      
      if (clickedOutsideHostDropdown) {
        setShowHostDropdown(false);
      }
    }

    if (showProfileCard || showHostDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileCard, showHostDropdown]);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchCardRef.current && !searchCardRef.current.contains(event.target)) {
        // Check if the click is not on the search input
        const searchInput = document.querySelector('input[type="text"][placeholder="Search events..."]');
        if (searchInput && !searchInput.contains(event.target)) {
          setShowSearchCard(false);
        }
      }
    }

    // Add event listener when the search card is open
    if (showSearchCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchCard]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowProfileCard(false);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileCard(!showProfileCard);
  };

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  const toggleHostDropdown = (e) => {
    e.preventDefault();
    navigate('/organizer');
    setShowHostDropdown(false);
  };

  const closeHostDropdown = () => {
    setShowHostDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery} with filters: ${JSON.stringify(filters)}`);
      setShowSearchCard(false);
    } else {
      setShowSearchCard(!showSearchCard);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (setSidebarOpen) {
      setSidebarOpen(!isSidebarOpen);
    }
    if (onMenuClick) onMenuClick();
  };

  const handleCloseSidebar = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleAISearch = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAISearch(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeAISearch = useCallback(() => {
    setShowAISearch(false);
    document.body.style.overflow = 'unset';
    setIsTyping(false);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(e);
      closeAISearch();
    }
  };

  // Add Escape key listener for AI search overlay
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showAISearch) {
        closeAISearch();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showAISearch, closeAISearch]);

  // Handle typing animation
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [searchQuery]);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      {/* AI Search Overlay */}
      <AnimatePresence>
        {showAISearch && (
          <motion.div 
            className="fixed z-50 overflow-y-auto transition-all duration-300"
            style={{
              top: 0,
              bottom: 0,
              right: 0,
              left: isSidebarOpen ? '256px' : '0px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="fixed bg-black/30 backdrop-blur-sm"
              style={{
                top: 0,
                bottom: 0,
                right: 0,
                left: isSidebarOpen ? '256px' : '0px'
              }}
              onClick={closeAISearch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div 
                className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-[#f0e8d8] flex items-center justify-center mr-3">
                        <img src={ai_icon} alt="AI" className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Eventy AI</h2>
                      {isTyping && (
                        <div className="ml-3 flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={closeAISearch} 
                      className="text-gray-400 hover:bg-gray-100 p-1 rounded-full transition-colors"
                      aria-label="Close AI search"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-gray-50/70 focus:outline-none focus:ring-2 focus:ring-[#c2b490]/50 focus:border-transparent text-base transition-all duration-200"
                        placeholder="Ask me anything about events..."
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <motion.button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#c2b490] text-white hover:bg-[#a08f6a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490]/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!searchQuery.trim()}
                        aria-label="Search"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </div>
                  </form>

                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                      <span>Try asking</span>
                      <motion.span 
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      >
                        👇
                      </motion.span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          className="text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 transition-all hover:shadow-sm hover:border-[#c2b490]/50"
                          onClick={() => {
                            setSearchQuery(suggestion);
                          }}
                          whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <div className="bg-gray-50/50 border-t border-gray-100 px-6 py-3">
                  <p className="text-xs text-gray-500 text-center ml-[10px]">
                    Powered by Eventy AI • Ask about events, categories, or locations
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 relative">
          {/* Left side - Menu button and logo */}
          <div className="flex items-center flex-shrink-0">
            <button 
              type="button"
              onClick={handleMenuClick}
              className="p-2 -ml-2 text-gray-500 hover:text-[#c2b490] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#c2b490] rounded-md transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
            <Link to="/" className="ml-2 flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#c2b490]">EventForYou</span>
            </Link>
          </div>

          {/* Search Bar - Desktop - Centered */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <form onSubmit={handleSearch} className="w-96">
              <div className="relative">
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2b490] focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearchCard(true)}
                  />
                  <div className="absolute right-2 flex items-center space-x-1">
                    <button
                      type="button"
                      className="flex items-center text-sm text-[#c2b490] hover:text-[#a08f6a] font-medium focus:outline-none"
                      onClick={handleAISearch}
                    >
                      <img src={ai_icon} alt="AI Search" className="w-5 h-5" />
                      <span className="ml-1">Ask</span>
                    </button>
                  </div>
                </div>
                {showSearchCard && (
                  <div 
                    ref={searchCardRef}
                    className="absolute z-50 mt-2 w-[120%] -left-[10%] bg-white rounded-xl shadow-lg py-4 px-6"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select 
                            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                          >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat.toLowerCase()}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <select 
                            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                            value={filters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                          >
                            <option value="any">Any Date</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                          <select 
                            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                            value={filters.price}
                            onChange={(e) => handleFilterChange('price', e.target.value)}
                          >
                            <option value="any">Any Price</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                            <option value="under-500">Under ₹500</option>
                            <option value="500-1000">₹500 - ₹1000</option>
                            <option value="1000+">Above ₹1000</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            placeholder="City or venue"
                            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {categories.slice(0, 6).map(category => (
                            <button
                              key={category}
                              onClick={() => handleFilterChange('category', category.toLowerCase())}
                              className={`px-3 py-1 text-sm rounded-full ${
                                filters.category === category.toLowerCase() 
                                  ? 'bg-[#c2b490] text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFilters({
                              category: 'all',
                              date: 'any',
                              price: 'any',
                              location: ''
                            });
                            setSearchQuery('');
                          }}
                          className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                        >
                          Clear All
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#c2b490] text-white text-sm font-medium rounded-full hover:bg-[#a08f6a]"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation - Right side */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            {/* Host Button */}
            <div className="relative">
              <button
                onClick={toggleHostDropdown}
                data-host-button
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#c2b490] transition-colors border border-[#c2b490] rounded-full hover:bg-[#f8f5ee] focus:outline-none focus:ring-2 focus:ring-[#c2b490] focus:ring-offset-2"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Host
              </button>

              {/* Host Dropdown */}
              {showHostDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {/* Dropdown header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700">Organizer Tools</h3>
                  </div>
                  
                  {/* Dropdown items */}
                  <div className="py-1" role="menu">
                    <Link
                      to="/organizer"
                      className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#f8f5ee] transition-colors"
                      role="menuitem"
                      onClick={closeHostDropdown}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e9dd] text-[#c2b490] group-hover:bg-[#e6dcc9] transition-colors">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Organizer Dashboard</p>
                          <p className="text-xs text-gray-500">Manage your events and tickets</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-500 hover:text-[#c2b490] focus:outline-none focus:ring-2 focus:ring-[#c2b490] focus:ring-offset-2 relative"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={handleProfileClick}
                  data-profile-circle
                  className="h-8 w-8 rounded-full bg-[#c2b490] flex items-center justify-center text-white cursor-pointer hover:bg-[#a08f6a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#c2b490] focus:ring-offset-2"
                  aria-label="Profile menu"
                >
                  {auth.currentUser?.email[0].toUpperCase()}
                </button>
                
                {/* Profile Card */}
                {showProfileCard && (
                  <div
                    ref={profileCardRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                  >
                    <div className="p-4">
                      {/* Header with close button */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-800">Profile</h3>
                        <button
                          type="button"
                          onClick={handleCloseProfileCard}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#c2b490] rounded-full p-1"
                          aria-label="Close profile menu"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* User Info */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-12 w-12 rounded-full bg-[#c2b490] flex items-center justify-center text-white text-xl font-semibold">
                            {auth.currentUser?.email[0].toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {auth.currentUser?.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {auth.currentUser?.email}
                            </p>
                          </div>
                        </div>
                        
                        {/* View Profile Button */}
                        <Link
                          to="/profile"
                          onClick={handleCloseProfileCard}
                          className="w-full flex items-center justify-center px-4 py-2 mb-3 bg-[#f8f5ee] text-[#c2b490] rounded-lg hover:bg-[#f0e9dd] transition-colors focus:outline-none focus:ring-2 focus:ring-[#c2b490] focus:ring-offset-2 text-sm font-medium"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          View Profile
                        </Link>
                      </div>

                      {/* Sign Out Button */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium cursor-pointer"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-[#c2b490] px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="bg-[#c2b490] hover:bg-[#a08f6a] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onMenuClick}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-[#c2b490] hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-[#c2b490] hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white rounded-b-2xl shadow-lg mx-4">
          <div className="px-2 pt-2 pb-3 space-y-2">
            {/* Categories in Mobile Menu */}
            <div className="px-3 py-2">
              <h3 className="text-sm font-medium text-gray-500 px-2 mb-2">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Bar - Mobile */}
            <div className="px-3 py-2">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2b490] focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-[#c2b490]"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {isLoggedIn ? (
              <div className="px-3 py-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleProfileClick}
                    data-profile-circle
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#c2b490]"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#c2b490] flex items-center justify-center text-white mr-2">
                      {auth.currentUser?.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700 flex-1 text-left">
                      {auth.currentUser?.email}
                    </span>
                  </button>
                  
                  {/* Mobile Profile Card */}
                  {showProfileCard && (
                    <div
                      ref={profileCardRef}
                      className="mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200"
                    >
                      <div className="p-4">
                        {/* Header with close button */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-800">Profile</h3>
                          <button
                            type="button"
                            onClick={handleCloseProfileCard}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#c2b490] rounded-full p-1"
                            aria-label="Close profile menu"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Sign Out Button */}
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium cursor-pointer"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:text-[#c2b490] hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 rounded-full text-white bg-[#c2b490] hover:bg-[#a08f6a] text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-6 space-y-2">
              <Link
                to="/home"
                onClick={handleCloseSidebar}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#c2b490] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-base font-medium">Home</span>
              </Link>

              <Link
                to="/trending"
                onClick={handleCloseSidebar}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#c2b490] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-base font-medium">Trending</span>
              </Link>

              <Link
                to="/map"
                onClick={handleCloseSidebar}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 group"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/684/684809.png" 
                  alt="Map" 
                  className="w-5 h-5 mr-3"
                />
                <span className="text-base font-medium">Explore Map</span>
              </Link>

              <Link
                to="/organizer"
                onClick={handleCloseSidebar}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#c2b490] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="text-base font-medium">Organize</span>
              </Link>

              {/* Horizontal Line */}
              <div className="my-2 mx-4 border-t border-gray-300"></div>

              {/* Interests Section */}
              <div className="px-4">
                <h3 className="text-base font-bold text-gray-800 mb-3">Interests</h3>
                <div className="space-y-2">
                  <div className="flex items-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    <img src="https://cdn-icons-png.flaticon.com/128/9254/9254656.png" alt="Chess" className="w-5 h-5 mr-2" />
                    <Link to="/sports"><span>Chess</span></Link>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    <img src="https://cdn-icons-png.flaticon.com/128/18698/18698899.png" alt="DJ Night" className="w-5 h-5 mr-2" />
                    <Link to="/music"><span>DJ Night</span></Link>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    <img src="https://cdn-icons-png.flaticon.com/128/9354/9354357.png" alt="Hackathon" className="w-5 h-5 mr-2" />
                    <Link to="/technology"><span>Hackathon</span></Link>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    <img src="https://cdn-icons-png.flaticon.com/128/9942/9942524.png" alt="Fashion Show" className="w-5 h-5 mr-2" />
                    <Link to="/fashion"><span>Fashion Show</span></Link>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    <img src="https://cdn-icons-png.flaticon.com/128/2642/2642105.png" alt="Cricket" className="w-5 h-5 mr-2" />
                    <Link to="/sports"><span>Cricket</span></Link>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    <img src="https://cdn-icons-png.flaticon.com/128/9942/9942524.png" alt="Seminar" className="w-5 h-5 mr-2" />
                    <Link to="/career"><span>Seminar</span></Link>
                  </div>
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="my-2 mx-4 border-t border-gray-300"></div>

              {/* Settings Button */}
              <Link
                to="/settings"
                onClick={handleCloseSidebar}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#c2b490] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-base font-medium">Settings</span>
              </Link>

              <Link
                to="/contact"
                onClick={handleCloseSidebar}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[#c2b490] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-base font-medium">Contact</span>
              </Link>

            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;