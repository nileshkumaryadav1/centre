'use client';

import { motion } from 'framer-motion';

const HoverCard = () => {
  return (
    <motion.div
      className="w-64 h-40 bg-gray-800 text-white p-4 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300"
      whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
    >
      <p className="text-lg font-semibold">Hover Me!</p>
    </motion.div>
  );
};

export default HoverCard;
