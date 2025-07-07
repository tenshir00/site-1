import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Writing from './components/Writing';
import Projects from './components/Projects';
import PostView from './components/PostView';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Determine current view based on route
  const getCurrentView = () => {
    if (location.pathname.startsWith('/writing')) return 'writing';
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/projects') return 'projects';
    return 'landing';
  };

  const actualCurrentView = getCurrentView();

  const handlePhotoClick = () => {
    setIsTransitioning(true);
    navigate('/about');
    setTimeout(() => {
      setCurrentView('about');
      setIsTransitioning(false);
    }, 200);
  };

  const handleSectionChange = (section: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(section);
      setIsTransitioning(false);
    }, 200);
  };

  const renderLandingContent = () => (
    <div className="flex items-start h-screen pl-8 pt-2">
      <div 
        className="w-[1200px] h-[600px] bg-gray-200 overflow-hidden cursor-pointer group"
        onClick={handlePhotoClick}
      >
        <img 
          src="/ut_austin copy.jpg" 
          alt="UT Austin Campus" 
          className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );

  // Check if we're on a writing-related route or post route
  const isWritingRoute = location.pathname.startsWith('/writing');
  const isPostRoute = location.pathname !== '/' && 
                     location.pathname !== '/about' && 
                     location.pathname !== '/projects' && 
                     location.pathname !== '/writing';
  const isMainRoute = ['/', '/about', '/projects', '/writing'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#F4F3EF]">
      {isMainRoute && (
        <Sidebar 
          currentView={actualCurrentView}
          onSectionChange={handleSectionChange}
          onPhotoClick={handlePhotoClick}
        />
      )}
      
      <main className={isMainRoute ? "ml-48" : ""}>
        <Routes>
          <Route path="/" element={
            <div className={isMainRoute ? 'p-8 pl-12' : ''}>
              <div className={isMainRoute ? 'max-w-5xl' : ''}>
                <div className={`transition-all duration-1000 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-4' 
                    : 'opacity-100 transform translate-y-0'
                }`}>
                  {renderLandingContent()}
                </div>
              </div>
            </div>
          } />
          
          <Route path="/about" element={
            <div className="p-8 pl-12">
              <div className="max-w-5xl">
                <div className={`transition-all duration-1000 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-4' 
                    : 'opacity-100 transform translate-y-0'
                }`}>
                  <About />
                </div>
              </div>
            </div>
          } />
          
          <Route path="/writing" element={
            <div className="p-8 pl-12">
              <div className="max-w-5xl">
                <div className={`transition-all duration-1000 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-4' 
                    : 'opacity-100 transform translate-y-0'
                }`}>
                  <Writing />
                </div>
              </div>
            </div>
          } />
          
          <Route path="/projects" element={
            <div className="p-8 pl-12">
              <div className="max-w-5xl">
                <div className={`transition-all duration-1000 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-4' 
                    : 'opacity-100 transform translate-y-0'
                }`}>
                  <Projects />
                </div>
              </div>
            </div>
          } />
          
          {/* Slug-based routes for posts - this catches any URL that's not a main route */}
          <Route path="/:slug" element={<PostView />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;