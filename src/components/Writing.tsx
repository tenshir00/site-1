import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostService } from '../services/postService';
import { Post } from '../types/Post';

const Writing = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('mixed'); // Default to 'mixed'
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await PostService.getPosts();
        console.log('Loaded posts:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Reorder categories with Mixed first
  const categories = [
    { id: 'mixed', name: 'Mixed', color: '#757575' },
    { id: 'technology', name: 'Technology', color: '#1976D2' },
    { id: 'finance', name: 'Finance', color: '#7B1FA2' },
    { id: 'personal', name: 'Personal', color: '#FF9800' }
  ];

  const getCategoryColor = (category: string) => {
    const categoryMap = {
      'technology': '#1976D2',
      'finance': '#7B1FA2',
      'personal': '#FF9800',
      'mixed': '#757575'
    };
    return categoryMap[category as keyof typeof categoryMap] || '#757575';
  };

  // Filter posts based on selected category - check if category is in allCategories array
  const filteredPosts = selectedCategory 
    ? posts.filter(post => {
        console.log(`Filtering post "${post.title}" for category "${selectedCategory}"`);
        console.log('Post all categories:', post.allCategories);
        
        // Check if the selected category is in the post's categories array
        const hasCategory = post.allCategories && post.allCategories.includes(selectedCategory);
        console.log('Has category:', hasCategory);
        
        return hasCategory;
      })
    : posts;

  console.log('Selected category:', selectedCategory);
  console.log('Filtered posts:', filteredPosts);

  const handlePostClick = (post: Post) => {
    // Navigate using the slug for clean URLs
    navigate(`/${post.slug}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    console.log('Category clicked:', categoryId, 'New selection:', newCategory);
    setSelectedCategory(newCategory);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Writing
          </h2>
          <p className="text-gray-600 mb-8">
            Field notes on finance, technology, and digital life.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Writing
        </h2>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          <span className="line-clamp-2">Field notes on finance, technology, and digital life.</span>
        </p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors text-sm md:text-base"
            >
              <div 
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all duration-200`}
                style={{ 
                  backgroundColor: (selectedCategory === category.id || hoveredCategory === category.id) 
                    ? category.color 
                    : 'transparent',
                  borderColor: category.color
                }}
              ></div>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-12">
        {filteredPosts.map((post, index) => (
          <article 
            key={index} 
            className="group cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center space-x-4 mb-3">
              {/* Show all categories if available, otherwise show primary */}
              {post.allCategories && post.allCategories.length > 0 ? (
                <div className="flex items-center space-x-3">
                  {post.allCategories.slice(0, 2).map((category, catIndex) => (
                    <div key={catIndex} className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getCategoryColor(category) }}
                      ></div>
                      <span className="font-medium capitalize text-gray-500">
                        {category}
                      </span>
                    </div>
                  ))}
                  {post.allCategories.length > 2 && (
                    <span className="text-gray-400 text-sm">+{post.allCategories.length - 2} more</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getCategoryColor(post.category) }}
                  ></div>
                  <span className="font-medium capitalize text-gray-500">
                    {post.category}
                  </span>
                </div>
              )}
              <span className="text-gray-500">
                {post.date}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {post.description}
            </p>
          </article>
        ))}
        
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {selectedCategory ? 'No posts found in this category.' : 'No posts available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Writing;