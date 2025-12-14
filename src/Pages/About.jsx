const About = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About EventMasters</h1>
          <p className="text-lg text-gray-600">
            Your premier destination for discovering and managing events
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#c2b490] mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              EventMasters is dedicated to connecting people with amazing events. We strive to make event discovery 
              seamless, enjoyable, and accessible to everyone. Whether you're looking for concerts, workshops, 
              competitions, or networking events, we've got you covered.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#c2b490] mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#c2b490] mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Comprehensive event listings across multiple categories</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#c2b490] mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Advanced search and filtering options</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#c2b490] mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Personalized event recommendations</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#c2b490] mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Easy event management and tracking</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#c2b490] mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-[#c2b490] text-white rounded-lg hover:bg-[#a08f6a] transition-colors font-medium"
            >
              Get in Touch
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

