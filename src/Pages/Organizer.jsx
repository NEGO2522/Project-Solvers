import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for recent participants
const generateMockParticipants = (count) => {
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie', 'Quinn', 'Avery', 'Peyton', 'Skyler', 'Dakota', 'Emerson', 'Rowan', 'Sawyer', 'Parker', 'Hayden', 'Reese', 'Blake', 'Cameron'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    email: `participant${i + 1}@example.com`,
    joinedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

const Organizer = () => {
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [recentParticipants, setRecentParticipants] = useState([]);
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const navigate = useNavigate();

  // This would typically come from your API/backend
  const stats = {
    totalCandidates: 35,
    activeCandidates: 28,
    newThisWeek: 7,
    upcomingEvents: 5,
    pastEvents: 12,
    attendanceRate: '82%',
    topSkill: 'Web Development'
  };

  useEffect(() => {
    // Simulate API call to fetch recent participants
    const fetchRecentParticipants = () => {
      // In a real app, you would fetch this from your API
      const participants = generateMockParticipants(35); // Generate 35 mock participants
      setRecentParticipants(participants);
      setTotalCandidates(participants.length);
    };

    fetchRecentParticipants();
  }, []);

  const displayedParticipants = showAllParticipants ? recentParticipants : recentParticipants.slice(0, 10);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Organizer Dashboard</h1>
        <p className="text-gray-600">Manage your events and track candidate applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Candidates Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Candidates</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCandidates.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 01-2 0v6a1 1 0 01-2 0V7z" clipRule="evenodd" />
                    </svg>
                    {stats.newThisWeek} new this week
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {stats.attendanceRate} Attendance
                </span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Active Candidates</span>
                <span className="font-medium text-gray-900">{stats.activeCandidates}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Top Skill</span>
                <span className="font-medium text-gray-900">{stats.topSkill}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Upcoming Events: <span className="font-medium">{stats.upcomingEvents}</span></span>
                <span>Past Events: <span className="font-medium">{stats.pastEvents}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Create Event Card */}
        <div className="bg-gradient-to-br from-[#c2b490] to-[#a08f6a] rounded-xl shadow-md overflow-hidden text-white">
          <div className="p-6 h-full flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Create a New Event</h3>
              <p className="text-blue-50 mb-6">Reach more candidates by creating a new event listing</p>
            </div>
            <button
              onClick={() => navigate('/create-event')}
              className="w-full bg-white text-[#c2b490] hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Event
            </button>
          </div>
        </div>

        {/* Past Events Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Past Events</h3>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-900 mb-2">{stats.pastEvents}</p>
              <p className="text-sm text-gray-600 mb-4">Events you've organized in the past</p>
            </div>
            <button
              onClick={() => {/* Add navigation to past events */}}
              className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              View All Events
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Participants Section - Compact */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-medium text-gray-700">Recent Participants</h2>
              <p className="text-xs text-gray-500">Showing {displayedParticipants.length} of {recentParticipants.length}</p>
            </div>
            {!showAllParticipants && recentParticipants.length > 10 && (
              <button
                onClick={() => setShowAllParticipants(true)}
                className="text-xs font-medium text-[#c2b490] hover:text-[#8a7c5d] focus:outline-none px-2 py-1"
              >
                View All
              </button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto text-xs">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {displayedParticipants.map((participant) => (
                <tr key={participant.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                        {participant.name.charAt(0)}
                      </div>
                      <div className="ml-2">
                        <div className="text-xs font-medium text-gray-800">{participant.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500 text-xs">
                    {participant.email}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500 text-xs">
                    {new Date(participant.joinedDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!showAllParticipants && recentParticipants.length > 20 && (
          <div className="px-4 py-1.5 bg-gray-50 text-center border-t border-gray-100">
            <button
              onClick={() => setShowAllParticipants(true)}
              className="text-xs font-medium text-[#c2b490] hover:text-[#8a7c5d] focus:outline-none"
            >
              View All {recentParticipants.length} Participants →
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Organizer;