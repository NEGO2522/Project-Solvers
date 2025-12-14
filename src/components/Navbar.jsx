import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ai_icon from '../assets/ai_icon.png';

const Navbar = ({ onMenuClick, sidebarOpen, setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showHostDropdown, setShowHostDropdown] = useState(false);
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
    setShowHostDropdown(!showHostDropdown);
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


  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 w-full">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between h-16 item-s-center">
          {/* Left side - Menu button and logo */}
          <div className="flex items-center">
            <button 
              type="button"
              onClick={handleMenuClick}
              className="p-2 -ml-2 text-gray-500 hover:text-[#c2b490] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#c2b490] rounded-md transition-colors"
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
              <span className="text-xl font-bold text-[#c2b490]">EventMasters</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center w-1/3">
            <form onSubmit={handleSearch} className="flex-1">
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
                    <span className="text-sm text-gray-400 hover:text-[#c2b490] cursor-default">Ask</span>
                    <button
                      type="button"
                      className="p-1 hover:opacity-80 flex items-center justify-center"
                      onClick={() => alert('AI Chatbot coming soon!')}
                      title="AI Chatbot"
                    >
                      <div className="h-7 w-7 rounded-full border-2 border-blue-500 flex items-center justify-center p-1 bg-white">
                        <img src={ai_icon} alt="AI Icon" className="h-full w-full object-contain" />
                      </div>
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
            
            {/* Host Button */}
            <div className="relative">
              <button
                onClick={toggleHostDropdown}
                data-host-button
                className="ml-2 flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#c2b490] transition-colors border border-[#c2b490] rounded-full hover:bg-[#f8f5ee] focus:outline-none focus:ring-2 focus:ring-[#c2b490] focus:ring-offset-2"
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="h-10 w-10 rounded-full bg-[#c2b490] flex items-center justify-center text-white text-lg font-semibold">
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
                      </div>

                      {/* Sign Out Button */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium"
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
                          className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm font-medium"
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
                to="/"
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
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-base font-medium">Trending</span>
              </Link>

              {/* Horizontal Line */}
              <div className="my-2 mx-4 border-t border-gray-300"></div>

              {/* Interests Section */}
              <div className="px-4">
                <h3 className="text-base font-bold text-gray-800 mb-3">Interests</h3>
                <div className="space-y-2">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 cursor-pointer">
                    Football
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 cursor-pointer">
                    Hackathon
                  </div>
                </div>
              </div>

              {/* Additional Items */}
              <div className="px-4">
                <div className="space-y-2">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 cursor-pointer">
                    Arjit Singh
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 cursor-pointer">
                    Football
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 cursor-pointer">
                    Hackathon
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 cursor-pointer">
                    Arjit Singh
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#c2b490] rounded-lg transition-colors duration-200 cursor-pointer">
                    ...... More
                  </div>
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="my-2 mx-4 border-t border-gray-300"></div>

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