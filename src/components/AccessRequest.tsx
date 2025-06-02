import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Plus, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccessRequestProps {
  onComplete: () => void;
}

const ChildConsentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
}> = ({ isOpen, onClose, onApprove }) => {
  const [childDOB, setChildDOB] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAttempted, setHasAttempted] = useState(false);

  const validateDOB = () => {
    if (!childDOB) {
      return 'Date of birth is required';
    }
    
    // For demo purposes, we'll simulate a mismatch on first attempt
    // and success on subsequent attempts
    if (!hasAttempted) {
      setHasAttempted(true);
      return 'Date of birth does not match our records';
    }
    
    return null;
  };

  const handleConsent = () => {
    const newErrors: Record<string, string> = {};
    const dobError = validateDOB();
    
    if (dobError) {
      newErrors.dob = dobError;
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onApprove();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-white rounded-lg p-6 max-w-lg w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Confirm Child Account Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Child Information</h4>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> John Doe
            </p>
          </div>
          
          <div>
            <label htmlFor="childDOB" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Child's Date of Birth
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
            Confirm Child Account
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const InvitePlayerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, birthday: string) => void;
}> = ({ isOpen, onClose, onInvite }) => {
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!birthday) {
      newErrors.birthday = 'Birthday is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onInvite(email, birthday);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-white rounded-lg p-6 max-w-lg w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Invite New Player</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter player's email address"
            />
            {errors.email && (
              <div className="mt-2 flex items-start gap-2 text-red-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">{errors.email}</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.birthday ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.birthday && (
              <div className="mt-2 flex items-start gap-2 text-red-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">{errors.birthday}</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              An invitation will be sent to the provided email address. The player will need to accept the invitation and complete their profile setup.
            </p>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="h-4 w-4" />
            Send Invitation
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

const AccessRequest: React.FC<AccessRequestProps> = ({ onComplete }) => {
  const { isFromApp, user } = useAppContext();
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'pending' | 'approved'>('pending');
  const [isAccountOwnerAdded, setIsAccountOwnerAdded] = useState(false);
  const [invitedPlayers, setInvitedPlayers] = useState<Array<{ email: string; status: 'pending' | 'accepted' }>>([]);

  const MAX_PLAYERS = 3;
  const totalPlayers = invitedPlayers.length + (isAccountOwnerAdded ? 1 : 0) + (requestStatus === 'approved' ? 1 : 0);
  const canAddMorePlayers = totalPlayers < MAX_PLAYERS;

  const handleApprove = () => {
    setShowConsentModal(false);
    setRequestStatus('approved');
  };

  const handleInvite = (email: string, birthday: string) => {
    setInvitedPlayers([...invitedPlayers, { email, status: 'pending' }]);
    setShowInviteModal(false);
  };

  const handleCancelInvite = (index: number) => {
    setInvitedPlayers(invitedPlayers.filter((_, i) => i !== index));
  };

  if (!isFromApp) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Access Request</h2>
        <p className="text-gray-600 mb-4">
          No pending access requests. You can manage device access from your dashboard after setup is complete.
        </p>
        <button
          onClick={onComplete}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Access Request</h2>
      
      <div className="space-y-4">
        {/* Player Slots Counter */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-800">Player Slots</h3>
            <span className="text-sm text-gray-600">
              {totalPlayers}/{MAX_PLAYERS} slots filled
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(totalPlayers / MAX_PLAYERS) * 100}%` }}
            />
          </div>
        </div>

        {/* Player Management Note */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            You can manage players and their access permissions at any time through your account settings.
          </p>
        </div>

        {/* Pending Access Request Card */}
        <div className="mb-64">
          <h3 className="font-medium text-gray-800 mb-2">Pending Access Request</h3>
          <div className={`p-4 rounded-lg border ${
            requestStatus === 'approved' 
              ? 'bg-green-50 border-green-100' 
              : 'bg-yellow-50 border-yellow-100'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-800 font-medium">John Doe</p>
                <p className="text-xs text-gray-600">
                  {requestStatus === 'approved' 
                    ? 'Access granted to device' 
                    : 'Requesting access to device'}
                </p>
              </div>
              {requestStatus === 'pending' ? (
                <button
                  onClick={() => setShowConsentModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Review & Grant Access
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Approved</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Additional Player Card */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Add Additional Player</h3>
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-800 font-medium">Add another player to this device</p>
                <p className="text-xs text-gray-600">
                  {canAddMorePlayers 
                    ? 'Grant access to additional players who will use this device'
                    : 'Maximum number of players reached'}
                </p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                disabled={!canAddMorePlayers}
                className={`px-4 py-2 text-sm font-medium rounded-lg border flex items-center gap-2 transition-colors ${
                  canAddMorePlayers
                    ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                    : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                }`}
              >
                <Plus className="h-4 w-4" />
                Add Player
              </button>
            </div>
          </div>

          {/* Invited Players List */}
          {invitedPlayers.length > 0 && (
            <div className="mt-4 space-y-2">
              {invitedPlayers.map((player, index) => (
                <div key={index} className="p-3 rounded-lg border border-gray-200 bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-800 font-medium">{player.email}</p>
                      <p className="text-xs text-gray-600">
                        {player.status === 'pending' ? 'Invitation sent' : 'Access granted'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {player.status === 'pending' && (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-xs">Pending</span>
                        </div>
                      )}
                      <button
                        onClick={() => handleCancelInvite(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Owner Checkbox */}
        <div className="mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="addAccountOwner"
              checked={isAccountOwnerAdded}
              onChange={(e) => setIsAccountOwnerAdded(e.target.checked)}
              className="h-4 w-4 text-blue-600 mt-1 rounded border-gray-300"
            />
            <label htmlFor="addAccountOwner" className="ml-2 block text-sm text-gray-700">
              Add myself as a player
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onComplete}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>

      <ChildConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onApprove={handleApprove}
      />

      <InvitePlayerModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInvite}
      />
    </div>
  );
};

export default AccessRequest; 