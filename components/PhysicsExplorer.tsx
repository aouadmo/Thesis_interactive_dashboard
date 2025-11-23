import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { Thermometer, Zap } from 'lucide-react';

export const PhysicsExplorer: React.FC = () => {
  const [temperature, setTemperature] = useState(300);
  const [useFermiDirac, setUseFermiDirac] = useState(true);

  // Mock simulation of distribution functions
  const distributionData = useMemo(() => {
    const data = [];
    const k = 8.617e-5; // Boltzmann constant in eV/K
    const Ef = 0.0; // Fermi level at 0
    const kT = k * temperature;

    for (let E = -0.2; E <= 0.2; E += 0.01) {
      // Maxwell-Boltzmann approximation
      const f_MB = Math.exp(-(E - Ef) / kT);
      
      // Fermi-Dirac
      const f_FD = 1 / (1 + Math.exp((E - Ef) / kT));

      data.push({
        energy: E.toFixed(3),
        mb: Math.min(f_MB, 2), // Cap MB for visual clarity
        fd: f_FD,
        kT: kT
      });
    }
    return data;
  }, [temperature]);

  // Mock Subthreshold Slope data
  const ssData = useMemo(() => {
    const data = [];
    // SS = ln(10) * kT/q * (1 + Cd/Cox)
    // At very low T, SS saturates due to band tails
    const saturationT = 45; // K
    
    for (let T = 0; T <= 300; T += 10) {
      const idealSS = (T * 0.059) / 300 * 1000; // roughly 60mV/dec at 300K
      
      // Phenomenological model for saturation
      const effectiveT = Math.sqrt(T * T + saturationT * saturationT);
      const saturatedSS = (effectiveT * 0.059) / 300 * 1000;

      data.push({
        temp: T,
        Linear: idealSS,
        Saturated: saturatedSS
      });
    }
    return data;
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Physics Explorer</h2>
            <p className="text-slate-500">Visualize the breakdown of classical physics at cryogenic temperatures.</p>
          </div>
          
          <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <Thermometer className="text-blue-600" size={20} />
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-500 uppercase">Temperature</label>
                <span className="font-mono font-bold text-slate-900 w-16">{temperature} K</span>
              </div>
            </div>
            <input 
              type="range" 
              min="4" 
              max="300" 
              value={temperature} 
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-32 lg:w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribution Function Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Carrier Statistics</h3>
              <div className="flex items-center gap-2 text-sm">
                <button 
                  onClick={() => setUseFermiDirac(!useFermiDirac)}
                  className={`px-3 py-1 rounded-full transition-colors ${useFermiDirac ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}
                >
                  {useFermiDirac ? 'Showing Comparison' : 'Toggle Comparison'}
                </button>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={distributionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="energy" 
                    label={{ value: 'Energy (eV - Ef)', position: 'insideBottom', offset: -5 }} 
                    tick={{fontSize: 10}}
                  />
                  <YAxis domain={[0, 1.2]} tick={{fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <ReferenceLine x="0.000" stroke="#94a3b8" strokeDasharray="3 3" label="Ef" />
                  <Line 
                    type="monotone" 
                    dataKey="fd" 
                    name="Fermi-Dirac" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={false} 
                  />
                  {useFermiDirac && (
                    <Line 
                      type="monotone" 
                      dataKey="mb" 
                      name="Maxwell-Boltzmann" 
                      stroke="#ef4444" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                      dot={false} 
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              At <span className="font-bold">{temperature}K</span>, the thermal energy kT is {((8.617e-5) * temperature * 1000).toFixed(1)} meV. 
              Notice how Maxwell-Boltzmann diverges significantly for E &lt; Ef at low temperatures, leading to errors in carrier density estimation.
            </p>
          </div>

          {/* Subthreshold Slope Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Subthreshold Slope (SS)</h3>
              <Zap size={18} className="text-amber-500" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ssData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="temp" 
                    label={{ value: 'Temperature (K)', position: 'insideBottom', offset: -5 }} 
                    tick={{fontSize: 10}}
                  />
                  <YAxis label={{ value: 'SS (mV/dec)', angle: -90, position: 'insideLeft' }} tick={{fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Line 
                    type="monotone" 
                    dataKey="Linear" 
                    name="Ideal Linear" 
                    stroke="#94a3b8" 
                    strokeDasharray="5 5"
                    strokeWidth={2} 
                    dot={false} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Saturated" 
                    name="Observed (Band Tails)" 
                    stroke="#d97706" 
                    strokeWidth={3} 
                    dot={false} 
                  />
                  <ReferenceLine x={temperature} stroke="#2563eb" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              Standard models predict SS goes to 0 as T goes to 0 (linear). 
              In reality, SS saturates due to band tails in the Density of States (DOS).
              Current simulated SS: <span className="font-bold text-amber-600">{ssData.find(d => d.temp === Math.round(temperature/10)*10)?.Saturated.toFixed(1)} mV/dec</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};