import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiMapPin, FiClock, FiUsers, FiDollarSign } from 'react-icons/fi';

const Event_Detail = () => {
  const navigate = useNavigate();

  // Event data
  const event = {
    title: "Development Hackathon - DevQuest",
    date: "December 25-30, 2023",
    time: "48-Hour Online Event",
    location: "Online",
    type: "Hackathon",
    teamSize: "2-5 Members",
    description: "Get ready to embark on a coding marathon where innovation meets real-world problem-solving! DevQuest is the flagship development hackathon of Prometeo '26, IIT Jodhpur's National Technical and Entrepreneurial Festival. In this thrilling online challenge, developers, designers, and engineers will come together to build impactful web or mobile applications that tackle modern-day technological challenges.",
    price: "Free",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rules: [
      "Teams must build a web or mobile application aligned with a problem statement released prior to the event.",
      "The solution must be developed entirely during the hackathon. Pre-developed work without significant new additions is disqualified.",
      "All software dependencies must be open-source or properly licensed.",
      "Teams must submit the source code and a presentation covering the tech stack, solution walkthrough, scalability, and future scope."
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* Event Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <img 
                className="h-48 w-full object-cover md:h-full md:w-48 lg:w-full" 
                src={event.image} 
                alt={event.title} 
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                {event.type}
              </div>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">{event.title}</h1>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2 text-indigo-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiClock className="mr-2 text-indigo-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="mr-2 text-indigo-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUsers className="mr-2 text-indigo-500" />
                  <span>Team Size: {event.teamSize}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUsers className="mr-2 text-indigo-500" />
                  <span>{event.attendees}+ participants</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiDollarSign className="mr-2 text-indigo-500" />
                  <span className="font-medium">{event.price}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/register')}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>

          {/* Event Description */}
          <div className="px-8 pb-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">All that you need to know about Development Hackathon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Event Type:</h3>
                <p className="text-gray-600">Online Hackathon</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Team Size:</h3>
                <p className="text-gray-600">2-5 Members</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Event Timeline:</h3>
                <p className="text-gray-600">25-30 December</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Mode:</h3>
                <p className="text-gray-600">Online Team Event</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">About the Event</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {event.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are a backend wizard or a frontend artist, this is your stage to ideate, design, code, and deploy solutions that "Innovate, Implement, Improve".
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Competition Structure & Format</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><span className="font-medium">Challenge:</span> Teams must build a web or mobile application aligned with a problem statement released prior to the event.</li>
                <li><span className="font-medium">Deliverables:</span> Participants must submit the source code and a presentation covering the tech stack, solution walkthrough, scalability, and future scope.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Rules & Guidelines</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><span className="font-medium">Fresh Code Only:</span> The solution must be developed entirely during the hackathon. Pre-developed work without significant new additions is disqualified.</li>
                <li><span className="font-medium">Open Source:</span> All software dependencies must be open-source or properly licensed.</li>
              </ul>
              <p className="mt-4 text-gray-600">
                For more information, refer to the rule book for clarification or contact the organizers:
              </p>
              <a 
                href="#" 
                className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // Add link to rulebook when available
                  alert('Rulebook link will be provided soon.');
                }}
              >
                Access the rulebook here: Rulebook Link
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event_Detail;