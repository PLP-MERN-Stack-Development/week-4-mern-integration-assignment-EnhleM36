import { useState, useEffect } from 'react';
import { useBlog } from '../context/blogContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const { state, getUserProfile } = useBlog();
  const { userInfo, loading, error } = state;
  
  useEffect(() => {
    if (!userInfo) {
      getUserProfile();
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, getUserProfile]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Update profile logic
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
      
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      
      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Leave blank to keep current password"
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Leave blank to keep current password"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;