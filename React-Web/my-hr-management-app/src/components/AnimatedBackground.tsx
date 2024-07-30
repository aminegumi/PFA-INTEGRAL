import React from 'react';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/system';

const backgroundAnimation = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const AnimatedBackgroundBox = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
  background: linear-gradient(45deg, #BC9F8B, #B5CFB7, #CADABF, #E7E8D8, rgb(188, 159, 139), rgb(181, 207, 183), rgb(202, 218, 191), rgb(231, 232, 216));
  background-size: 800% 800%;
  animation: ${backgroundAnimation} 20s linear infinite;
`;

const AnimatedBackground: React.FC = () => {
  return <AnimatedBackgroundBox />;
};

export default AnimatedBackground;
