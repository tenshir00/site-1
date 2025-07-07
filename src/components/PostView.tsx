import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-48 h-full bg-[#F4F3EF] p-6 flex flex-col">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-medium text-gray-900 mb-6 hover:text-[#BF5700] transition-colors"
          >
            Angel Zepeda
          </button>
          
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/about')}
              className="block w-full text-left text-gray-600 hover:text-[#BF5700] transition-colors"
            >
              → About
            </button>
            <button
              onClick={() => navigate('/writing')}
              className="block w-full text-left text-[#BF5700]"
            >
              → Writing
            </button>
            <button
              onClick={() => navigate('/projects')}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
        
        <div className="mt-auto">
          <p className="text-sm text-gray-500">ATX 2025</p>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-48">
        <div className="max-w-4xl px-4 py-8">
          {/* Header with back button */}
          <div className="mb-6 -mt-2 flex items-start space-x-4 ml-4">
            {/* Back button positioned to the left */}
            <button
              onClick={() => navigate('/writing')}
              className="text-gray-600 hover:text-[#BF5700] transition-colors mt-1 -ml-8"
            >
              <ArrowLeft size={20} />
            </button>
            
            {/* Header content */}
            <div className="flex-1 -ml-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              {post.title}
            </h1>
            {/* Show subheader if available */}
            {post.subheader && (
              <p className="text-gray-600 leading-relaxed" style={{ 
                fontSize: '0.95rem', 
                lineHeight: '1.7',
              }}>
                {post.subheader}
              </p>
            )}
            </div>
          </div>

          {/* Meta information - show all categories */}
          <div className="flex items-center space-x-4 mb-8 pb-6 ml-4">
            {/* Show all categories if available, otherwise show primary category */}
            {post.allCategories && post.allCategories.filter(cat => cat !== 'mixed').length > 0 ? (
              <div className="flex items-center space-x-3">
                {post.allCategories.filter(cat => cat !== 'mixed').map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    ></div>
                    <span className="text-gray-600 capitalize">{category}</span>
                  </div>
                ))}
              </div>
            ) : post.category !== 'mixed' && (
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getCategoryColor(post.category) }}
                ></div>
                <span className="text-gray-600 capitalize">{post.category}</span>
              </div>
            )}
            <span className="text-gray-600">
              {new Date(post.created_at || post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>

          {/* Main body content */}
          <div className="prose prose-lg max-w-none ml-4">
            <div 
              className="text-gray-800 leading-relaxed"
              style={{ 
                fontSize: '0.95rem', 
                lineHeight: '1.7',
              }}
              dangerouslySetInnerHTML={{ 
                __html: (post.body || post.content)
                  .replace(/\n\n/g, '</p><p class="mb-6">')
                  .replace(/\n/g, '<br>')
                  .replace(/^/, '<p class="mb-6">')
                  .replace(/$/, '</p>')
                  .replace(/# (.*?)<\/p>/g, '<h1 class="text-xl font-medium mt-8 mb-4 text-gray-900">$1</h1>')
                  .replace(/## (.*?)<\/p>/g, '<h2 class="text-lg font-medium mt-6 mb-3 text-gray-900">$2</h2>')
                  .replace(/### (.*?)<\/p>/g, '<h3 class="text-base font-medium mt-4 mb-2 text-gray-900">$3</h3>')
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