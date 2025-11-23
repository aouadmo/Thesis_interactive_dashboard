import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Activity, GitBranch, BarChart2, BookOpen, Award } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.OVERVIEW, label: 'Overview', icon: LayoutDashboard },
    { id: ViewState.PHYSICS, label: 'Physics Explorer', icon: Activity },
    { id: ViewState.MODEL, label: 'Model Architecture', icon: GitBranch },
    { id: ViewState.VALIDATION, label: 'Validation Gallery', icon: BarChart2 },
    { id: ViewState.EQUATIONS, label: 'Equation Library', icon: BookOpen },
    { id: ViewState.IMPACT, label: 'Impact & Pubs', icon: Award },
  ];

  return (
    <div className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 z-50 transition-all duration-300">
      <div className="p-6 border-b border-slate-700 flex items-center justify-center lg:justify-start gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
          M
        </div>
        <span className="font-bold text-lg hidden lg:block">FDSOI Cryo</span>
      </div>
      
      <nav className="flex-1 py-6 px-2 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium hidden lg:block">{item.label}</span>
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white hidden lg:block" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800 hidden lg:block">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">Thesis Author</p>
          <p className="text-sm font-bold text-white">Mohamed Aouad</p>
          <p className="text-xs text-slate-500 mt-1">Univ. Grenoble Alpes</p>
        </div>
      </div>
    </div>
  );
};