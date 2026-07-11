import React from 'react';
import { Mission } from '../components/sections/Mission';
import { FounderVision } from '../components/sections/FounderVision';

export const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <Mission />
      <FounderVision />
    </div>
  );
};
export default About;
