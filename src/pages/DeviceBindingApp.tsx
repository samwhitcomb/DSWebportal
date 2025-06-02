import React from 'react';
import { motion } from 'framer-motion';
import DeviceSetup from '../components/DeviceSetup';
import dsLogo from '../../Assets/Logos/DS LOGO.svg';

const DeviceBindingApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div 
        className="flex flex-col items-center justify-center max-w-4xl mx-auto py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-8">
          <img src={dsLogo} alt="DS Logo" className="h-8 filter brightness-0" />
        </div>
        
        <div className="w-full max-w-md">
          <DeviceSetup />
        </div>
      </motion.div>
    </div>
  );
};

export default DeviceBindingApp