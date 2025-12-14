import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CommunityDetail() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch community details
    const fetchCommunity = async () => {
      try {
        // Mock data - replace with actual API call
        const communityData = {
          1: { id: 1, name: 'Tech Enthusiasts', members: '12.5k', icon: '💻', description: 'A community for all technology enthusiasts to share knowledge and connect.' },
          2: { id: 2, name: 'Music Lovers', members: '8.2k', icon: '🎵', description: 'For those who live and breathe music. Share your favorite tracks and discover new ones!' },
          3: { id: 3, name: 'Fitness Freaks', members: '15.7k', icon: '💪', description: 'Get fit together! Share your fitness journey and connect with like-minded people.' },
          4: { id: 4, name: 'Foodies United', members: '23.1k', icon: '🍔', description: 'For food lovers who enjoy exploring new cuisines and sharing recipes.' },
          5: { id: 5, name: 'Travel Buddies', members: '18.9k', icon: '✈️', description: 'Share travel tips, stories, and connect with fellow travelers.' },
        };

        // Simulate API delay
        setTimeout(() => {
          setCommunity(communityData[id]);
          // Mock events for the community
          setEvents([
            { id: 1, title: `${communityData[id]?.name} Meetup`, date: '2023-12-20', location: 'Online' },
            { id: 2, title: `Annual ${communityData[id]?.name} Conference`, date: '2024-01-15', location: 'Main Hall' },
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching community:', error);
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Not Found</h1>
          <p className="text-gray-600 mb-6">The community you're looking for doesn't exist or has been removed.</p>
          <a 
            href="/" 
            className="px-6 py-2 bg-[#c2b490] text-white font-medium rounded-md hover:bg-[#b3a47d] transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-3xl mr-4">
                {community.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{community.name}</h1>
                <p className="text-gray-500 mt-1">{community.members} members</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-[#c2b490] text-white text-sm font-medium rounded-md hover:bg-[#b3a47d] transition-colors">
                Join Community
              </button>
            </div>
            <p className="mt-4 text-gray-600">{community.description}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                  <button className="mt-3 text-sm text-[#c2b490] font-medium hover:text-[#a5936e] transition-colors">
                    View Details →
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No upcoming events scheduled yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
