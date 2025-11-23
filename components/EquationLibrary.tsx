import React from 'react';
import { KEY_EQUATIONS } from '../constants';

export const EquationLibrary: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Equation Library</h2>
      
      <div className="grid gap-6">
        {KEY_EQUATIONS.map((eq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
              <span className="font-mono text-sm font-bold text-blue-600">{eq.id}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-200 px-2 py-1 rounded">
                {eq.category}
              </span>
            </div>
            <div className="p-8 flex flex-col items-center justify-center bg-white min-h-[120px]">
              <p className="math-font text-xl lg:text-2xl text-slate-800 text-center">
                {eq.tex}
              </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <p className="text-slate-600 text-sm leading-relaxed">
                <span className="font-semibold text-slate-900">Description: </span>
                {eq.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};