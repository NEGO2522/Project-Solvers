import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c2b490]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
        <p className="text-xl text-gray-600">Join us for these exciting events and workshops</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No upcoming events at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Host Your Own Event</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          Want to organize an event with us? We'd love to collaborate! Share your ideas and let's create something amazing together.
        </p>
        <button 
          className="px-6 py-3 bg-white border-2 border-[#c2b490] text-[#c2b490] font-medium rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => window.location.href = '/contact'}
        >
          Contact Us to Host an Event
        </button>
      </div>
    </div>
  );
};

export default Home;