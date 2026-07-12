import React, { useState } from 'react';
import { stitchClient } from '../../utils/stitch';
import { Cpu, Send, Sparkles } from 'lucide-react';

export const StitchSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState('A sleek dashboard telemetry card with orange borders');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await stitchClient.generateComponent(prompt);
      setResult(response.html);
    } catch (err) {
      console.error('[Stitch Sandbox] Error invoking Stitch SDK:', err);
      setResult(`<div class="text-red-500">Error invoking Stitch SDK.</div>`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#030303] relative border-t border-white/5 overflow-hidden">
      {/* Background orange radial light */}
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-orange-500 font-bold">Generative UI Interface</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2 mb-4">
            Google Stitch Sandbox
          </h2>
          <p className="text-lg text-gradient-orange font-medium max-w-xl mx-auto">
            Design and compile premium components on-the-fly using Google Stitch's AI-native layout engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="md:col-span-5 p-6 rounded-lg bg-neutral-900/60 border border-white/5 backdrop-blur-md">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500" />
              Stitch Workspace
            </h4>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2">PROMPT DESCRIPTION</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 px-4 py-3 bg-black/50 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all font-sans resize-none"
                  placeholder="Describe the component layout..."
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 text-white font-semibold rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Compiling Layout...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Component</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Render Area */}
          <div className="md:col-span-7 p-6 rounded-lg bg-neutral-950 border border-white/5 min-h-[290px] flex flex-col justify-between">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Live Output Viewport
            </h4>

            <div className="flex-grow flex items-center justify-center bg-black/40 rounded border border-white/5 p-4 min-h-[180px]">
              {isLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                  <span className="text-xs font-mono text-neutral-500">Connecting to Google Stitch SDK...</span>
                </div>
              ) : result ? (
                <div 
                  className="w-full text-white" 
                  dangerouslySetInnerHTML={{ __html: result }} 
                />
              ) : (
                <span className="text-sm text-neutral-600 font-mono text-center">
                  Viewport empty. Submit a prompt to compile HTML assets.
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-white/5 pt-3">
              <span>ENGINE: GOOGLE-STITCH-V1</span>
              <span>RENDER: HTML5 DYNAMIC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
