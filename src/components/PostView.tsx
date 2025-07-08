import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';
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
      // Handle both ISO strings and already formatted dates
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // If it's already a formatted string like "January 2024", return as is
        if (dateString && typeof dateString === 'string') {
          return dateString;
        }
        return 'Date unavailable';
      }
      
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
      {/* Sidebar for universal access */}
      <Sidebar 
        currentView="writing"
        onSectionChange={() => {}}
        onPhotoClick={() => navigate('/about')}
      />
      
      {/* Main content */}
      <div className="md:ml-48">
        <div className="max-w-4xl md:px-4 md:py-8 px-4 py-4">
          {/* Header with back button */}
          <div className="mb-6 md:-mt-2 flex items-start space-x-4 md:ml-4">
            {/* Back button positioned to the left */}
            <button
              onClick={() => navigate('/writing')}
              className="text-gray-600 hover:text-[#BF5700] transition-colors mt-1 md:-ml-8 flex-shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            
            {/* Header content */}
            <div className="flex-1 md:-ml-4 min-w-0">
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

          {/* Meta information - aligned with title/subheader start */}
          <div className="flex items-center space-x-4 mb-8 pb-6 ml-8 md:ml-4">
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