
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import MarketPulse from './components/MarketPulse';
import BusinessMentor from './components/BusinessMentor';
import RegistrationGuide from './components/RegistrationGuide';
import Settings from './components/Settings';
import ProfitLab from './components/ProfitLab';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Overview', icon: 'fa-house' },
    { id: AppView.MARKET_PULSE, label: 'Supplier & Trends', icon: 'fa-truck-ramp-box' },
    { id: AppView.PROFIT_LAB, label: 'Kita Calculator', icon: 'fa-calculator' },
    { id: AppView.BUSINESS_MENTOR, label: 'AI Mentor', icon: 'fa-comments' },
    { id: AppView.REGISTRATION_GUIDE, label: 'PH Register', icon: 'fa-file-signature' },
    { id: AppView.SETTINGS, label: 'Settings & Privacy', icon: 'fa-gear' },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard setView={setCurrentView} />;
      case AppView.MARKET_PULSE: return <MarketPulse />;
      case AppView.PROFIT_LAB: return <ProfitLab />;
      case AppView.BUSINESS_MENTOR: return <BusinessMentor />;
      case AppView.REGISTRATION_GUIDE: return <RegistrationGuide />;
      case AppView.SETTINGS: return <Settings />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-emerald-800 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-sun text-emerald-900 text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">SIKAT</h1>
          </div>

          <nav className="space-y-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${currentView === item.id ? 'bg-amber-400 text-emerald-900 font-bold shadow-md' : 'hover:bg-emerald-700 text-emerald-100'}`}
              >
                <i className={`fa-solid ${item.icon} w-5`}></i>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <div className="bg-emerald-700/50 p-4 rounded-xl border border-emerald-600">
              <p className="text-xs text-emerald-200 mb-1">Para sa Pinoy na Maabilidad</p>
              <p className="text-sm font-medium">Business Hub PH v1.2</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center">
              <i className="fa-solid fa-sun text-emerald-900"></i>
            </div>
            <span className="font-bold text-lg">SIKAT</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600">
            <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
