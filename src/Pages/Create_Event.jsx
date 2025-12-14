import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: 'physical', // 'physical' or 'virtual'
    category: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    timezone: 'Asia/Kolkata',
    location: '',
    virtualLink: '',
    capacity: '',
    image: null,
    imagePreview: '',
    ticketTypes: [
      { name: 'General Admission', price: '', quantity: '', description: '' }
    ],
    isFree: false,
    paymentOptions: ['credit_card', 'paypal'],
    termsAgreed: false
  });

  const categories = [
    'Music', 'Sports', 'Technology', 'Business', 'Food & Drink', 
    'Arts', 'Fashion', 'Health', 'Education', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTicketTypeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTicketTypes = [...formData.ticketTypes];
    updatedTicketTypes[index] = {
      ...updatedTicketTypes[index],
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value
    };
    
    setFormData(prev => ({
      ...prev,
      ticketTypes: updatedTicketTypes
    }));
  };

  const addTicketType = () => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        { name: '', price: '', quantity: '', description: '' }
      ]
    }));
  };

  const removeTicketType = (index) => {
    if (formData.ticketTypes.length > 1) {
      const updatedTicketTypes = formData.ticketTypes.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ticketTypes: updatedTicketTypes
      }));
    }
  };

  const handlePaymentOptionChange = (option) => {
    setFormData(prev => {
      const paymentOptions = [...prev.paymentOptions];
      const optionIndex = paymentOptions.indexOf(option);
      
      if (optionIndex === -1) {
        paymentOptions.push(option);
      } else {
        paymentOptions.splice(optionIndex, 1);
      }
      
      return {
        ...prev,
        paymentOptions
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Navigate to event preview or dashboard after submission
    // navigate('/organizer');
    alert('Event created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Event</h1>
          <p className="text-gray-600">Fill in the details below to create your event</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">Event Information</h2>
              <p className="text-sm text-gray-500 mt-1">Basic details about your event</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="col-span-2">
                  <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Event Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="eventName"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                      placeholder="Enter event name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] bg-white transition duration-150 ease-in-out"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] bg-white transition duration-150 ease-in-out"
                    >
                      <option value="physical">In-Person Event</option>
                      <option value="virtual">Online Event</option>
                      <option value="hybrid">Hybrid (In-Person & Online)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Event Description <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                      placeholder="Tell attendees what your event is about, what they'll learn, and what makes it special..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1.5">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                      required
                    />
                  </div>
                </div>

                {formData.eventType !== 'virtual' && (
                  <div className="col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                        placeholder="Venue name, address, city, etc."
                        required={formData.eventType !== 'virtual'}
                      />
                    </div>
                  </div>
                )}

                {formData.eventType !== 'physical' && (
                  <div className="col-span-2">
                    <label htmlFor="virtualLink" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Virtual Event Link <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        id="virtualLink"
                        name="virtualLink"
                        value={formData.virtualLink}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                        placeholder="https://"
                        required={formData.eventType === 'virtual'}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">Event Image</h2>
              <p className="text-sm text-gray-500 mt-1">Upload an image to represent your event</p>
            </div>
            <div className="p-6">
              <div className="mt-1 flex items-center">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Image <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {formData.imagePreview ? (
                        <div className="relative">
                          <img src={formData.imagePreview} alt="Event preview" className="mx-auto h-48 w-full object-cover rounded-md" />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-[#c2b490] hover:text-[#a08f6a] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#c2b490]"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleInputChange}
                                accept="image/*"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Types Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Tickets & Pricing</h2>
                  <p className="text-sm text-gray-500 mt-1">Set up ticket types and pricing for your event</p>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={addTicketType}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[#c2b490] hover:bg-[#a08f6a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490]"
                  >
                    <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Ticket Type
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {formData.ticketTypes.map((ticket, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ticket Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={ticket.name}
                        onChange={(e) => handleTicketTypeChange(index, e)}
                        className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                        placeholder="E.g., General Admission, VIP, Early Bird"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {formData.isFree ? 'Donation Amount' : 'Price'}
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            value={ticket.price}
                            onChange={(e) => handleTicketTypeChange(index, e)}
                            className="focus:ring-[#c2b490] focus:border-[#c2b490] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            disabled={formData.isFree}
                            required={!formData.isFree}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity <span className="text-red-500">*</span></label>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={ticket.quantity}
                          onChange={(e) => handleTicketTypeChange(index, e)}
                          className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                          placeholder="100"
                          required
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        rows={2}
                        value={ticket.description}
                        onChange={(e) => handleTicketTypeChange(index, e)}
                        className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c2b490] focus:border-[#c2b490] transition duration-150 ease-in-out"
                        placeholder="What's included in this ticket?"
                      />
                    </div>
                  </div>

                  {formData.ticketTypes.length > 1 && (
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeTicketType(index)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Ticket Type
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Options Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">Payment Options</h2>
              <p className="text-sm text-gray-500 mt-1">Select payment methods you want to accept</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="credit_card"
                    name="credit_card"
                    type="checkbox"
                    checked={formData.paymentOptions.includes('credit_card')}
                    onChange={() => handlePaymentOptionChange('credit_card')}
                    className="h-4 w-4 text-[#c2b490] focus:ring-[#c2b490] border-gray-300 rounded"
                  />
                  <label htmlFor="credit_card" className="ml-2 block text-sm text-gray-700">
                    Credit/Debit Card
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paypal"
                    type="checkbox"
                    checked={formData.paymentOptions.includes('paypal')}
                    onChange={() => handlePaymentOptionChange('paypal')}
                    className="h-4 w-4 text-[#c2b490] focus:ring-[#c2b490] border-gray-300 rounded"
                  />
                  <label htmlFor="paypal" className="ml-2 block text-sm text-gray-700">
                    PayPal
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="bank_transfer"
                    name="bank_transfer"
                    type="checkbox"
                    checked={formData.paymentOptions.includes('bank_transfer')}
                    onChange={() => handlePaymentOptionChange('bank_transfer')}
                    className="h-4 w-4 text-[#c2b490] focus:ring-[#c2b490] border-gray-300 rounded"
                  />
                  <label htmlFor="bank_transfer" className="ml-2 block text-sm text-gray-700">
                    Bank Transfer
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Submit Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="terms"
                    name="termsAgreed"
                    type="checkbox"
                    checked={formData.termsAgreed}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-[#c2b490] focus:ring-2 focus:ring-[#c2b490] border-gray-300 rounded transition duration-150 ease-in-out"
                    required
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="terms" className="text-sm font-medium text-gray-700">
                    I agree to the <a href="#" className="text-[#c2b490] hover:text-[#a08f6a] hover:underline">Terms of Service</a> and <a href="#" className="text-[#c2b490] hover:text-[#a08f6a] hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490] transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#c2b490] to-[#a08f6a] hover:from-[#a08f6a] hover:to-[#8a7c5d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c2b490] transition duration-150 ease-in-out transform hover:scale-[1.02]"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;