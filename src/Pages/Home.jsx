import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images
import artsIcon from '../assets/arts.png';
import businessIcon from '../assets/business.png';
import fashionIcon from '../assets/fashion.png';
import musicIcon from '../assets/music.png';
import sportsIcon from '../assets/sports.png';
import techIcon from '../assets/technology.png';
import socialIcon from '../assets/social.png';
import careerIcon from '../assets/career.png';
import chessImage from '../assets/chess.png';
import djNightImage from '../assets/djnight.png';
import hackathonImage from '../assets/hackathonjodhpur.png';
import aakashGuptaImage from '../assets/aakash_gupta.png';

const Home = ({ sidebarOpen, onToggleSidebar }) => {
  const [events, setEvents] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

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
          title: "Chess Tournament",
          description: "Annual city chess championship with exciting prizes",
          date: new Date(Date.now() + 86400000 * 4), // 4 days from now
          location: "City Convention Center",
          type: "BookMyShow",
          image: chessImage,
          link: "https://in.bookmyshow.com/sports/chess-tournament/ET00462513"
        },
        {
          id: 2,
          title: "Aerreo - Purgatory 777",
          description: "Electrifying DJ night with top artists and amazing music",
          date: new Date(Date.now() + 86400000 * 3), // 3 days from now
          location: "Jaipur",
          type: "BookMyShow",
          image: djNightImage,
          link: "https://in.bookmyshow.com/activities/aerreo-purgatory-777-jaipur/ET00476204"
        },
        {
          id: 3,
          title: "Hackathon Jodhpur",
          description: "48-hour coding competition for developers and designers",
          date: new Date(Date.now() + 86400000 * 10), // 1 week from now
          location: "Indian Institute of Technology (IIT), Jodhpur",
          type: "EventForYou",
          image: hackathonImage,
          link: "https://unstop.com/competitions/development-hackathon-indian-institute-of-technology-iit-jodhpur-1602705"
        }
      ];
      
      // Sample trending events data
      const trendingEventsData = [
        {
          id: 4,
          title: "Daily ka kamaal hai - Aakash Gupta",
          description: "A standup comedy special",
          date: new Date(Date.now() + 86400000 * 16), // 2 days from now
          location: "Maharana pratap Auditorium",
          type: "BookMyShow",
          image: aakashGuptaImage,
          link: "https://in.bookmyshow.com/events/daily-ka-kaam-hai-by-aakash-gupta-jaipur/ET00468071"
        },
        {
          id: 5,
          title: "Blockchain Conference",
          description: "Learn about the future of blockchain technology and cryptocurrencies",
          date: new Date(Date.now() + 86400000 * 5), // 5 days from now
          location: "Convention Center",
          type: "Unstop",
          image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
          link: "#"
        },
        {
          id: 6,
          title: "AI & ML Workshop",
          description: "Hands-on workshop on Artificial Intelligence and Machine Learning",
          date: new Date(Date.now() + 86400000 * 3), // 3 days from now
          location: "Innovation Lab",
          type: "Hack2Skill",
          image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1408&q=80",
          link: "#"
        }
      ];

      // Hackathons data
      const hackathonsData = [
        {
          id: 7,
          title: "Gameathon - SVPCET Nagpur",
          description: "Game development hackathon at St. Vincent Pallotti College of Engineering and Technology",
          date: new Date(Date.now() + 86400000 * 7), // 7 days from now
          location: "St. Vincent Pallotti College of Engineering and Technology (SVPCET), Nagpur",
          type: "Unstop",
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          link: "https://unstop.com/hackathons/gameathon-st-vincent-pallotti-college-of-engineering-and-technology-svpcet-nagpur-1609348"
        },
        {
          id: 8,
          title: "Visa 24hrs AI Hackathon - IIT Madras",
          description: "24-hour AI hackathon at IIT Madras focusing on innovative AI solutions",
          date: new Date(Date.now() + 86400000 * 12), // 12 days from now
          location: "Indian Institute of Technology (IIT), Madras",
          type: "Unstop",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          link: "https://unstop.com/hackathons/visa-24hrs-ai-hackathon-iit-madras-1609365"
        },
        {
          id: 9,
          title: "Innov-AI-tion - ELAN & NVISION 2026 - IIT Hyderabad",
          description: "AI innovation hackathon as part of ELAN & NVISION 2026 at IIT Hyderabad",
          date: new Date(Date.now() + 86400000 * 15), // 15 days from now
          location: "Indian Institute of Technology (IIT), Hyderabad",
          type: "Unstop",
          image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          link: "https://unstop.com/hackathons/innov-ai-tion-elan-nvision-2026-iit-hyderabad-1599891"
        }
      ];

      setEvents(sampleEvents);
      setTrendingEvents(trendingEventsData);
      setHackathons(hackathonsData);
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

  // Carousel images
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
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">Categories</h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center w-full">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center justify-center w-20 sm:w-24 transition-transform hover:scale-105 focus:outline-none cursor-pointer"
              onClick={() => {
                const categoryRoutes = {
                  'Technology': '/technology',
                  'Sports': '/sports',
                  'Music': '/music',
                  'Business': '/business',
                  'Fashion': '/fashion',
                  'Social': '/social',
                  'Career': '/career',
                  'Arts': '/arts'
                };
                const route = categoryRoutes[category.name];
                if (route) {
                  navigate(route);
                } else {
                  console.log(`Selected: ${category.name}`);
                }
              }}
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
      <div className="w-full h-[400px] mb-12 overflow-hidden rounded-lg shadow-lg">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Recommended Events</h1>
              <p className="text-gray-600">Join us for these exciting events and workshops</p>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No events at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {events.map((event) => (
                  <div 
                    key={event.id} 
                    className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {event.image ? (
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-[#c2b490] to-[#a08f6a] flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {event.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
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
                      {event.title === "Hackathon Jodhpur" && (
                        <div className="flex justify-end mt-4">
                          <button 
                            className="px-4 py-2 text-sm font-medium bg-[#c2b490] text-white rounded hover:bg-[#a08f6a] transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.location.href = '/event';
                            }}
                          >
                            Register Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trending Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trending Events</h1>
          <p className="text-gray-600">Discover what's trending in events near you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {trendingEvents.map((event) => (
            <a 
              key={`trending-${event.id}`} 
              href={event.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80';
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-[#c2b490] to-[#a08f6a] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {event.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
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
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Hackathons Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hackathons</h1>
          <p className="text-gray-600">Code, Create, and Compete in these exciting hackathons</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {hackathons.map((event) => (
            <a 
              key={`hackathon-${event.id}`} 
              href={event.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {event.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                  <span className="bg-[#4F46E5] text-white text-sm font-medium px-3 py-1 rounded-full">
                    {event.type || 'Hackathon'}
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
              </div>
            </a>
          ))}
        </div>
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