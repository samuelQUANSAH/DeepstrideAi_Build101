import React from 'react';
import { QuantumHorizon } from '../components/sections/QuantumHorizon';
import { StitchSandbox } from '../components/sections/StitchSandbox';

export const Research: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <QuantumHorizon />
      <StitchSandbox />
    </div>
  );
};

export default Research;
