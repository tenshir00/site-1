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

  const renderLandingContent = () => (
    <div className="flex items-start h-screen pl-8 pt-2 overflow-hidden">
      <div 
        className="w-full max-w-[1200px] h-[600px] bg-gray-200 overflow-hidden cursor-pointer group relative"
        onClick={handlePhotoClick}
        style={{
          maxHeight: 'calc(100vh - 100px)', // Ensure photo doesn't exceed viewport height
          aspectRatio: '2/1' // Maintain aspect ratio
        }}
      >
        {/* Large screen image - crops from left as window shrinks */}
        <img 
          src="/ut_austin copy.jpg" 
          alt="UT Austin Campus" 
          className="hidden lg:block w-full h-full object-contain object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          style={{
            objectFit: window.innerWidth < 1400 ? 'contain' : 'cover',
            objectPosition: window.innerWidth < 1400 ? 'center' : 'right'
          }}
        />
        
        {/* Small screen image - shows when layout forces photo to bottom */}
        <img 
          src="/tower.jpg" 
          alt="UT Austin Tower" 
          className="block lg:hidden w-full h-full object-contain object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
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
      
      <main className={isMainRoute ? "md:ml-48" : ""}>
        <Routes>
          <Route path="/" element={
            <div className={isMainRoute ? 'md:pt-8 md:pb-0 md:pl-12 md:pr-8 pt-4 px-4' : ''}>
              <div className={isMainRoute ? 'md:max-w-5xl' : ''}>
                <div className={`transition-all duration-1000 ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-4' 
                    : 'opacity-100 transform translate-y-0'
                }`}>
                  {/* Mobile photo for landing page */}
                  <div className="md:hidden flex justify-center pt-6">
                    <div 
                      className="w-full max-w-sm bg-gray-200 overflow-hidden cursor-pointer group relative"
                      onClick={handlePhotoClick}
                      style={{
                        height: 'min(70vh, 400px)', // Responsive height that doesn't exceed viewport
                        aspectRatio: '3/4' // Maintain mobile aspect ratio
                      }}
                    >
                      <img 
                        src="/tower.jpg" 
                        alt="UT Austin Tower" 
                        className="w-full h-full object-contain object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  {/* Desktop content */}
                  <div className="hidden md:block">
                    {renderLandingContent()}
                  </div>
                </div>
              </div>
            </div>
          } />
          
          <Route path="/about" element={
            <div className="md:p-8 md:pl-12 p-4">
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
            <div className="md:p-8 md:pl-12 p-4">
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
            <div className="md:p-8 md:pl-12 p-4">
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