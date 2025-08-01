import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onSectionChange: (section: string) => void;
  onPhotoClick: () => void;
}

const Sidebar = ({ currentView, onSectionChange, onPhotoClick }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, section: string) => {
    navigate(path);
    onSectionChange(section);
  };

  const handleLogoClick = () => {
    navigate('/');
    onSectionChange('landing');
  };

  // Check if we're on a post page (not a main route)
  const isPostPage = !['/', '/about', '/projects', '/writing'].includes(location.pathname);
  const displayCurrentView = isPostPage ? 'writing' : currentView;

  return (
    <>
      {/* Desktop Sidebar - visible on md screens and above */}
      <div className="hidden md:flex fixed left-0 top-0 w-48 h-full bg-[#F4F3EF] p-6 flex-col">
        <div className="mb-8">
          <button 
            onClick={handleLogoClick}
            className="text-xl font-medium text-gray-900 mb-6 hover:text-[#BF5700] transition-colors"
          >
            Angel Zepeda
          </button>
          
          <nav className="space-y-2">
            <button
              onClick={() => handleNavigation('/about', 'about')}
              className={`block w-full text-left transition-colors ${
                displayCurrentView === 'about' 
                  ? 'text-[#BF5700]' 
                  : 'text-gray-600 hover:text-[#BF5700]'
              }`}
            >
              → About
            </button>
            <button
              onClick={() => handleNavigation('/writing', 'writing')}
              className={`block w-full text-left transition-colors ${
                displayCurrentView === 'writing' 
                  ? 'text-[#BF5700]' 
                  : 'text-gray-600 hover:text-[#BF5700]'
              }`}
            >
              → Writing
            </button>
            <button
              onClick={() => handleNavigation('/projects', 'projects')}
              className={`block w-full text-left transition-colors ${
                displayCurrentView === 'projects' 
                  ? 'text-[#BF5700]' 
                  : 'text-gray-600 hover:text-[#BF5700]'
              }`}
            >
              → Projects
            </button>
          </nav>
        </div>
        
        <div className="flex space-x-3 mb-8">
          <a 
            href="https://www.linkedin.com/in/zepangel/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#BF5700] transition-colors hover:drop-shadow-[0_0_8px_rgba(191,87,0,0.6)]"
          >
            <img 
              src="/linkedin.png" 
              alt="LinkedIn" 
              className="w-[18px] h-[18px] opacity-60 hover:opacity-100 transition-opacity"
            />
          </a>
          <a 
            href="https://x.com/angelzep_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#BF5700] transition-colors hover:drop-shadow-[0_0_8px_rgba(191,87,0,0.6)]"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a 
            href="mailto:azcareers00@gmail.com"
            className="text-gray-400 hover:text-[#BF5700] transition-colors hover:drop-shadow-[0_0_8px_rgba(191,87,0,0.6)]"
          >
            <Mail size={18} />
          </a>
        </div>
        
        <div className="mt-auto">
          <p className="text-sm text-gray-500">ATX 2025</p>
        </div>
      </div>

      {/* Mobile Top Toolbar - visible on screens below md */}
      <div className="md:hidden bg-[#F4F3EF] w-full">
        {/* Name row */}
        <div className="text-center py-4 border-b border-gray-200">
          <button 
            onClick={handleLogoClick}
            className="text-xl font-medium text-gray-900 hover:text-[#BF5700] transition-colors"
          >
            Angel Zepeda
          </button>
        </div>
        
        {/* Navigation row */}
        <div className="flex justify-center items-center py-3 border-b border-gray-200">
          <nav className="flex space-x-6">
            <button
              onClick={() => handleNavigation('/about', 'about')}
              className={`transition-colors ${
                displayCurrentView === 'about' 
                  ? 'text-[#BF5700] font-medium' 
                  : 'text-gray-600 hover:text-[#BF5700]'
              }`}
            >
              About
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleNavigation('/writing', 'writing')}
              className={`transition-colors ${
                displayCurrentView === 'writing' 
                  ? 'text-[#BF5700] font-medium' 
                  : 'text-gray-600 hover:text-[#BF5700]'
              }`}
            >
              Writing
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleNavigation('/projects', 'projects')}
              className={`transition-colors ${
                displayCurrentView === 'projects' 
                  ? 'text-[#BF5700] font-medium' 
                  : 'text-gray-600 hover:text-[#BF5700]'
              }`}
            >
              Projects
            </button>
          </nav>
        </div>
        
        {/* Social buttons row */}
        <div className="flex justify-center items-center py-3 space-x-4">
          <a 
            href="https://www.linkedin.com/in/zepangel/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-[#BF5700] transition-colors hover:drop-shadow-[0_0_8px_rgba(191,87,0,0.6)]"
          >
            <img 
              src="/linkedin.png" 
              alt="LinkedIn" 
              className="w-[18px] h-[18px] opacity-60 hover:opacity-100 transition-opacity"
            />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a 
            href="https://x.com/angelzep_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-[#BF5700] transition-colors hover:drop-shadow-[0_0_8px_rgba(191,87,0,0.6)]"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm"></span>
          </a>
          <a 
            href="mailto:azcareers00@gmail.com"
            className="flex items-center space-x-2 text-gray-600 hover:text-[#BF5700] transition-colors hover:drop-shadow-[0_0_8px_rgba(191,87,0,0.6)]"
          >
            <Mail size={18} />
            <span className="text-sm">Email</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;