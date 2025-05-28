import React from 'react';
import IntegrationForm from './components/IntegrationForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary-dark">Topic Integration Wizard</h1>
      <IntegrationForm />
    </div>
  );
}

export default App;
