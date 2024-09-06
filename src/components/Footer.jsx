import React from 'react';
import { motion } from 'framer-motion';

const frogVariants = {
  jump: {
    y: [0, -20, 0],
    transition: {
      y: {
        duration: 0.6,
        yoyo: Infinity,
        ease: "easeOut"
      }
    }
  }
};

const heartVariants = {
  beat: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      yoyo: Infinity,
      ease: "easeInOut"
    }
  }
};

export const Footer = () => {
  return (
    <footer className="bg-green-100 p-4 mt-8 rounded-lg shadow-inner">
      <div className="flex justify-center items-center space-x-4">
        <motion.span
          role="img"
          aria-label="frog"
          variants={frogVariants}
          animate="jump"
          className="text-3xl"
        >
          🐸
        </motion.span>
        <motion.span
          role="img"
          aria-label="heart"
          variants={heartVariants}
          animate="beat"
          className="text-3xl"
        >
          ❤️
        </motion.span>
        <motion.span
          role="img"
          aria-label="frog"
          variants={frogVariants}
          animate="jump"
          className="text-3xl"
        >
          🐸
        </motion.span>
      </div>
      <p className="text-center text-green-800 mt-2">
        © 2024 RanaRe - Salta hacia un futuro financiero saludable
      </p>
    </footer>
  );
};