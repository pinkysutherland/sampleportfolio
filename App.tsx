
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPath) {
      case '#/':
      case '':
        return <Home />;
      case '#/about':
        return <About />;
      case '#/contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPath={currentPath} />
      <main className="flex-grow pt-16">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
