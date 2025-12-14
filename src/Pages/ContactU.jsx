import { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaUser, FaComment, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaClock, FaArrowLeft, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

// Ensure CSSPlugin is registered
gsap.registerPlugin(CSSPlugin);
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const leftBgRef = useRef(null);
  const rightBgRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormData({ name: '', email: '', message: '' });
      setSuccess('Your message has been sent successfully!');
      setTimeout(() => setSuccess(''), 5000);
      
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create bubble elements
  useEffect(() => {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    // Clear existing bubbles
    container.innerHTML = '';
    
    // Create bubbles
    const bubbleCount = 12; // Reduced number for better performance
    const bubbles = [];
    
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      const size = Math.random() * 80 + 40; // 40-120px
      const startX = Math.random() * 100; // 0-100% of container width
      const endX = startX + (Math.random() * 40 - 20); // Slight horizontal movement
      const duration = Math.random() * 15 + 10; // 10-25s
      const delay = Math.random() * -5; // Stagger start times
      
      // Golden color with transparency
      const colors = [
        'rgba(234, 218, 184, 0.25)',  // Light gold
        'rgba(218, 198, 150, 0.3)',   // Medium gold
        'rgba(194, 180, 144, 0.25)'   // Darker gold
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Set initial styles
      Object.assign(bubble.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        background: randomColor,
        borderRadius: '50%',
        opacity: Math.random() * 0.2 + 0.1, // 10-30% opacity
        left: `${startX}%`,
        bottom: '-100px', // Start below the viewport
        filter: `blur(${size * 0.1}px)`,
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform, opacity'
      });
      
      container.appendChild(bubble);
      bubbles.push(bubble);
      
      // Animate each bubble individually
      gsap.to(bubble, {
        y: `-${window.innerHeight + 200}px`,
        x: `${endX}%`,
        duration: duration,
        delay: delay,
        ease: 'none',
        repeat: -1,
        onRepeat: () => {
          // Reset position when animation repeats
          gsap.set(bubble, {
            y: '100vh',
            x: `${startX + (Math.random() * 20 - 10)}%`,
            scale: 0.8 + Math.random() * 0.4
          });
        }
      });
      
      // Initial position
      gsap.set(bubble, {
        y: `${Math.random() * 100}%`,
        x: `${startX}%`,
        scale: 0.8 + Math.random() * 0.4
      });
    }
    
    return () => {
      container.innerHTML = '';
    };
  }, []);

  // GSAP Animations for background elements and card hovers
  useEffect(() => {
    gsap.registerPlugin();
    
    const setupAnimations = () => {
      if (!leftBgRef.current || !rightBgRef.current) return;
      
      gsap.killTweensOf([leftBgRef.current, rightBgRef.current]);
      gsap.set([leftBgRef.current, rightBgRef.current], { clearProps: 'all' });
      
      // Background animations - matching login/signup pages
      gsap.to(leftBgRef.current, {
        x: -30,
        y: -30,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        rotation: 5
      });
      
      gsap.to(rightBgRef.current, {
        x: 30,
        y: 30,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        rotation: -5
      });

      // Card hover animations
      const cards = document.querySelectorAll('.card-hover');
      cards.forEach(card => {
        // Initial state
        gsap.set(card, {
          y: 0,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          zIndex: 1
        });

        // Hover state
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 0.3,
            ease: 'power2.out',
            zIndex: 10
          });
        });

        // Mouse leave state
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            duration: 0.3,
            ease: 'power2.inOut',
            zIndex: 1
          });
        });
      });
    };

    const timer = setTimeout(setupAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f0] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div 
        ref={leftBgRef}
        className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-gradient-to-br from-[#c2b490] to-[#e8d9b5] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -ml-60 -mt-60"
      />
      <div 
        ref={rightBgRef}
        className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-tr from-[#e8d9b5] to-[#c2b490] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-60 -mb-60"
      />
      
      {/* Enhanced Bubble Animation Container */}
      <div className="bubble-container fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Form */}
        <div className="card-hover bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-10 border border-[#e8e0d0] transition-all duration-300">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
            <p className="text-gray-600">Have questions or feedback? We'd love to hear from you!</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    {success}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-[#c2b490] transition-colors" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c2b490] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                  placeholder="Your Name"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-[#c2b490] transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c2b490] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                  placeholder="Your Email"
                />
              </div>

              <div className="relative group">
                <div className="absolute top-3 left-4">
                  <FaComment className="h-5 w-5 text-gray-400 group-focus-within:text-[#c2b490] transition-colors" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c2b490] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 resize-none"
                  placeholder="Your Message..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#c2b490] hover:bg-[#a89a7d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Info */}
        <div className="card-hover bg-white/95 rounded-2xl p-8 sm:p-10 border border-[#e8e0d0] shadow-xl transition-all duration-300">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
            <p className="text-gray-600">We're here to help and answer any questions you might have.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#c2b490] shadow-sm border border-[#e8e0d0]">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Our Location</h3>
                <p className="text-gray-600 text-sm mt-1">123 Solver Street<br />San Francisco, CA 94103</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#c2b490] shadow-sm border border-[#e8e0d0]">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email Us</h3>
                <a href="mailto:support@solverapp.com" className="text-[#c2b490] hover:underline text-sm mt-1 inline-block">support@solverapp.com</a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#c2b490] shadow-sm border border-[#e8e0d0]">
                <FaPhone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Call Us</h3>
                <a href="tel:+11234567890" className="text-gray-600 hover:text-[#c2b490] transition-colors text-sm mt-1 inline-block">+1 (123) 456-7890</a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#c2b490] shadow-sm border border-[#e8e0d0]">
                <FaClock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Working Hours</h3>
                <p className="text-gray-600 text-sm mt-1">Monday - Friday<br />9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#e8e0d0]">
            <h3 className="text-sm font-medium text-gray-800 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#e8e0d0] flex items-center justify-center text-[#0077b5] hover:bg-[#f3f8fb] hover:shadow-sm transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#e8e0d0] flex items-center justify-center text-gray-800 hover:bg-gray-50 hover:shadow-sm transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#e8e0d0] flex items-center justify-center text-[#e1306c] hover:bg-[#fdf2f6] hover:shadow-sm transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;