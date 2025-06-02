import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PortalHeader from '../components/PortalHeader';
import ProgressSteps from '../components/ProgressSteps';
import AccountForm from '../components/AccountForm';
import EmailVerification from '../components/EmailVerification';
import PaymentSetup from '../components/PaymentSetup';
import DeviceBinding from '../components/DeviceBinding';
import ActivationSummary from '../components/ActivationSummary';
import AccessRequest from '../components/AccessRequest';
import { useAppContext } from '../context/AppContext';

const CloudPortal: React.FC = () => {
  const { currentStep, setCurrentStep, device, isFromApp, user, setUser } = useAppContext();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const steps = [
    'Account',
    'Payment',
    'Device Assignment',
    'Access Request',
    'Complete',
  ];
  
  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    
    // Skip email verification if user has already verified their email
    if (nextStep === 2 && user?.hasVerifiedEmail) {
      setCurrentStep(nextStep + 1);
      navigate(`/cloud-portal/step-${nextStep + 1}`);
    } else {
      setCurrentStep(nextStep);
      navigate(`/cloud-portal/step-${nextStep}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      navigate(`/cloud-portal/step-${currentStep - 1}`);
    } else {
      navigate('/');
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!isSignIn && formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!isSignIn) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setUser({
        isParent: true,
        name: isSignIn ? '' : `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        hasVerifiedEmail: isSignIn ? true : false,
        children: isFromApp ? [{
          name: 'John Doe',
          age: 12
        }] : [],
      });
      
      if (isSignIn) {
        setCurrentStep(2); // Skip to payment step
        navigate('/cloud-portal/step-2');
      } else {
        setCurrentStep(1);
        navigate('/cloud-portal/step-1');
      }
    }
  };

  // Show back button on all steps except landing page and completion
  const showBackButton = window.location.pathname !== '/cloud-portal' && 
                        !window.location.pathname.endsWith('step-5');

  return (
    <div className="min-h-screen bg-gray-100">
      <PortalHeader 
        title="Rapsodo Cloud Portal" 
        subtitle={`Setting up ${device.name}`} 
      />
      
      <div className="max-w-2xl mx-auto py-6 px-4">
        {showBackButton && (
          <motion.button
            onClick={handleBack}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </motion.button>
        )}

        <div className="mb-6">
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>
        
        <div className="mb-8">
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Rapsodo Cloud</h2>
                    <p className="text-gray-600 mb-4">
                      Thank you for choosing Rapsodo for your baseball training journey! To get started, we need to set up your billing account and link your device.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-blue-800 mb-2">Binding Request</h3>
                      <p className="text-sm text-blue-700 mb-3">
                        We've received a request to bind the following device to a billing account:
                      </p>
                      <div className="bg-white p-3 rounded border border-blue-100">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-800">Device Information</p>
                            <p className="text-sm text-gray-600">
                              {isFromApp ? (
                                <>
                                  Device ID: {device.id}<br />
                                  Model: {device.name}
                                </>
                              ) : (
                                "Please ensure you have the serial number of your device ready. You'll need this to complete the setup process."
                              )}
                            </p>
                          </div>
                          {isFromApp && (
                            <div>
                              <p className="font-medium text-gray-800">User Account</p>
                              <p className="text-sm text-gray-600">
                                John Doe<br />
                                <span className="text-blue-600">This information was imported from the app</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-6">
                        {isSignIn ? 'Sign In' : 'Create Account'}
                      </h3>

                      <form onSubmit={handleAuthSubmit} className="space-y-4">
                        {!isSignIn && (
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                              <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.confirmPassword && (
                              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                          </div>
                        )}

                        <motion.button
                          type="submit"
                          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSignIn ? 'Sign In' : 'Create Account'}
                        </motion.button>

                        <div className="text-center mt-4">
                          <p className="text-sm text-gray-600">
                            {isSignIn ? "Don't have an account? " : "Already have an account? "}
                            <button
                              type="button"
                              onClick={() => setIsSignIn(!isSignIn)}
                              className="text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              {isSignIn ? 'Sign up' : 'Sign in'}
                            </button>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/step-1" element={<AccountForm onComplete={handleNextStep} />} />
              <Route path="/step-2" element={<PaymentSetup onComplete={handleNextStep} />} />
              <Route path="/step-3" element={<DeviceBinding onComplete={handleNextStep} />} />
              <Route path="/step-4" element={<AccessRequest onComplete={handleNextStep} />} />
              <Route path="/step-5" element={<ActivationSummary />} />
            </Routes>
          </motion.div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
          </p>
        </div>
      </div>

      {/* Parental Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Parental Consent Required</h3>
            <p className="text-gray-600 mb-4">
              Please review and confirm your child's account details before granting access to the device.
            </p>
            <AccessRequest onComplete={() => setShowConsentModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudPortal;