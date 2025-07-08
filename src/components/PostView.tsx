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
      {/* Main content */}
      <div>
        <div className="max-w-4xl md:px-4 md:py-8 px-4 py-4">
          {/* Header with back button */}
          <div className="mb-6 md:-mt-2 flex items-start space-x-4">
            {/* Back button positioned to the left */}
            <button
              onClick={() => navigate('/writing')}
              className="text-gray-600 hover:text-[#BF5700] transition-colors mt-1"
            >
              <ArrowLeft size={20} />
            </button>
            
            {/* Header content */}
            <div className="flex-1">
            <h1 className="md:text-4xl text-3xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            {/* Show subheader if available */}
            {post.subheader && (
              <p className="text-gray-600 leading-relaxed" style={{ 
                fontSize: window.innerWidth >= 768 ? '1.2rem' : '1.1rem', 
                lineHeight: '1.7',
                fontFamily: '"Monument Grotesk Variable", -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: '400'
              }}>
                {post.subheader}
              </p>
            )}
            </div>
          </div>

          {/* Meta information - show all categories */}
          <div className="flex items-center space-x-4 mb-8 pb-6">
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
          <div className="prose prose-lg max-w-none">
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
                  .replace(/# (.*?)<\/p>/g, '<h1 class="text-3xl font-bold mt-12 mb-6 text-gray-900">$1</h1>')
                  .replace(/## (.*?)<\/p>/g, '<h2 class="text-2xl font-semibold mt-10 mb-5 text-gray-900">$2</h2>')
                  .replace(/### (.*?)<\/p>/g, '<h3 class="text-xl font-medium mt-8 mb-4 text-gray-900">$3</h3>')
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