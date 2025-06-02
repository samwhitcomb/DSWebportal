import React from 'react';
import { motion } from 'framer-motion';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress bar background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-gray-200 rounded-full"></div>
        
        {/* Progress bar fill */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        ></motion.div>
        
        {/* Step circles */}
        {steps.map((step, index) => (
          <div key={index} className="z-10 flex flex-col items-center">
            <motion.div 
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index < currentStep ? 'bg-blue-600 text-white' : 
                index === currentStep ? 'bg-white border-2 border-blue-600 text-blue-600' : 
                'bg-white border border-gray-300 text-gray-400'
              }`}
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: index === currentStep ? 1.1 : 1,
                backgroundColor: index < currentStep ? '#2563EB' : (index === currentStep ? '#ffffff' : '#ffffff')
              }}
              transition={{ duration: 0.3 }}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4\" viewBox="0 0 24 24\" fill="none">
                  <path d="M5 14L8.5 17.5L19 7\" stroke="currentColor\" strokeWidth="3\" strokeLinecap="round\" strokeLinejoin="round"/>
                </svg>
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </motion.div>
            <span className={`mt-2 text-xs ${
              index < currentStep ? 'text-blue-600 font-medium' : 
              index === currentStep ? 'text-blue-600 font-medium' : 
              'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;