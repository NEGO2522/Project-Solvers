import React from 'react';

const Organizer = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Organizer Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Welcome to the Organizer Dashboard. This is a protected route for organizers only.</p>
        {/* Add your organizer-specific components and functionality here */}
      </div>
    </div>
  );
};

export default Organizer;