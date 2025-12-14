import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ai_icon from '../assets/ai_icon.png';

const Navbar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    date: 'any',
    price: 'any',
    location: ''
  });

  const searchCardRef = useRef(null);
  const categoriesRef = useRef(null);

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
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 rounded-3xl mx-auto mt-4 w-[95%] max-w-6xl">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#c2b490] ml-4">EventMasters</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center w-2/3">
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
                      className="p-1 text-gray-400 hover:text-[#c2b490]"
                      onClick={() => alert('AI Chatbot coming soon!')}
                      title="AI Chatbot"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <img src={ai_icon} alt="" />
                      </svg>
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
            
            {/* Categories Dropdown */}
            <div className="relative ml-4" ref={categoriesRef}>
              <button
                type="button"
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490]"
                id="categories-menu"
                aria-haspopup="true"
                aria-expanded={showCategories}
              >
                Categories
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showCategories && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="categories-menu">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => setShowCategories(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/competitions" 
              className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#c2b490] whitespace-nowrap"
            >
              Competitions
            </Link>
            {isLoggedIn ? (
              <div className="h-8 w-8 rounded-full bg-[#c2b490] flex items-center justify-center text-white">
                {auth.currentUser?.email[0].toUpperCase()}
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
                <Link
                  to="/competitions"
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Competitions
                </Link>
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
              <div className="flex items-center px-3 py-2">
                <div className="h-8 w-8 rounded-full bg-[#c2b490] flex items-center justify-center text-white mr-2">
                  {auth.currentUser?.email[0].toUpperCase()}
                </div>
                <span className="text-sm text-gray-500">
                  {auth.currentUser?.email}
                </span>
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
    </nav>
  );
};

export default Navbar;