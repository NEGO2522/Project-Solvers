import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const eventCategories = [
    'Google', 'Microsoft', 'Amazon', 'Jaipur', 'Colleges', 
    'Concerts', 'Hackathon Events', 'StartUp Events', 
    'Tech Events', 'Mumbai Events', 'Workshop'
  ];

  const navItems = [
    { path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
    { path: '/popular', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', label: 'Popular' },
    { path: '/explorer', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 21v-4a1 1 0 011-1h2a1 1 0 011 1v4', label: 'Explorer' },
    { 
      path: '#', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', 
      label: 'Events',
      hasDropdown: true
    },
    { 
      path: '/settings', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z', 
      label: 'Settings'
    },
    { 
      path: '/contact', 
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', 
      label: 'Contact'
    },
    { 
      path: '/profile', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', 
      label: 'Profile'
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-2 left-2 h-[calc(100%-16px)] bg-white z-30 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300 ease-in-out w-64 rounded-2xl overflow-hidden`}
        style={{ 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          borderRadius: '1rem'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            <button 
              onClick={onClose}
              className="mr-3 text-gray-500 hover:text-[#c2b490] focus:outline-none md:hidden"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#c2b490]">EventMasters</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <div className="relative">
                    <button
                      onClick={() => item.hasDropdown ? setIsEventsOpen(!isEventsOpen) : onClose()}
                      className={`group w-full text-left flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        location.pathname === item.path && !item.hasDropdown
                          ? 'bg-[#c2b490] text-white shadow-md transform -translate-x-1'
                          : 'text-gray-700 hover:bg-[#f0ede5] hover:text-[#a08f6a] hover:pl-6 transform hover:-translate-x-0.5'
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 mr-3 transition-transform duration-200 ${
                          location.pathname === item.path && !item.hasDropdown
                            ? 'text-white' 
                            : 'text-gray-500 group-hover:text-[#a08f6a] group-hover:scale-110'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={location.pathname === item.path && !item.hasDropdown ? 2.5 : 2}
                          d={item.icon}
                        />
                      </svg>
                      <span className="flex-1 transition-all duration-200">
                        {item.label}
                      </span>
                      {item.hasDropdown && (
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${isEventsOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                    
                    {item.hasDropdown && isEventsOpen && (
                      <div className="ml-8 mt-1 space-y-1 py-1">
                        {eventCategories.map((category, index) => (
                          <Link
                            key={index}
                            to={`/events/${category.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0ede5] hover:text-[#a08f6a] rounded-lg transition-all duration-300 cursor-pointer transform hover:translate-x-1 hover:font-medium"
                            onClick={() => {
                              setIsEventsOpen(false);
                              onClose();
                            }}
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;