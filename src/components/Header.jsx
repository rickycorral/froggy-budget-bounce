import React from 'react';
import logo from '../../src/rarare1.png';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const Header = ({ toggleTheme, isDarkMode }) => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <motion.header 
      className="relative bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white p-3 rounded-lg mb-4 flex justify-between items-center shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-2xl font-bold text-center flex-grow"
        whileHover={{ scale: 1.1 }}
      >
        RanaRe
      </motion.h1>
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white text-gray-800"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img 
            src={logo}
            alt="RanaRe Logo" 
            className="h-10 w-auto cursor-pointer" 
            onClick={handleLogoClick}
          />
        </motion.div>
      </div>
    </motion.header>
  );
};