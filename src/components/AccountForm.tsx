import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

interface AccountFormProps {
  onComplete: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ onComplete }) => {
  const { setUser, isFromApp } = useAppContext();
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!isSignIn && formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!isSignIn && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!isSignIn) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setUser({
        isParent: true,
        name: isSignIn ? '' : `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        hasVerifiedEmail: isSignIn ? true : false,
        children: isFromApp ? [{
          name: 'John Doe', // This would be pre-populated from the app
          age: 12 // This would be pre-populated from the app
        }] : [],
      });
      
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Parent/Guardian Account</h2>
          <p className="text-gray-600 mb-4">
            {isSignIn 
              ? 'Sign in to manage your child\'s Rapsodo MLMDS device and subscription.'
              : 'Create an account to manage your child\'s Rapsodo MLMDS device and subscription.'}
          </p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isSignIn 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                !isSignIn 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {isFromApp && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-blue-800 mb-2">Connected Child Account</h3>
            <p className="text-sm text-blue-700">
              John Doe • Age 12<br />
              <span className="text-blue-600">This information was imported from the app</span>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isSignIn && (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            {!isSignIn && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            )}
            
            <div className="pt-2">
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSignIn ? 'Sign In' : 'Create Account'}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AccountForm;