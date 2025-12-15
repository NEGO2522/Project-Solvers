import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSignOutAlt, FaCalendarAlt, FaMapMarkerAlt, FaUserCircle, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Profile = () => {
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    phone: '',
    photoURL: '',
    bio: 'Event enthusiast and tech lover',
  });
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Tech Conference 2023',
      date: '2023-12-20',
      time: '09:00 AM',
      location: 'Convention Center, City',
    },
    {
      id: 2,
      title: 'Music Festival',
      date: '2024-01-15',
      time: '06:00 PM',
      location: 'Downtown Park',
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const auth = getAuth();
  const storage = getStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Get user data from auth
          setUserData({
            displayName: user.displayName || '',
            email: user.email || '',
            phone: user.phoneNumber || '',
            photoURL: user.photoURL || 'https://via.placeholder.com/150',
            bio: user.bio || 'Event enthusiast and tech lover',
          });

          // Try to get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(prev => ({
              ...prev,
              ...userDoc.data(),
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update auth profile
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      // Update Firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        photoURL: downloadURL,
      }, { merge: true });

      setUserData(prev => ({
        ...prev,
        photoURL: downloadURL,
      }));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      
      // Update auth profile
      await updateProfile(user, {
        displayName: userData.displayName,
      });

      // Update Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: userData.displayName,
        phone: userData.phone,
        bio: userData.bio,
      }, { merge: true });

      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c2b490]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#c2b490] to-[#a08f6a] p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-[#f0e8d8] flex items-center justify-center border-4 border-white shadow-lg">
                  <FaUserCircle className="h-24 w-24 text-[#c2b490]" />
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-8 text-center sm:text-left">
                <h1 className="text-2xl font-bold">
                  {isEditing ? (
                    <input
                      type="text"
                      name="displayName"
                      value={userData.displayName}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-white focus:outline-none focus:border-white"
                    />
                  ) : (
                    userData.displayName || 'User'
                  )}
                </h1>
                <p className="text-white/90 mt-1">
                  <FaEnvelope className="inline mr-2" />
                  {userData.email}
                </p>
                <p className="text-white/90 mt-1">
                  <FaPhone className="inline mr-2" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-white focus:outline-none focus:border-white w-40"
                      placeholder="Add phone number"
                    />
                  ) : (
                    userData.phone || 'No phone number'
                  )}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="bg-white text-[#c2b490] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium flex items-center transition"
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Bio Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2b490]"
                  rows="3"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600">{userData.bio}</p>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Registered Events</h2>
              {upcomingEvents.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {upcomingEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
                    >
                      <h3 className="font-medium text-lg text-gray-800">{event.title}</h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-[#c2b490]" />
                          {event.date} • {event.time}
                        </p>
                        <p className="flex items-center mt-1">
                          <FaMapMarkerAlt className="mr-2 text-[#c2b490]" />
                          {event.location}
                        </p>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="text-sm text-[#c2b490] hover:underline flex items-center">
                          View Details <FaArrowRight className="ml-1" size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No upcoming events. Start exploring events to join!</p>
                  <button
                    onClick={() => navigate('/home')}
                    className="mt-4 bg-[#c2b490] text-white px-4 py-2 rounded-lg hover:bg-[#a08f6a] transition"
                  >
                    Browse Events
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;