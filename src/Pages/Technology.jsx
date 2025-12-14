import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import hackathonImage from '../assets/hackathonjodhpur.png';
import hackathonIcon from '../assets/hackathon.png';
import competitionIcon from '../assets/pitch.png';
import meetupsIcon from '../assets/meetup.png';
import workshopsIcon from '../assets/workshop.png';

// Category icons as emojis
const Hackathons = hackathonIcon;
const Competitions = competitionIcon;
const TechMeetups = meetupsIcon;
const WorkshopsBootcamps = workshopsIcon;

const Technology = () => {
  const [isInterested, setIsInterested] = useState(false);
  const navigate = useNavigate();

  // Technology-related events
  const technologyEvents = [
    {
      id: 1,
      title: "Hackathon Jodhpur",
      description: "48-hour coding competition for developers and designers",
      date: new Date(Date.now() + 86400000 * 10),
      location: "Indian Institute of Technology (IIT), Jodhpur",
      type: "EventForYou",
      image: hackathonImage,
      link: "https://unstop.com/competitions/development-hackathon-indian-institute-of-technology-iit-jodhpur-1602705"
    },
    {
      id: 2,
      title: "Blockchain Conference",
      description: "Learn about the future of blockchain technology and cryptocurrencies",
      date: new Date(Date.now() + 86400000 * 5),
      location: "Convention Center",
      type: "Unstop",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "AI & ML Workshop",
      description: "Hands-on workshop on Artificial Intelligence and Machine Learning",
      date: new Date(Date.now() + 86400000 * 3),
      location: "Innovation Lab",
      type: "Hack2Skill",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1408&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      description: "Intensive bootcamp covering modern web development technologies",
      date: new Date(Date.now() + 86400000 * 7),
      location: "Tech Hub",
      type: "EventForYou",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      link: "#"
    },
    {
      id: 5,
      title: "Cybersecurity Summit",
      description: "Explore the latest trends and best practices in cybersecurity",
      date: new Date(Date.now() + 86400000 * 12),
      location: "Security Center",
      type: "Unstop",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 6,
      title: "Cloud Computing Conference",
      description: "Learn about cloud infrastructure, DevOps, and scalable solutions",
      date: new Date(Date.now() + 86400000 * 15),
      location: "Cloud Center",
      type: "Hack2Skill",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      link: "#"
    }
  ];

  const handleInterested = () => {
    setIsInterested(!isInterested);
    if (!isInterested) {
      alert('You are now interested in Technology events!');
    } else {
      alert('You are no longer interested in Technology events.');
    }
  };

  const categories = [
      { id: 1, name: 'Hackathons', icon: Hackathons },
      { id: 2, name: 'Pitch Competitions', icon: Competitions },
      { id: 3, name: 'Tech Meetups', icon: TechMeetups },
      { id: 4, name: 'Workshops & Bootcamps', icon: WorkshopsBootcamps },
    ];
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#c2b490] mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        {/* Header Section with Title and Interested Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-14 gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Technology</h1>
          <button
            onClick={handleInterested}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isInterested
                ? 'bg-[#c2b490] text-white hover:bg-[#a08f6a]'
                : 'bg-white text-[#c2b490] border-2 border-[#c2b490] hover:bg-[#f8f5ee]'
            }`}
          >
            <svg
              className={`w-5 h-5`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isInterested ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              )}
            </svg>
            {isInterested ? 'Interested' : 'Interested'}
          </button>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">Categories</h1>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16 items-center w-full px-2 sm:px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center justify-center w-24 sm:w-28 transition-all duration-200 hover:scale-105 focus:outline-none cursor-pointer"
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
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/40?text=${category.name.charAt(0)}`;
                  }}
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {technologyEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {format(event.date, 'PPP')}
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location || 'Online'}
                </div>

                <div className="flex justify-end mt-4">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium bg-[#c2b490] text-white rounded-lg hover:bg-[#a08f6a] transition-colors cursor-pointer"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;

