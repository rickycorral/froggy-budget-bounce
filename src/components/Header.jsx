import React from 'react';
import logo from '../../src/rarare1.png';
import { motion } from 'framer-motion';

export const Header = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <motion.header 
      className="relative bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white p-2 rounded-lg mb-4 flex items-center shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="w-16 flex-shrink-0">
        {/* Placeholder for layout balance */}
      </motion.div>
      <motion.h1 
        className="text-2xl font-bold text-center flex-grow"
        whileHover={{ scale: 1.1 }}
      >
        RanaRe
      </motion.h1>
      <motion.div 
        className="w-16 flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img 
          src={logo}
          alt="RanaRe Logo" 
          className="h-16 w-auto cursor-pointer" 
          onClick={handleLogoClick}
        />
      </motion.div>
    </motion.header>
  );
};