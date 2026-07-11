import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Mission } from '../components/sections/Mission';
import { WhatWeBuild } from '../components/sections/WhatWeBuild';
import { ArchitectureFlow } from '../components/sections/ArchitectureFlow';
import { PhysicalLayer } from '../components/sections/PhysicalLayer';
import { QuantumHorizon } from '../components/sections/QuantumHorizon';
import { TechnicalEdge } from '../components/sections/TechnicalEdge';
import { Governance } from '../components/sections/Governance';
import { FounderVision } from '../components/sections/FounderVision';
import { ContactCTA } from '../components/sections/ContactCTA';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab }) => {
  return (
    <div>
      <Hero setCurrentTab={setCurrentTab} />
      <Mission />
      <WhatWeBuild />
      <ArchitectureFlow />
      <PhysicalLayer />
      <QuantumHorizon />
      <TechnicalEdge />
      <Governance />
      <FounderVision />
      <ContactCTA />
    </div>
  );
};
export default Home;
