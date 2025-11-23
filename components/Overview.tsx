import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Snowflake, Cpu } from 'lucide-react';

export const Overview: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Snowflake size={14} />
              <span>Cryogenic Electronics</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Compact Modeling of FDSOI Transistors at Cryogenic Temperatures
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Quantum computers require classical electronic interfaces operating at deep cryogenic temperatures (4.2K). 
              This research develops a rigorous physics-based compact model for 28nm FDSOI technology, 
              overcoming the limitations of standard models by integrating Fermi-Dirac statistics, 
              quantization effects, and advanced mobility laws.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            icon: Snowflake, 
            label: "Temperature Range", 
            value: "4.2K - 300K", 
            desc: "Valid from room temp down to Liquid Helium" 
          },
          { 
            icon: Layers, 
            label: "Modeling Levels", 
            value: "3 Levels", 
            desc: "Poisson-Schrödinger, Numerical, Analytical" 
          },
          { 
            icon: Cpu, 
            label: "Technology", 
            value: "28nm FDSOI", 
            desc: "Optimized for Quantum Control Interfaces" 
          }
        ].map((metric, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <metric.icon size={24} />
            </div>
            <h3 className="text-slate-500 font-medium text-sm mb-1">{metric.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mb-2">{metric.value}</p>
            <p className="text-sm text-slate-400">{metric.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Research Timeline */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Research Methodology</h2>
        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 lg:left-1/2 h-full w-0.5 bg-slate-100 -translate-x-1/2 hidden lg:block" />
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12"
          >
            {[
              {
                step: "01",
                title: "Physics Exploration",
                desc: "Investigation of MB vs FD statistics, subthreshold slope saturation, and band tails.",
                align: "left"
              },
              {
                step: "02",
                title: "Poisson-Schrödinger Sims",
                desc: "Self-consistent simulations to understand electrostatics, subband quantization, and channel coupling.",
                align: "right"
              },
              {
                step: "03",
                title: "Numerical Modeling",
                desc: "Development of a robust charge model resolving the zero-charge singularity using extended quantum shift functions.",
                align: "left"
              },
              {
                step: "04",
                title: "Analytical Derivation",
                desc: "Creation of closed-form expressions for surface potential, drift/diffusion currents, and linearization techniques.",
                align: "right"
              }
            ].map((phase, idx) => (
              <motion.div 
                key={idx}
                variants={item}
                className={`flex flex-col lg:flex-row items-center gap-8 ${phase.align === 'right' ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full lg:text-right">
                  {phase.align === 'left' && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <span className="text-blue-600 font-bold text-sm tracking-wider mb-2 block">STEP {phase.step}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{phase.title}</h3>
                      <p className="text-slate-600">{phase.desc}</p>
                    </div>
                  )}
                </div>
                
                <div className="relative flex-shrink-0 z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">
                    {idx + 1}
                  </div>
                </div>

                <div className="flex-1 w-full text-left">
                  {phase.align === 'right' && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <span className="text-blue-600 font-bold text-sm tracking-wider mb-2 block">STEP {phase.step}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{phase.title}</h3>
                      <p className="text-slate-600">{phase.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};