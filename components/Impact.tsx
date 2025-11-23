import React from 'react';
import { PUBLICATIONS } from '../constants';
import { Book, Mic2, ExternalLink } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Research Impact</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          This thesis contributes significantly to the development of quantum computing infrastructure by enabling accurate simulation of the classical control electronics (FDSOI) that must operate inside the cryostat.
        </p>
      </div>

      <div className="grid gap-6">
        {PUBLICATIONS.map((pub, idx) => (
          <a 
            key={idx} 
            href={pub.link || "#"}
            className="group block bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${pub.type === 'Journal' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                {pub.type === 'Journal' ? <Book size={24} /> : <Mic2 size={24} />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {pub.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{pub.journal}</span>
                  <span>•</span>
                  <span>{pub.year}</span>
                </div>
              </div>
              <ExternalLink className="text-slate-300 group-hover:text-blue-500" size={20} />
            </div>
          </a>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Future Perspectives</h3>
        <ul className="space-y-3 list-disc list-inside text-blue-100">
          <li>Extension to PMOS device behavior at cryogenic temperatures.</li>
          <li>Implementation of additional short channel effects.</li>
          <li>Conversion of Python model code to Verilog-A for SPICE integration.</li>
        </ul>
      </div>
    </div>
  );
};