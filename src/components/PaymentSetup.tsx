import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Shield, Info, AlertTriangle, X, Database, Award, Gamepad, Dumbbell, Users } from 'lucide-react';

interface PaymentSetupProps {
  onComplete: () => void;
}

const PaymentSetup: React.FC<PaymentSetupProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: '',
    autoRenew: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showWarning, setShowWarning] = useState(false);
  
  const subscriptionBenefits = [
    {
      icon: Database,
      title: 'Unlimited Shot Storage',
      description: 'Store all training data'
    },
    {
      icon: Award,
      title: 'Advanced Metrics',
      description: 'Detailed performance analytics'
    },
    {
      icon: Gamepad,
      title: 'Training Games',
      description: 'Interactive challenges'
    },
    {
      icon: Dumbbell,
      title: 'Practice Mode',
      description: 'Unlimited practice sessions'
    },
    {
      icon: Users,
      title: 'Multi-Player Support',
      description: 'Up to 3 players'
    },
    {
      icon: Shield,
      title: 'Premium Support',
      description: 'Priority customer service'
    }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < digits.length; i += 4) {
      formatted += digits.slice(i, i + 4) + ' ';
    }
    return formatted.trim();
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formatted,
    });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.cardName) {
      newErrors.cardName = 'Name on card is required';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Must be in MM/YY format';
    }
    
    if (!formData.cvc) {
      newErrors.cvc = 'CVC is required';
    } else if (formData.cvc.length < 3) {
      newErrors.cvc = 'CVC must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (!formData.autoRenew) {
        setShowWarning(true);
      } else {
        onComplete();
      }
    }
  };
  
  return (
    <>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Payment Information</h3>
        </div>

        {/* Subscription Benefits */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Subscription Benefits</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subscriptionBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-gray-200 bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <benefit.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mb-4 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
          <div className="shrink-0">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 text-sm">Free 1-Month Trial</h4>
            <p className="text-sm text-blue-700">
              You won't be charged during your free trial. After the trial ends, you will be required to pay $199/year to continue using the service.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                placeholder="John Smith"
                value={formData.cardName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cardName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardName && (
                <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  maxLength={5}
                  className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="XXX"
                  value={formData.cvc}
                  onChange={handleChange}
                  maxLength={4}
                  className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.cvc ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cvc && (
                  <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                id="autoRenew"
                name="autoRenew"
                checked={formData.autoRenew}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 mt-1 rounded border-gray-300"
              />
              <label htmlFor="autoRenew" className="ml-2 block text-sm text-gray-700">
                Automatically renew my subscription after the free trial ($79.99/year)
              </label>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <Shield className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free Trial
            </motion.button>
            
            <p className="text-xs text-center text-gray-500 mt-2">
              By proceeding, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showWarning && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWarning(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                onClick={() => setShowWarning(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 text-amber-600 mb-4">
                <div className="shrink-0 bg-amber-100 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Auto-Renewal Disabled</h3>
              </div>

              <p className="text-gray-600 mb-4">
                Without auto-renewal, your service will end after the trial period. You'll need to manually renew your subscription to continue using the service. This may result in service interruption.
              </p>

              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800">
                  To ensure uninterrupted service, we recommend enabling auto-renewal. You can cancel anytime during the trial period.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, autoRenew: true }));
                    setShowWarning(false);
                  }}
                  className="flex-1 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enable Auto-Renewal
                </button>
                <button
                  onClick={() => {
                    setShowWarning(false);
                    onComplete();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Without
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PaymentSetup;