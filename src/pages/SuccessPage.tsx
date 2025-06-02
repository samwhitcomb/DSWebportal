import React from 'react';
import { motion } from 'framer-motion';
import { Baseline as Baseball, ArrowRight, BarChart4, Layout, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SuccessPage: React.FC = () => {
  const { user, device } = useAppContext();
  
  if (!user || !device.isBound) return null;
  
  const selectedChild = user.children.length > 0 ? user.children[0].name : '';

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <Baseball className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">SwingTrack</h1>
              <p className="text-sm opacity-90">Baseball Launch Monitor</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-green-500 p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Setup Complete!</h2>
            <p>Your SwingTrack device is ready to use</p>
          </div>
          
          <div className="p-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-1">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Device Successfully Activated</h3>
                  <p className="text-sm text-green-700">
                    Your {device.name} is now linked to {selectedChild}'s account and ready to track batting metrics.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mb-4">What You Can Do Now:</h3>
            
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                  <Layout className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Practice Module</h4>
                <p className="text-sm text-gray-600">
                  Set up practice sessions with detailed metrics and feedback
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                  <Baseball className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Game Mode</h4>
                <p className="text-sm text-gray-600">
                  Fun challenges and games to improve batting skills
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                  <BarChart4 className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-1">Performance Analytics</h4>
                <p className="text-sm text-gray-600">
                  Track progress with detailed performance insights
                </p>
              </div>
            </div>
            
            <motion.button
              className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Using SwingTrack</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;