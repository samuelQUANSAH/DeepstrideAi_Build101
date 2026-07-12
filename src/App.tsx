import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Systems } from './pages/Systems';
import { Research } from './pages/Research';
import { CaseStudies } from './pages/CaseStudies';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'systems':
        return <Systems />;
      case 'research':
        return <Research />;
      case 'case-studies':
        return <CaseStudies />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-darkbg text-white flex flex-col">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default App;
