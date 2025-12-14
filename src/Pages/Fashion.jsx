import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Fashion = () => {
  const [isInterested, setIsInterested] = useState(false);
  const navigate = useNavigate();

  const fashionEvents = [
    {
      id: 1,
      title: "Fashion Week 2024",
      description: "Experience the latest fashion trends from top designers",
      date: new Date(Date.now() + 86400000 * 15),
      location: "Fashion District",
      type: "BookMyShow",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Designer Showcase",
      description: "Exclusive showcase of emerging fashion designers",
      date: new Date(Date.now() + 86400000 * 9),
      location: "Design Studio",
      type: "EventForYou",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1528&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "Sustainable Fashion Expo",
      description: "Explore eco-friendly and sustainable fashion brands",
      date: new Date(Date.now() + 86400000 * 11),
      location: "Expo Center",
      type: "Unstop",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "Fashion Photography Workshop",
      description: "Learn fashion photography techniques from professionals",
      date: new Date(Date.now() + 86400000 * 7),
      location: "Photography Studio",
      type: "Hack2Skill",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 5,
      title: "Vintage Fashion Fair",
      description: "Discover unique vintage and retro fashion pieces",
      date: new Date(Date.now() + 86400000 * 8),
      location: "Vintage Market",
      type: "EventForYou",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1528&q=80",
      link: "#"
    },
    {
      id: 6,
      title: "Fashion Styling Masterclass",
      description: "Master the art of fashion styling and personal branding",
      date: new Date(Date.now() + 86400000 * 6),
      location: "Fashion Academy",
      type: "BookMyShow",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    }
  ];

  const handleInterested = () => {
    setIsInterested(!isInterested);
    if (!isInterested) {
      alert('You are now interested in Fashion events!');
    } else {
      alert('You are no longer interested in Fashion events.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#c2b490] mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Fashion</h1>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-medium bg-[#c2b490]/10 text-[#c2b490] rounded-full">Fashion</span>
              <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Shows</span>
              <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Design</span>
            </div>
          </div>
          <button
            onClick={handleInterested}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isInterested
                ? 'bg-[#c2b490] text-white hover:bg-[#a08f6a]'
                : 'bg-white text-[#c2b490] border-2 border-[#c2b490] hover:bg-[#f8f5ee]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isInterested ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              )}
            </svg>
            {isInterested ? 'Interested' : 'Interested'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {fashionEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {event.image ? (
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-[#c2b490] to-[#a08f6a] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{event.title.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                  <span className="bg-[#c2b490] text-white text-sm font-medium px-3 py-1 rounded-full">{event.type || 'Event'}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {format(event.date, 'PPP')}
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location || 'Online'}
                </div>
                <div className="flex justify-end mt-4">
                  <a href={event.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium bg-[#c2b490] text-white rounded-lg hover:bg-[#a08f6a] transition-colors cursor-pointer">
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

export default Fashion;

