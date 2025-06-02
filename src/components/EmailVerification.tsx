import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface EmailVerificationProps {
  onComplete: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onComplete }) => {
  const { user, setUser } = useAppContext();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const handleVerifyEmail = () => {
    if (!user) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      
      // Update user context
      if (user) {
        setUser({
          ...user,
          hasVerifiedEmail: true,
        });
      }
      
      // Wait a moment before proceeding
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2000);
  };
  
  if (!user) return null;
  
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          {isVerified ? (
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          ) : (
            <Mail className="h-8 w-8 text-blue-600" />
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {isVerified ? 'Email Verified!' : 'Verify Your Email'}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {isVerified 
            ? `Thank you for verifying your email address.`
            : `We've sent a verification link to ${user.email}. Please check your inbox and verify your email to continue.`
          }
        </p>
        
        {!isVerified && (
          <>
            <div className="mb-6">
              <motion.button
                onClick={handleVerifyEmail}
                disabled={isVerifying}
                className={`w-full ${isVerifying ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-4 rounded-lg transition-colors`}
                whileHover={{ scale: isVerifying ? 1 : 1.02 }}
                whileTap={{ scale: isVerifying ? 1 : 0.98 }}
              >
                {isVerifying ? 'Verifying...' : 'Verify Email (Demo)'}
              </motion.button>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>
                Didn't receive the email? <a href="#" className="text-blue-600 hover:underline">Resend verification</a>
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default EmailVerification;