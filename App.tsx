import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { PhysicsExplorer } from './components/PhysicsExplorer';
import { ModelArchitecture } from './components/ModelArchitecture';
import { ValidationGallery } from './components/ValidationGallery';
import { EquationLibrary } from './components/EquationLibrary';
import { Impact } from './components/Impact';
import { ViewState } from './types';

function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.OVERVIEW);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.OVERVIEW: return <Overview />;
      case ViewState.PHYSICS: return <PhysicsExplorer />;
      case ViewState.MODEL: return <ModelArchitecture />;
      case ViewState.VALIDATION: return <ValidationGallery />;
      case ViewState.EQUATIONS: return <EquationLibrary />;
      case ViewState.IMPACT: return <Impact />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentView={currentView} setView={setView} />
      
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;