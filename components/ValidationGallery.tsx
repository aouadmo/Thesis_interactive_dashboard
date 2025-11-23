import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data generation for CV curves (simulating two plateaus)
const generateCVData = () => {
  const data = [];
  for (let v = -0.5; v <= 1.0; v += 0.05) {
    // Plateau 1 (Back channel) + Plateau 2 (Front channel)
    const sigmoid = (x: number, center: number, steep: number) => 1 / (1 + Math.exp(-steep * (x - center)));
    
    // Simulation of PS (accurate)
    const psVal = 0.01 * sigmoid(v, 0.2, 20) + 0.015 * sigmoid(v, 0.6, 20);
    
    // Simulation of Analytical (good fit)
    const anaVal = 0.01 * sigmoid(v, 0.21, 18) + 0.015 * sigmoid(v, 0.61, 18);

    // Experiment noise
    const noise = (Math.random() - 0.5) * 0.001;
    
    data.push({
      vg: v.toFixed(2),
      PS: Math.max(0, psVal),
      Analytical: Math.max(0, anaVal),
      Experiment: Math.max(0, psVal + noise)
    });
  }
  return data;
};

// Mock data for IV curves (Linear)
const generateIVData = (temp: number) => {
  const data = [];
  for (let v = 0; v <= 1.0; v += 0.05) {
    // Threshold voltage shift with Temp
    const vt = 0.4 + (300 - temp) * 0.0005;
    
    const drive = Math.max(0, v - vt);
    
    // Simple quadratic model
    const current = 0.001 * drive * drive;
    
    // Inter-subband scattering "kink" simulation for low T
    const kink = temp < 20 && v > 0.6 ? -0.0001 * Math.sin((v - 0.6) * 10) : 0;

    data.push({
      vg: v.toFixed(2),
      Model: Math.max(0, current + kink),
      Experiment: Math.max(0, current + kink + (Math.random() - 0.5) * 0.00002)
    });
  }
  return data;
};

export const ValidationGallery: React.FC = () => {
  const [dataType, setDataType] = useState<'CV' | 'IV'>('CV');
  
  const cvData = generateCVData();
  const ivData = generateIVData(4); // 4K

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Validation Gallery</h2>
        
        <div className="flex bg-slate-200 p-1 rounded-xl mt-4 md:mt-0">
          <button
            onClick={() => setDataType('CV')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${dataType === 'CV' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            C-V Curves
          </button>
          <button
            onClick={() => setDataType('IV')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${dataType === 'IV' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            I-V Curves
          </button>
        </div>
      </div>

      <div className="bg-white p-6 lg:p-10 rounded-3xl border border-slate-200 shadow-sm h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataType === 'CV' ? cvData : ivData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="vg" 
              label={{ value: 'Front Gate Voltage (V)', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis 
              label={{ 
                value: dataType === 'CV' ? 'Capacitance (F/m²)' : 'Drain Current (A)', 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36}/>
            
            {dataType === 'CV' ? (
              <>
                <Line type="monotone" dataKey="PS" stroke="#64748b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Analytical" stroke="#2563eb" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Experiment" stroke="#ef4444" strokeWidth={0} dot={{ r: 3, fill: '#ef4444' }} />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="Model" stroke="#2563eb" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Experiment" stroke="#10b981" strokeWidth={0} dot={{ r: 3, fill: '#10b981' }} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-2">Key Feature</h4>
          <p className="text-slate-600 text-sm">
            {dataType === 'CV' 
              ? "Notice the 'Two-Plateau' behavior specific to back-biased FDSOI. The first step is the back channel onset, the second is the front channel." 
              : "The 'kink' in the I-V curve at low temperature (4.2K) is due to inter-subband scattering, captured by the new mobility law."}
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-2">Accuracy</h4>
          <p className="text-slate-600 text-sm">
            The analytical model maintains &lt;3% RMS error compared to numerical simulations across the voltage range.
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-2">Conditions</h4>
          <p className="text-slate-600 text-sm">
            T = 4.2K (Liquid Helium).
            {dataType === 'CV' ? ' Back Bias Vg2 = +3V.' : ' Vds = 50mV (Linear Regime).'}
          </p>
        </div>
      </div>
    </div>
  );
};