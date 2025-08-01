import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { PostService } from '../services/postService';
import { Post } from '../types/Post';

const PostView = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const fetchedPost = await PostService.getPostBySlug(slug);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const getCategoryColor = (category: string) => {
    const categoryMap = {
      'technology': '#1976D2',
      'finance': '#7B1FA2',
      'personal': '#FF9800',
      'mixed': '#757575'
    };
    return categoryMap[category as keyof typeof categoryMap] || '#757575';
  };

  const formatDate = (dateString: string) => {
    try {
      // First try to parse as ISO string (from database)
      let date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // If parsing failed, it might be a pre-formatted string like "January 2024"
        if (dateString && typeof dateString === 'string' && dateString.includes(' ')) {
          return dateString;
        }
        return 'Date unavailable';
      }
      
      // Format the date consistently
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <button
            onClick={() => navigate('/writing')}
            className="text-[#BF5700] hover:underline"
          >
            ← Back to Writing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F3EF]">
      {/* Desktop Sidebar */}
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
              onClick={() => handleNavigation('/about')}
              className="block w-full text-left text-gray-600 hover:text-[#BF5700] transition-colors"
            >
              → About
            </button>
            <button
              onClick={() => handleNavigation('/writing')}
              className="block w-full text-left text-[#BF5700]"
            >
              → Writing
            </button>
            <button
              onClick={() => handleNavigation('/projects')}
              className="block w-full text-left text-gray-600 hover:text-[#BF5700] transition-colors"
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

      {/* Mobile Top Toolbar */}
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
              onClick={() => handleNavigation('/about')}
              className="text-gray-600 hover:text-[#BF5700] transition-colors"
            >
              About
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleNavigation('/writing')}
              className="text-[#BF5700] font-medium"
            >
              Writing
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleNavigation('/projects')}
              className="text-gray-600 hover:text-[#BF5700] transition-colors"
            >
              Projects
            </button>
          </nav>
        </div>
        
        {/* Social buttons row with back button */}
        <div className="flex justify-center items-center py-3 space-x-4">
          <button
            onClick={() => navigate('/writing')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#BF5700] transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <span className="text-gray-300">|</span>
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
      
      {/* Main content */}
      <div className="md:ml-48">
        <div className="max-w-4xl md:px-4 md:py-8 px-4 py-4">
          {/* Desktop: Header with back button */}
          <div className="hidden md:flex mb-6 -mt-2 items-start space-x-4 ml-4">
            {/* Back button positioned to the left */}
            <button
              onClick={() => navigate('/writing')}
              className="text-gray-600 hover:text-[#BF5700] transition-colors mt-1 -ml-8 flex-shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            
            {/* Header content */}
            <div className="flex-1 -ml-4 min-w-0">
              {/* Title with responsive font sizing to fit one line */}
              <h1 className="font-bold text-gray-900 mb-6 leading-tight break-words
                text-xl sm:text-2xl md:text-3xl lg:text-4xl
                max-w-full overflow-hidden">
                {post.title}
              </h1>
              
              {/* Show subheader if available */}
              {post.subheader && (
                <p className="text-gray-600 leading-relaxed mb-4 text-base md:text-lg lg:text-xl"
                   style={{ 
                     lineHeight: '1.7',
                     fontFamily: '"Monument Grotesk Variable", -apple-system, BlinkMacSystemFont, sans-serif',
                     fontWeight: '400'
                   }}>
                  {post.subheader}
                </p>
              )}
            </div>
          </div>

          {/* Mobile: Header without back button (back button is in toolbar) */}
          <div className="md:hidden mb-6">
            {/* Title with responsive font sizing to fit one line */}
            <h1 className="font-bold text-gray-900 mb-6 leading-tight break-words
              text-xl sm:text-2xl
              max-w-full overflow-hidden">
              {post.title}
            </h1>
            
            {/* Show subheader if available */}
            {post.subheader && (
              <p className="text-gray-600 leading-relaxed mb-4 text-base"
                 style={{ 
                   lineHeight: '1.7',
                   fontFamily: '"Monument Grotesk Variable", -apple-system, BlinkMacSystemFont, sans-serif',
                   fontWeight: '400'
                 }}>
                {post.subheader}
              </p>
            )}
          </div>

          {/* Meta information - aligned with title/subheader start (flush with body) */}
          <div className="flex items-center space-x-4 mb-8 pb-6 md:ml-4">
            {/* Show all categories if available, otherwise show primary category */}
            {post.allCategories && post.allCategories.filter(cat => cat !== 'mixed').length > 0 ? (
              <div className="flex items-center space-x-3">
                {post.allCategories.filter(cat => cat !== 'mixed').map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    ></div>
                    <span className="text-gray-600 capitalize text-sm md:text-base">{category}</span>
                  </div>
                ))}
              </div>
            ) : post.category !== 'mixed' && (
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getCategoryColor(post.category) }}
                ></div>
                <span className="text-gray-600 capitalize text-sm md:text-base">{post.category}</span>
              </div>
            )}
            <span className="text-gray-600 text-sm md:text-base">
              {formatDate(post.created_at || post.date)}
            </span>
          </div>

          {/* Main body content */}
          <div className="prose prose-lg max-w-none md:ml-4">
            <div 
              className="text-gray-800 leading-relaxed"
              style={{ 
                fontSize: window.innerWidth >= 768 ? '1.2rem' : '1.1rem', 
                lineHeight: '1.7',
                fontFamily: '"Monument Grotesk Variable", -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: '400'
              }}
              dangerouslySetInnerHTML={{ 
                __html: (post.body || post.content)
                  .replace(/\n\n/g, '</p><p class="mb-6">')
                  .replace(/\n/g, '<br>')
                  .replace(/^/, '<p class="mb-6">')
                  .replace(/$/, '</p>')
                  .replace(/# (.*?)<\/p>/g, '<h1 class="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900">$1</h1>')
                  .replace(/## (.*?)<\/p>/g, '<h2 class="text-xl md:text-2xl font-semibold mt-10 mb-5 text-gray-900">$2</h2>')
                  .replace(/### (.*?)<\/p>/g, '<h3 class="text-lg md:text-xl font-medium mt-8 mb-4 text-gray-900">$3</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostView;