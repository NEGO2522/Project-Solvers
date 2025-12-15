import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUsers, FaUniversity, FaIdCard, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Register = () => {
  const location = useLocation();
  const eventId = location.state?.eventId || 'default-event-id';
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    teamName: '',
    teamSize: '1',
    studentId: '',
    eventId: eventId
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate('/', { 
          state: { 
            registrationSuccess: true,
            registrationData: formData
          } 
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Add registration to Firestore
      await addDoc(collection(db, 'eventRegistrations'), {
        ...formData,
        registeredAt: serverTimestamp()
      });

      // Show success popup
      setShowSuccess(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const iconClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 md:p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-3">Join the Event</h1>
              <p className="text-lg text-indigo-100">
                Register now to secure your spot in this exciting hackathon. Fill in your details below to get started.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Form */}
            <div className="p-8 md:p-12">
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded"
                >
                  <p className="text-red-700">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="relative col-span-2">
                    <label htmlFor="fullName" className={labelClasses}>
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className={iconClasses} />
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`${inputClasses} pl-10`}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="email" className={labelClasses}>
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className={iconClasses} />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputClasses} pl-10`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label htmlFor="phone" className={labelClasses}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className={iconClasses} />
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${inputClasses} pl-10`}
                        placeholder="+1234567890"
                      />
                    </div>
                  </div>

                  {/* Institution */}
                  <div className="relative col-span-2">
                    <label htmlFor="institution" className={labelClasses}>
                      Institution/Organization
                    </label>
                    <div className="relative">
                      <FaUniversity className={iconClasses} />
                      <input
                        type="text"
                        name="institution"
                        id="institution"
                        required
                        value={formData.institution}
                        onChange={handleChange}
                        className={`${inputClasses} pl-10`}
                        placeholder="Your school or company"
                      />
                    </div>
                  </div>

                  {/* Student/Employee ID */}
                  <div className="relative">
                    <label htmlFor="studentId" className={labelClasses}>
                      Student/Employee ID
                    </label>
                    <div className="relative">
                      <FaIdCard className={iconClasses} />
                      <input
                        type="text"
                        name="studentId"
                        id="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className={`${inputClasses} pl-10`}
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Team Name */}
                  <div className="relative">
                    <label htmlFor="teamName" className={labelClasses}>
                      Team Name
                    </label>
                    <div className="relative">
                      <FaUsers className={iconClasses} />
                      <input
                        type="text"
                        name="teamName"
                        id="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        className={`${inputClasses} pl-10`}
                        placeholder="Leave empty for individual"
                      />
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="relative col-span-2">
                    <label htmlFor="teamSize" className={labelClasses}>
                      Team Size
                    </label>
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className={`${inputClasses} cursor-pointer`}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start pt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Privacy Policy
                      </a>
                    </label>
                    <p className="text-gray-500 mt-1">
                      By registering, you agree to receive event-related communications.
                    </p>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:block bg-gradient-to-br from-indigo-500 to-blue-600 p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,transparent)]"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Why Register?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Access to all event activities and resources</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Network with industry experts and peers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Opportunity to win exciting prizes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 mt-0.5">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Certificate of participation</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-auto">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-3 text-black">Need Help?</h3>
                    <p className="text-gray-800 text-sm mb-4">
                      Our support team is here to help you with any questions about registration or the event.
                    </p>
                    <a
                      href="mailto:support@example.com"
                      className="inline-flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-800 transition-colors"
                    >
                      Contact Support
                      <svg
                        className="ml-1.5 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 mb-6">You have successfully registered for the event. Redirecting to home page...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Register;