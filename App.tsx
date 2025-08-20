import React from 'react';
import { AIFamilyDisplay } from './components/AIFamilyDisplay';
import { EclatDOmbre } from './components/EclatDOmbre';

const App: React.FC = () => {
  return (
    <main className="font-serif bg-gray-900 text-slate-200 min-h-screen">
      <div className="py-8 md:py-12">
        <AIFamilyDisplay />
      </div>
      <div className="flex items-center justify-center py-8 md:py-12">
        <EclatDOmbre />
      </div>
    </main>
  );
};

export default App;
