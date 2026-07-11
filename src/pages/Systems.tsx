import React from 'react';
import { WhatWeBuild } from '../components/sections/WhatWeBuild';
import { ArchitectureFlow } from '../components/sections/ArchitectureFlow';
import { TechnicalEdge } from '../components/sections/TechnicalEdge';
import { Governance } from '../components/sections/Governance';

export const Systems: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <WhatWeBuild />
      <ArchitectureFlow />
      <TechnicalEdge />
      <Governance />
    </div>
  );
};
export default Systems;
