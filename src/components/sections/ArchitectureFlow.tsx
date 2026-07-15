import React, { useState, useEffect } from 'react';
import { ReactFlow, Background, Position } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Base Node styles shared across layouts
const getStyle = (borderColor: string, shadowColor: string) => ({
  background: '#0c0c0c',
  color: '#fff',
  border: `1px solid ${borderColor}`,
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  padding: '8px 12px',
  width: 140,
  boxShadow: `0 0 12px ${shadowColor}`,
});

export const ArchitectureFlow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleLayout = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Define Node details
      const nodeData = [
        { label: 'User / Env Signal', border: '#0070f3', shadow: 'rgba(0, 112, 243, 0.2)' },
        { label: 'Intent Classifier', border: '#8a2be2', shadow: 'rgba(138, 43, 226, 0.1)' },
        { label: 'Planner Agent', border: '#8a2be2', shadow: 'rgba(138, 43, 226, 0.1)' },
        { label: 'Specialist Agents', border: '#8a2be2', shadow: 'rgba(138, 43, 226, 0.1)' },
        { label: 'Tool / API Layer', border: '#8a2be2', shadow: 'rgba(138, 43, 226, 0.1)' },
        { label: 'Safety Validation', border: '#39ff14', shadow: 'rgba(57, 255, 20, 0.15)' },
        { label: 'Human Approval Gate', border: '#39ff14', shadow: 'rgba(57, 255, 20, 0.15)' },
        { label: 'Physical Action', border: '#0070f3', shadow: 'rgba(0, 112, 243, 0.2)' }
      ];

      // Calculate position and directions dynamically
      const computedNodes: Node[] = nodeData.map((item, idx) => {
        const id = (idx + 1).toString();
        
        let position = { x: 50 + idx * 200, y: 100 }; // Horizontal layout
        let sourcePosition = Position.Right;
        let targetPosition = Position.Left;

        if (mobile) {
          position = { x: 80, y: 30 + idx * 110 }; // Vertical layout
          sourcePosition = Position.Bottom;
          targetPosition = Position.Top;
        }

        // Adjust input/output types
        const type = idx === 0 ? 'input' : (idx === nodeData.length - 1 ? 'output' : 'default');

        return {
          id,
          type,
          data: { label: item.label },
          position,
          sourcePosition,
          targetPosition,
          style: getStyle(item.border, item.shadow),
          draggable: false
        };
      });

      // Construct corresponding connecting edges
      const computedEdges: Edge[] = [];
      for (let i = 0; i < nodeData.length - 1; i++) {
        const sourceId = (i + 1).toString();
        const targetId = (i + 2).toString();
        let strokeColor = '#8a2be2'; // default agent connection

        if (i === 0 || i === 6) strokeColor = '#0070f3'; // Input/output pipeline
        if (i === 4 || i === 5) strokeColor = '#39ff14'; // Safety/approval pipeline

        computedEdges.push({
          id: `e${sourceId}-${targetId}`,
          source: sourceId,
          target: targetId,
          animated: true,
          style: { stroke: strokeColor, strokeWidth: 1.5 }
        });
      }

      setNodes(computedNodes);
      setEdges(computedEdges);
    };

    handleLayout();
    window.addEventListener('resize', handleLayout);
    return () => window.removeEventListener('resize', handleLayout);
  }, []);

  return (
    <section className="py-24 px-6 bg-[#030303] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">Execution Stack</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2">
            Agentic System Architecture
          </h2>
          <p className="text-brand-lightgray max-w-xl mx-auto mt-4 font-light">
            End-to-end data pipeline showing how deep intent is processed, validated, and executed.
          </p>
        </div>

        {/* React Flow Box */}
        <div 
          className={`w-full border border-white/10 rounded-lg bg-black relative overflow-hidden shadow-2xl transition-all duration-300 pointer-events-none ${
            isMobile ? 'h-[920px]' : 'h-[350px]'
          }`}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            fitViewOptions={{ padding: isMobile ? 0.05 : 0.15 }}
            nodesConnectable={false}
            nodesDraggable={false}
            zoomOnScroll={false}
            panOnScroll={false}
            preventScrolling={false} // Allow scrolling page when touching Flow background
          >
            <Background color="#222" gap={24} size={1} />
          </ReactFlow>
        </div>

      </div>
    </section>
  );
};
export default ArchitectureFlow;
