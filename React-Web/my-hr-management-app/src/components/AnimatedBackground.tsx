import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 -z-10"
      initial={{ backgroundPosition: '0% 0%' }}
      animate={{ 
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 20,
        ease: 'linear',
      }}
      style={{
        background: 'linear-gradient(45deg, #f3f4f6 25%, #e5e7eb 25%, #e5e7eb 50%, #f3f4f6 50%, #f3f4f6 75%, #e5e7eb 75%, #e5e7eb 100%)',
        backgroundSize: '40px 40px',
      }}
    />
  );
};

export default AnimatedBackground;