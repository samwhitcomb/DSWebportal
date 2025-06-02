import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Baseline as Baseball } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const DeviceSetup: React.FC = () => {
  const { device, isFromApp, setIsFromApp } = useAppContext();
  const navigate = useNavigate();

  return (
    <motion.div 
      className="w-full max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Device Setup</h2>
            <p className="opacity-90">Complete setup to start using your device</p>
          </div>
          <div className="bg-white p-3 rounded-full">
            <Baseball className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Rapsodo Cloud</h3>
          <p className="text-gray-600">
            Thank you for choosing Rapsodo for your baseball training journey! Here you will be able to manage billing and assign and manage your associated users and device.
          </p>
        </div>

        {/* Prototype Toggle */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="fromApp"
            checked={isFromApp}
            onChange={(e) => setIsFromApp(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="fromApp" className="text-sm text-gray-600">
            Simulate access from app
          </label>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800">To complete setup:</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                <span className="text-sm">Create or log in to your billing account</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                <span className="text-sm">Add payment information to activate your free trial</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                <span className="text-sm">Manage device access</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-800">Free Trial Benefits:</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>✓ Full access to all features for 1 month</li>
              <li>✓ Unlimited practice sessions</li>
              <li>✓ Performance analytics and insights</li>
              <li>✓ Access to all game modes</li>
              <li>✓ No charges during trial period</li>
            </ul>
          </div>
        </div>
        
        <motion.button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          onClick={() => navigate('/cloud-portal')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to Cloud Portal
        </motion.button>
        
        <p className="mt-4 text-xs text-center text-gray-500">
          Parent or guardian setup required for users under 18
        </p>
      </div>
    </motion.div>
  );
};

export default DeviceSetup;