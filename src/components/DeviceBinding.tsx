import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeviceBindingProps {
  onComplete: () => void;
}

const DeviceBinding: React.FC<DeviceBindingProps> = ({ onComplete }) => {
  const { device } = useAppContext();
  const [confirmBinding, setConfirmBinding] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Device Assignment</h2>
      </div>

      {/* Device Information with Verification */}
      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {/* Device Information */}
          <div className="mb-6">
            <div className="flex items-baseline gap-4">
              <div>
                <span className="text-sm text-gray-600">Device ID: </span>
                <span className="font-medium text-gray-800 text-lg">{device.id}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Model: </span>
                <span className="font-medium text-gray-800 text-lg">MLMDS</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Verify this ID matches your device's LCD screen</p>
          </div>

          {/* Device Image */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="aspect-[2/1] w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-500">Device Image</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Box */}
      <div className="mb-6">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 p-1.5 bg-amber-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="confirmBinding"
                  checked={confirmBinding}
                  onChange={(e) => setConfirmBinding(e.target.checked)}
                  className="h-5 w-5 text-blue-600 mt-1 rounded border-gray-300"
                />
                <label htmlFor="confirmBinding" className="ml-3 block text-sm text-gray-700">
                  I confirm that I have verified the device ID and understand that this binding process is permanent and cannot be undone. I am the legal owner of this device and have the right to bind it to my account.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        onClick={onComplete}
        disabled={!confirmBinding}
        className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
          confirmBinding
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        whileHover={confirmBinding ? { scale: 1.02 } : {}}
        whileTap={confirmBinding ? { scale: 0.98 } : {}}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default DeviceBinding;