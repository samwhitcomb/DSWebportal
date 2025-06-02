import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ActivationSummary: React.FC = () => {
  const { device, user } = useAppContext();

  // This would typically come from your state management
  const associatedUsers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      status: 'approved',
      type: 'initial'
    },
    {
      name: user?.email || 'Account Owner',
      email: user?.email || '',
      status: 'approved',
      type: 'owner'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'pending',
      type: 'invited'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Device Successfully Bound</h2>
        <p className="text-gray-600">
          Your Rapsodo MLMDS device has been successfully set up and is ready to use.
        </p>
      </div>

      {/* Device Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Device Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Device ID</p>
              <p className="font-medium text-gray-800">{device.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Model</p>
              <p className="font-medium text-gray-800">{device.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Users */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Associated Users</h3>
        <div className="space-y-3">
          {associatedUsers.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                user.status === 'approved' 
                  ? 'bg-green-50 border-green-100' 
                  : 'bg-yellow-50 border-yellow-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {user.type === 'initial' ? 'Initial Request' : 
                     user.type === 'owner' ? 'Account Owner' : 
                     'Invited Player'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {user.status === 'approved' ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Approved</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-600">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Next Steps</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-blue-700">
            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Return to the Rapsodo app to continue setting up your device</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-blue-700">
            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Complete the device calibration and initial setup in the app</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-blue-700">
            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Start your first training session with your new device</span>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <motion.button
          onClick={() => window.location.href = 'rapsodo://'}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Return to App
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default ActivationSummary;