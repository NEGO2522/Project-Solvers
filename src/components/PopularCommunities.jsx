import { Link } from 'react-router-dom';

const PopularCommunities = () => {
  const communities = [
    { id: 1, name: 'Tech Enthusiasts', members: '12.5k', icon: '💻' },
    { id: 2, name: 'Music Lovers', members: '8.2k', icon: '🎵' },
    { id: 3, name: 'Fitness Freaks', members: '15.7k', icon: '💪' },
    { id: 4, name: 'Foodies United', members: '23.1k', icon: '🍔' },
    { id: 5, name: 'Travel Buddies', members: '18.9k', icon: '✈️' },
  ];

  return (
    <div className="hidden lg:block w-72 bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-fit sticky top-20">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Communities</h2>
      <div className="space-y-3">
        {communities.map((community) => (
          <Link
            key={community.id}
            to={`/community/${community.id}`}
            className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-xl mr-3">
              {community.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">{community.name}</h3>
              <p className="text-xs text-gray-500">{community.members} members</p>
            </div>
          </Link>
        ))}
      </div>
      <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-[#c2b490] hover:bg-[#f8f6f0] rounded-lg transition-colors">
        View All Communities
      </button>
    </div>
  );
};

export default PopularCommunities;
