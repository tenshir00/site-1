import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
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

  const handleMobileNavigation = (path: string, section: string) => {
    navigate(path);
    setCurrentView(section);
  };

  const handleMobileLogoClick = () => {
    navigate('/');
    setCurrentView('landing');
  };

  const renderLandingContent = () => (
    <div className="flex items-start h-screen pl-8 pt-2 md:items-center md:justify-center md:pl-0">
      <div 
        className="w-[1200px] h-[600px] md:w-[400px] md:h-[300px] bg-gray-200 overflow-hidden cursor-pointer group relative"
        onClick={handlePhotoClick}
      >
        {/* Large screen image - crops from left as window shrinks */}
        <img 
          src="/ut_austin copy.jpg" 
          alt="UT Austin Campus" 
          className="hidden lg:block w-full h-full object-cover object-right grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Medium screen image - shows on tablets */}
        <img 
          src="/tower.jpg" 
          alt="UT Austin Tower" 
          className="hidden md:block lg:hidden w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Mobile screen image - centered */}
        <img 
          src="/tower.jpg" 
          alt="UT Austin Tower" 
          className="block md:hidden w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <div className="md:hidden fixed top-0 right-0 p-4 z-50">
      <div className="text-right space-y-3">
        {/* Angel Zepeda - top right */}
        <button 
          onClick={handleMobileLogoClick}
          className="block text-xl font-medium text-gray-900 hover:text-[#BF5700] transition-colors"
        >
          Angel Zepeda
        </button>
        
        {/* Navigation links - horizontal bar */}
        <div className="flex space-x-4 justify-end">
          <button
            onClick={() => handleMobileNavigation('/about', 'about')}
            className={`transition-colors ${
              actualCurrentView === 'about' 
                ? 'text-[#BF5700]' 
                : 'text-gray-600 hover:text-[#BF5700]'
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleMobileNavigation('/writing', 'writing')}
            className={`transition-colors ${
              actualCurrentView === 'writing' 
                ? 'text-[#BF5700]' 
                : 'text-gray-600 hover:text-[#BF5700]'
            }`}
          >
            Writing
          </button>
          <button
            onClick={() => handleMobileNavigation('/projects', 'projects')}
            className={`transition-colors ${
              actualCurrentView === 'projects' 
                ? 'text-[#BF5700]' 
                : 'text-gray-600 hover:text-[#BF5700]'
            }`}
          >
            Projects
          </button>
        </div>
        
        {/* Social links - horizontal bar */}
        <div className="flex space-x-3 justify-end">
          <a 
            href="https://www.linkedin.com/in/zepangel/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#BF5700] transition-colors"
          >
            <img 
              src="/linkedin.png" 
              alt="LinkedIn" 
              className="w-[18px] h-[18px] opacity-60 hover:opacity-100 transition-opacity"
            />
          </a>
          <a 
            href="mailto:azcareers00@gmail.com"
            className="text-gray-400 hover:text-[#BF5700] transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
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
      
      {/* Mobile Navigation */}
      {isMainRoute && <MobileNavigation />}
      
      <main className={isMainRoute ? "md:ml-48" : ""}>
        <Routes>
          <Route path="/" element={
            <div className={isMainRoute ? 'pt-8 pb-0 md:pl-12 pr-8 pl-4' : ''}>
              <div className={isMainRoute ? 'md:max-w-5xl' : ''}>
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
            <div className="p-8 md:pl-12 pl-4">
              <div className="md:max-w-5xl">
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
            <div className="p-8 md:pl-12 pl-4">
              <div className="md:max-w-5xl">
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
            <div className="p-8 md:pl-12 pl-4">
              <div className="md:max-w-5xl">
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