import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import category icons
import artsIcon from '../assets/arts.png';
import businessIcon from '../assets/business.png';
import fashionIcon from '../assets/fashion.png';
import musicIcon from '../assets/music.png';
import sportsIcon from '../assets/sports.png';
import techIcon from '../assets/technology.png';
import socialIcon from '../assets/social.png';
import careerIcon from '../assets/career.png';

const Home = ({ sidebarOpen, onToggleSidebar }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Sync with parent component's sidebar state
    setShowSidebar(sidebarOpen);
  }, [sidebarOpen]);

  const handleMenuClick = () => {
    const newState = !showSidebar;
    setShowSidebar(newState);
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Static sample data
      const sampleEvents = [
        {
          id: 1,
          title: "Team Meeting",
          description: "Weekly team sync to discuss project progress",
          date: new Date(Date.now() + 86400000), // Tomorrow
          location: "Conference Room A",
          type: "Meeting"
        },
        {
          id: 2,
          title: "Product Launch",
          description: "Launch of our new product line",
          date: new Date(Date.now() + 86400000 * 3), // 3 days from now
          location: "Main Hall",
          type: "Event"
        },
        {
          id: 3,
          title: "Workshop",
          description: "Learn new development techniques",
          date: new Date(Date.now() + 86400000 * 7), // 1 week from now
          location: "Training Room",
          type: "Workshop"
        }
      ];
      
      setEvents(sampleEvents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c2b490]"></div>
      </div>
    );
  }

  // Carousel settings
  // Custom arrow components
  const NextArrow = ({ onClick, className, ...rest }) => {
    // Remove non-DOM props that react-slick passes
    const { currentSlide, slideCount, ...domProps } = rest;
    
    return (
      <button
        onClick={onClick}
        className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50 ${className || ''}`}
        aria-label="Next slide"
        {...domProps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  };

  const PrevArrow = ({ onClick, className, ...rest }) => {
    // Remove non-DOM props that react-slick passes
    const { currentSlide, slideCount, ...domProps } = rest;
    
    return (
      <button
        onClick={onClick}
        className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50 ${className || ''}`}
        aria-label="Previous slide"
        {...domProps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots !bottom-4',
    appendDots: dots => (
      <div className="absolute bottom-0 w-full">
        <ul className="m-0 p-0">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-white/50 rounded-full transition-all duration-300 hover:bg-white" />
    )
  };

  // Import images
  const apdhillon = '/src/assets/apdhillon.jpeg';
  const genaiAcademy = '/src/assets/genai_academy.jpeg';
  const marathon = '/src/assets/marathon.jpeg';

  // Carousel slides data
  const carouselSlides = [
    { id: 1, image: apdhillon },
    { id: 2, image: genaiAcademy },
    { id: 3, image: marathon }
  ];
  

  // Category data
  const categories = [
    { id: 1, name: 'Technology', icon: techIcon },
    { id: 2, name: 'Sports', icon: sportsIcon },
    { id: 3, name: 'Music', icon: musicIcon },
    { id: 4, name: 'Business', icon: businessIcon },
    { id: 5, name: 'Fashion', icon: fashionIcon },
    { id: 6, name: 'Social', icon: socialIcon },
    { id: 7, name: 'Career', icon: careerIcon },
    { id: 8, name: 'Arts', icon: artsIcon },
  ];

  return (
    <div className="relative w-full pt-4">
      {/* Categories */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center w-full">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center justify-center w-20 sm:w-24 transition-transform hover:scale-105 focus:outline-none"
              onClick={() => console.log(`Selected: ${category.name}`)}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-1.5 p-1">
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
        <Slider ref={sliderRef} {...settings}>
          {carouselSlides.map((slide) => (
            <div key={slide.id} className="h-[400px] w-full">
              {slide.id === 1 ? (
                <a 
                  href="https://in.bookmyshow.com/events/ap-dhillon-one-of-one-tour-jaipur/ET00458409" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src={slide.image}
                    alt="AP Dhillon One of One Tour"
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </a>
              ) : slide.id === 2 ? (
                <a 
                  href="https://vision.hack2skill.com/event/genaiexchange?tab=academy&utm_source=hack2skill&utm_medium=homepage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src={slide.image}
                    alt="GenAI Exchange Academy"
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </a>
              ) : slide.id === 3 ? (
                <a 
                  href="https://in.bookmyshow.com/sports/sbi-green-marathon-season-6-jaipur/ET00449722" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src={slide.image}
                    alt="SBI Green Marathon Season 6 - Jaipur"
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </a>
              ) : (
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile menu button - only visible on small screens */}
      <button 
        onClick={handleMenuClick}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#c2b490]"
        aria-label="Toggle menu"
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
            d={showSidebar ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
              <p className="text-gray-600">Join us for these exciting events and workshops</p>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No upcoming events at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-r from-[#c2b490] to-[#a08f6a] flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {event.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                        <span className="bg-[#c2b490] text-white text-sm font-medium px-3 py-1 rounded-full">
                          {event.type || 'Event'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {format(event.date, 'PPP')}
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location || 'Online'}
                      </div>
                      
                      <button 
                        className="w-full mt-4 px-4 py-2 bg-[#c2b490] text-white font-medium rounded-md hover:bg-[#a08f6a] transition-colors"
                        onClick={() => alert('Registration coming soon!')}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Floating Assistant Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => alert('Assistant is here to help!')}
          className="bg-[#c2b490] hover:bg-[#a08f6a] text-white rounded-full p-4 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Assistant"
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
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>
      
      {/* Footer Section */}
      {/* <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">EventMasters</h3>
              <p className="text-gray-600 text-sm">Connecting people through amazing events and experiences.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Events</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Upcoming Events</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Popular Events</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Categories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Create Event</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#c2b490] text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} EventMasters. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;