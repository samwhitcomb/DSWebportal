import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Plus, AlertCircle } from 'lucide-react';

interface ChildAccountFormProps {
  onComplete: () => void;
}

const ChildAccountForm: React.FC<ChildAccountFormProps> = ({ onComplete }) => {
  const { user, setUser, isFromApp } = useAppContext();
  const [childName, setChildName] = useState(user?.children[0]?.name || '');
  const [childDOB, setChildDOB] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAttempted, setHasAttempted] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!childName) {
      newErrors.name = 'Child name is required';
    }
    
    if (!childDOB) {
      newErrors.dob = 'Date of birth is required';
    } else if (!hasAttempted && isFromApp) {
      setHasAttempted(true);
      newErrors.dob = 'Date of birth does not match the users entered date of birth';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConsent = () => {
    if (!user) return;
    
    if (validateForm()) {
      // Update user with child information
      setUser({
        ...user,
        children: [{
          name: childName,
          age: calculateAge(childDOB)
        }]
      });
      onComplete();
    }
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  if (!user) return null;
  
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">Child Account Details</h3>
      
      <div className="space-y-4">
        {isFromApp ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Child Information from App</h4>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {user.children[0]?.name}
            </p>
          </div>
        ) : (
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
              Child's Name
            </label>
            <input
              type="text"
              id="childName"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <div className="mt-2 flex items-start gap-2 text-red-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">{errors.name}</p>
              </div>
            )}
          </div>
        )}
        
        <div>
          <label htmlFor="childDOB" className="block text-sm font-medium text-gray-700 mb-1">
            {isFromApp ? 'Confirm Child\'s Date of Birth' : 'Child\'s Date of Birth'}
          </label>
          <input
            type="date"
            id="childDOB"
            value={childDOB}
            onChange={(e) => setChildDOB(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dob ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dob && (
            <div className="mt-2 flex items-start gap-2 text-red-600">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{errors.dob}</p>
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Parental Consent</h4>
          <p className="text-sm text-blue-700 mb-3">
            As a parent or legal guardian, I give consent for my child to use Rapsodo MLMDS and for the collection and processing of their performance data.
          </p>
          
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className={`h-4 w-4 text-blue-600 mt-1 rounded ${
                errors.terms ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-blue-700">
              I confirm I am the parent/guardian and consent to my child using Rapsodo MLMDS
            </label>
          </div>
          
          {errors.terms && (
            <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
          )}
        </div>
        
        <motion.button
          onClick={handleConsent}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4" />
          {isFromApp ? 'Confirm Child Account' : 'Create Child Account'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChildAccountForm;