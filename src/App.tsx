import React, { useState, useEffect } from 'react';
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

useEffect(() => {
    if (location.pathname === '/') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [location.pathname]);
  
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

  const handleNavigation = (path: string, section: string) => {
    navigate(path);
    onSectionChange(section);
  };

  const handleLogoClick = () => {
    navigate('/');
    onSectionChange('landing');
  };

  const renderLandingContent = () => (
    <div className="flex items-start h-screen pl-8 pt-2 lg:items-center lg:pt-0">
      <div 
        className="w-full max-w-[400px] h-[500px] lg:w-[1200px] lg:h-[600px] bg-gray-200 overflow-hidden cursor-pointer group relative mx-auto lg:mx-0"
        onClick={handlePhotoClick}
      >
        {/* Large screen image - crops from left as window shrinks */}
        <img 
          src="/ut_austin copy.jpg" 
          alt="UT Austin Campus" 
          className="hidden lg:block w-full h-full object-cover object-right grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Small screen image - shows when layout forces photo to bottom */}
        <img 
          src="/tower.jpg" 
          alt="UT Austin Tower" 
          className="block lg:hidden w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
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
      {/* Desktop Sidebar */}
      {isMainRoute && (
        <Sidebar 
          currentView={actualCurrentView}
          onSectionChange={handleSectionChange}
          onPhotoClick={handlePhotoClick}
        />
      )}
      
      {/* Mobile Navigation Bar */}
      {isMainRoute && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#F4F3EF] p-4 z-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleLogoClick}
              className="text-lg font-medium text-gray-900 hover:text-[#BF5700] transition-colors"
            >
              Angel Zepeda
            </button>
            
            <nav className="flex space-x-6">
              <button
                onClick={() => handleNavigation('/about', 'about')}
                className={`text-sm transition-colors ${
                  actualCurrentView === 'about' 
                    ? 'text-[#BF5700]' 
                    : 'text-gray-600 hover:text-[#BF5700]'
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/writing', 'writing')}
                className={`text-sm transition-colors ${
                  actualCurrentView === 'writing' 
                    ? 'text-[#BF5700]' 
                    : 'text-gray-600 hover:text-[#BF5700]'
                }`}
              >
                Writing
              </button>
              <button
                onClick={() => handleNavigation('/projects', 'projects')}
                className={`text-sm transition-colors ${
                  actualCurrentView === 'projects' 
                    ? 'text-[#BF5700]' 
                    : 'text-gray-600 hover:text-[#BF5700]'
                }`}
              >
                Projects
              </button>
            </nav>
          </div>
        </div>
      )}
      
      <main className={isMainRoute ? "lg:ml-48" : ""}>
        <Routes>
          <Route path="/" element={
            <div className={isMainRoute ? 'pt-20 lg:pt-8 pb-0 px-4 lg:pl-12 lg:pr-8' : ''}>
              <div className={isMainRoute ? 'max-w-5xl mx-auto lg:mx-0' : ''}>
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
            <div className="pt-20 lg:pt-8 pb-8 px-4 lg:pl-12 lg:pr-8">
              <div className="max-w-5xl mx-auto lg:mx-0">
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
            <div className="pt-20 lg:pt-8 pb-8 px-4 lg:pl-12 lg:pr-8">
              <div className="max-w-5xl mx-auto lg:mx-0">
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
            <div className="pt-20 lg:pt-8 pb-8 px-4 lg:pl-12 lg:pr-8">
              <div className="max-w-5xl mx-auto lg:mx-0">
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