import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Play, BarChart2, Activity } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'metrics'>('simulation');
  const [logs, setLogs] = useState<string[]>([
    '[INIT] System booted on local runner node.',
    '[SYSTEM] Tracing configured via OpenTelemetry API.',
    '[SECURITY] Intent classifier gate active.'
  ]);
  const [metrics, setMetrics] = useState({
    tokensUsed: 420,
    activeAgents: 3,
    latency: 140,
    costSaved: 1.25
  });

  // Dynamic simulation timer
  useEffect(() => {
    const logPool = [
      '[AUDIT] Intent matched: "Check manufacturing schedule"',
      '[PLANNER] Generating tasks for specialists...',
      '[SPECIALIST] Retrieving inventory data from RAG layer...',
      '[SECURITY] Action verified: Read-only check, safe boundary.',
      '[TELEMETRY] Span completed in 42ms. Token budget: 24/100.',
      '[HUMAN-GATE] Awaiting confirmation for physical arm sweep...',
      '[AUDIT] sweep confirmed by operator.',
      '[SYSTEM] execution command sent to arm controller API.'
    ];

    const interval = setInterval(() => {
      // Append random logs
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setLogs((prev) => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${randomLog}`]);
      
      // Randomize metrics
      setMetrics((prev) => ({
        tokensUsed: prev.tokensUsed + Math.floor(Math.random() * 8) + 1,
        activeAgents: Math.floor(Math.random() * 2) + 3,
        latency: Math.floor(Math.random() * 50) + 120,
        costSaved: +(prev.costSaved + 0.05).toFixed(2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-28 min-h-screen px-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">Live Portal</span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2">
          Case Studies & Demos
        </h2>
        <p className="text-brand-lightgray mt-3 font-light text-sm max-w-xl mx-auto">
          Explore interactive dashboards displaying mock traces, logs, and cost efficiency stats from active physical environments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('simulation')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded text-sm font-medium border transition-all ${
            activeTab === 'simulation'
              ? 'bg-white text-black border-white'
              : 'text-brand-lightgray border-white/10 bg-white/5 hover:border-white/20'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Real-time Logs</span>
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded text-sm font-medium border transition-all ${
            activeTab === 'metrics'
              ? 'bg-white text-black border-white'
              : 'text-brand-lightgray border-white/10 bg-white/5 hover:border-white/20'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Live Metrics</span>
        </button>
      </div>

      {/* Content Panels */}
      <div className="w-full min-h-[400px] border border-white/10 rounded-lg bg-black p-6 shadow-2xl relative overflow-hidden">
        
        {activeTab === 'simulation' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-xs text-brand-lightgray ml-2 font-mono">deepstride_orchestrator_log</span>
              </div>
              <Activity className="w-4 h-4 text-brand-green animate-pulse" />
            </div>

            {/* Terminal Screen */}
            <div className="flex-1 font-mono text-xs text-left text-green-400 bg-neutral-950 p-4 rounded border border-white/5 overflow-y-auto space-y-2.5 min-h-[300px] leading-relaxed">
              {logs.map((log, idx) => (
                <div key={idx} className="opacity-90">{log}</div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Tokens card */}
            <div className="p-6 rounded bg-[#0b0b0b] border border-white/5 text-center">
              <Cpu className="w-8 h-8 text-brand-blue mx-auto mb-4" />
              <h4 className="text-xs uppercase tracking-wider text-brand-lightgray">Tokens Consumed</h4>
              <p className="text-3xl font-heading font-extrabold text-white mt-2 font-mono">{metrics.tokensUsed}</p>
            </div>

            {/* Active Agents */}
            <div className="p-6 rounded bg-[#0b0b0b] border border-white/5 text-center">
              <Activity className="w-8 h-8 text-brand-violet mx-auto mb-4" />
              <h4 className="text-xs uppercase tracking-wider text-brand-lightgray">Active Subagents</h4>
              <p className="text-3xl font-heading font-extrabold text-white mt-2 font-mono">{metrics.activeAgents}</p>
            </div>

            {/* Latency */}
            <div className="p-6 rounded bg-[#0b0b0b] border border-white/5 text-center">
              <Activity className="w-8 h-8 text-brand-green mx-auto mb-4" />
              <h4 className="text-xs uppercase tracking-wider text-brand-lightgray">Average Latency</h4>
              <p className="text-3xl font-heading font-extrabold text-white mt-2 font-mono">{metrics.latency} ms</p>
            </div>

            {/* Cost Saved */}
            <div className="p-6 rounded bg-[#0b0b0b] border border-white/5 text-center">
              <Play className="w-8 h-8 text-brand-blue mx-auto mb-4" />
              <h4 className="text-xs uppercase tracking-wider text-brand-lightgray">Token Efficiency</h4>
              <p className="text-3xl font-heading font-extrabold text-white mt-2 font-mono">${metrics.costSaved}</p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
export default CaseStudies;
