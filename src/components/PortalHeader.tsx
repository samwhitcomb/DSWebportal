import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import dsLogo from '../../Assets/Logos/DS LOGO.svg';

interface PortalHeaderProps {
  title: string;
  subtitle?: string;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <motion.header 
      className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center w-full">
        <button 
          onClick={handleLogoClick}
          className="hover:opacity-80 transition-opacity"
        >
          <img src={dsLogo} alt="DS Logo" className="h-8 filter brightness-0 invert ml-20" />
        </button>
      </div>
      <div className="text-right whitespace-nowrap">
        <h2 className="font-bold tracking-wider">Rapsodo Cloud Portal</h2>
        {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
      </div>
    </motion.header>
  );
};

export default PortalHeader;