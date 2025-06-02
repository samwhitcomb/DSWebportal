import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DeviceBindingApp from './pages/DeviceBindingApp';
import CloudPortal from './pages/CloudPortal';
import SuccessPage from './pages/SuccessPage';
import rapsodoLogo from "../Assets/Logos/Rapsodo Baseball.svg";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="App-header p-4">
          <img src={rapsodoLogo} alt="Rapsodo Baseball Logo" className="h-8 filter brightness-0" />
        </header>
        <Routes>
          <Route path="/" element={<DeviceBindingApp />} />
          <Route path="/cloud-portal/*" element={<CloudPortal />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;