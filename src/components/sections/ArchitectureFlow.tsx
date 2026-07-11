import React from 'react';
import { ReactFlow, Background, Position } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'User / Env Signal' },
    position: { x: 50, y: 100 },
    sourcePosition: Position.Right,
    style: {
      background: '#070707',
      color: '#fff',
      border: '1px solid #0070f3',
      borderRadius: '4px',
      fontSize: '13px',
      fontWeight: '600',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(0, 112, 243, 0.2)',
    },
  },
  {
    id: '2',
    data: { label: 'Intent Classifier' },
    position: { x: 250, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: {
      background: '#0c0c0c',
      color: '#fff',
      border: '1px solid #8a2be2',
      borderRadius: '4px',
      fontSize: '13px',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(138, 43, 226, 0.1)',
    },
  },
  {
    id: '3',
    data: { label: 'Planner Agent' },
    position: { x: 450, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: {
      background: '#0c0c0c',
      color: '#fff',
      border: '1px solid #8a2be2',
      borderRadius: '4px',
      fontSize: '13px',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(138, 43, 226, 0.1)',
    },
  },
  {
    id: '4',
    data: { label: 'Specialist Agents' },
    position: { x: 650, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: {
      background: '#0c0c0c',
      color: '#fff',
      border: '1px solid #8a2be2',
      borderRadius: '4px',
      fontSize: '13px',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(138, 43, 226, 0.1)',
    },
  },
  {
    id: '5',
    data: { label: 'Tool / API Layer' },
    position: { x: 850, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: {
      background: '#0c0c0c',
      color: '#fff',
      border: '1px solid #8a2be2',
      borderRadius: '4px',
      fontSize: '13px',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(138, 43, 226, 0.1)',
    },
  },
  {
    id: '6',
    data: { label: 'Safety Validation' },
    position: { x: 1050, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: {
      background: '#0c0c0c',
      color: '#fff',
      border: '1px solid #39ff14',
      borderRadius: '4px',
      fontSize: '13px',
      fontWeight: '600',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(57, 255, 20, 0.15)',
    },
  },
  {
    id: '7',
    data: { label: 'Human Approval Gate' },
    position: { x: 1250, y: 100 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: {
      background: '#0c0c0c',
      color: '#fff',
      border: '1px solid #39ff14',
      borderRadius: '4px',
      fontSize: '13px',
      fontWeight: '600',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(57, 255, 20, 0.15)',
    },
  },
  {
    id: '8',
    type: 'output',
    data: { label: 'Physical Action' },
    position: { x: 1450, y: 100 },
    targetPosition: Position.Left,
    style: {
      background: '#070707',
      color: '#fff',
      border: '1px solid #0070f3',
      borderRadius: '4px',
      fontSize: '13px',
      fontWeight: '600',
      padding: '10px',
      width: 150,
      boxShadow: '0 0 15px rgba(0, 112, 243, 0.2)',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#0070f3' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#8a2be2' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#8a2be2' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#8a2be2' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#39ff14' } },
  { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#39ff14' } },
  { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#0070f3' } },
];

export const ArchitectureFlow: React.FC = () => {
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
        <div className="w-full h-[350px] border border-white/10 rounded-lg bg-black relative overflow-hidden shadow-2xl">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            nodesConnectable={false}
            nodesDraggable={false}
            zoomOnScroll={false}
            panOnScroll={false}
            preventScrolling={true}
          >
            <Background color="#222" gap={24} size={1} />
          </ReactFlow>
        </div>

      </div>
    </section>
  );
};
