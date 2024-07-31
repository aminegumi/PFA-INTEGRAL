import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

// const backgroundAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const AnimatedBackgroundBox = styled(Box)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: -10;
//   background: linear-gradient(45deg, #FFF8F3, #758694);
//   background-size: 200% 200%;
//   animation: ${backgroundAnimation} 20s ease infinite;
// `;

// const AnimatedBackground: React.FC = () => {
//   return <AnimatedBackgroundBox />;
// };


const StaticBackgroundBox = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
  background: linear-gradient(135deg, #FFF8F3 0%, #758694 100%);
`;

const StaticBackground: React.FC = () => {
  return <StaticBackgroundBox />;
};

export default StaticBackground;