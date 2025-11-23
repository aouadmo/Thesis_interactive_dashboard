import React, { useState } from 'react';
import { ArrowRight, Database, Calculator, FunctionSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const ModelArchitecture: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const blocks = [
    {
      id: 'PS',
      title: 'Poisson-Schrödinger',
      icon: Database,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      desc: 'Self-consistent solver used as the "Ground Truth". Simulates quantization, wave functions, and charge distribution down to 0K.',
      details: 'Used to calibrate the numerical model. Replaces Fermi integrals with Heaviside step function at 0K limit.'
    },
    {
      id: 'NUM',
      title: 'Numerical Model',
      icon: Calculator,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      desc: 'Solves the system of transcendent coupled equations for front and back surface potentials (Vs1, Vs2).',
      details: 'Uses an iterative error correction method. Includes the "Quantum Shift" function to account for confinement without solving Schrödinger equations directly.'
    },
    {
      id: 'ANA',
      title: 'Analytical Model',
      icon: FunctionSquare,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      desc: 'Closed-form expressions for Charge and Current suitable for SPICE/Verilog-A.',
      details: 'Features: Initial guess derivation -> Error correction -> Drift-Diffusion Integration -> Short Channel Effects (DIBL, Velocity Saturation).'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">Model Architecture</h2>
        <p className="text-slate-500 mt-2">From fundamental physics to compact SPICE models</p>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 hidden lg:block -translate-y-1/2" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blocks.map((block, idx) => (
            <motion.div
              key={block.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveBlock(activeBlock === block.id ? null : block.id)}
              className={`cursor-pointer relative p-6 rounded-2xl border-2 bg-white transition-all shadow-sm
                ${activeBlock === block.id ? 'border-blue-500 shadow-lg ring-4 ring-blue-50' : 'border-slate-100 hover:border-blue-200'}
              `}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${block.color}`}>
                <block.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{block.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{block.desc}</p>

              {idx < blocks.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                  <ArrowRight size={24} />
                </div>
              )}
              
              {/* Mobile Arrow */}
              {idx < blocks.length - 1 && (
                <div className="lg:hidden flex justify-center py-2 text-slate-300">
                  <ArrowRight size={24} className="rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Details Panel */}
        <div className="mt-8 h-32">
          {activeBlock ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200"
            >
              <h4 className="font-bold text-slate-900 mb-2">
                Deep Dive: {blocks.find(b => b.id === activeBlock)?.title}
              </h4>
              <p className="text-slate-600">
                {blocks.find(b => b.id === activeBlock)?.details}
              </p>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-2xl">
              Click a block above to see technical details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};