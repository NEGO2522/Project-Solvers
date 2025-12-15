import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../Pages/Home';

const questions = [
  {
    id: 'mainGoal',
    question: 'What is your main goal while attending events?',
    options: ['Entertainment / Fun', 'Learning new skills', 'Competition & challenges', 'Networking & connections']
  },
  {
    id: 'eventFrequency',
    question: 'How often would you like to attend events?',
    options: ['Occasionally', 'Once a month', 'Multiple times a month']
  },
  {
    id: 'eventLocation',
    question: 'Where should we recommend events from?',
    options: ['Near my location', 'My city', 'Anywhere']
  },
  {
    id: 'attendanceType',
    question: 'Do you usually attend events:',
    options: ['Alone', 'With friends / team']
  },
  {
    id: 'travelDistance',
    question: 'How far are you willing to travel for an event?',
    options: ['Walking distance', 'Within my city', 'Nearby cities', 'Anywhere']
  }
];

const Survey = ({ onClose }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    mainGoal: '',
    eventFrequency: '',
    eventLocation: '',
    attendanceType: '',
    travelDistance: ''
  });

  // Hide navbar and sidebar when survey is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const navbar = document.querySelector('nav');
    const sidebar = document.querySelector('aside');
    
    if (navbar) navbar.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    
    return () => {
      document.body.style.overflow = 'unset';
      if (navbar) navbar.style.display = '';
      if (sidebar) sidebar.style.display = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Survey submitted:', formData);
    // Redirect to home after submission
    navigate('/home');
    onClose();
  };

  const questionStyle = "text-lg font-medium text-gray-800 mb-2";
  const optionStyle = "flex items-center mb-2";
  const inputStyle = "w-4 h-4 text-[#c2b490] focus:ring-[#c2b490] border-gray-300";
  const labelStyle = "ml-2 text-gray-700";
  const sectionStyle = "mb-8 p-6 bg-[#EAE0CF] rounded-lg shadow-xl";
  const buttonStyle = "w-full md:w-auto px-6 py-2 bg-[#c2b490] text-white rounded-md hover:bg-[#a89b7e] transition duration-200";

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-[#C9B59C] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#EAE0CF] rounded-xl shadow-2xl p-6">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          {isLastQuestion ? 'Almost There!' : 'Help Us Personalize Your Experience'}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {isLastQuestion ? 'Last question!' : `Question ${currentQuestion + 1} of ${questions.length}`}
        </p>
      
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className={sectionStyle}>
            <h2 className={questionStyle}>{currentQ.question}</h2>
            <div className="space-y-2">
              {currentQ.options.map((option) => (
                <div key={option} className={optionStyle}>
                  <input
                    type="radio"
                    id={`${currentQ.id}-${option}`}
                    name={currentQ.id}
                    value={option}
                    checked={formData[currentQ.id] === option}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                  <label htmlFor={`${currentQ.id}-${option}`} className={labelStyle}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button 
              type="button" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 border rounded-md transition duration-200 ${
                currentQuestion === 0 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {questions.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentQuestion ? 'bg-[#c2b490]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            {isLastQuestion ? (
              <button 
                type="submit" 
                className="px-6 py-2 bg-[#c2b490] text-white rounded-md hover:bg-[#a89b7e] transition duration-200"
              >
                Submit
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleNext}
                disabled={!formData[currentQ.id]}
                className={`px-6 py-2 rounded-md transition duration-200 ${
                  !formData[currentQ.id]
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#c2b490] text-white hover:bg-[#a89b7e]'
                }`}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Survey;