import { supabase } from '../lib/supabase'
import { Post } from '../types/Post'
import { slugify } from '../utils/slugify'

// Map database category names to frontend categories
function mapCategoryName(dbCategoryName: string): string {
  const normalized = dbCategoryName.toLowerCase().trim()
  
  switch (normalized) {
    case 'tech':
    case 'technology':
      return 'technology'
    case 'finance':
    case 'financial':
      return 'finance'
    case 'personal':
      return 'personal'
    case 'mixed':
    case 'general':
      return 'mixed'
    default:
      return 'mixed'
  }
}

export class PostService {
  // Get all published posts with their categories
  static async getPosts(): Promise<Post[]> {
    try {
      // Use the correct join syntax to get posts with all their categories
      const { data: posts, error: postsError } = await supabase
        .from('writing_posts')
        .select(`
          id,
          title,
          slug,
          content,
          created_at,
          updated_at,
          post_categories (
            categories (
              id,
              name
            )
          )
        `)
        .not('slug', 'is', null)
        .order('created_at', { ascending: false })

      if (postsError) {
        console.error('Error fetching posts:', postsError)
        return []
      }

      console.log('Raw posts with categories:', posts)

      return posts?.map(this.transformDatabasePost) || []
    } catch (error) {
      console.error('Error in getPosts:', error)
      return []
    }
  }

  // Get a single post by ID
  static async getPostById(id: string): Promise<Post | null> {
    try {
      const { data: post, error } = await supabase
        .from('writing_posts')
        .select(`
          id,
          title,
          slug,
          content,
          created_at,
          updated_at,
          post_categories (
            categories (
              id,
              name
            )
          )
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching post by ID:', error)
        return null
      }

      return post ? this.transformDatabasePost(post) : null
    } catch (error) {
      console.error('Error in getPostById:', error)
      return null
    }
  }

  // Get a single post by slug
  static async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      const { data: post, error } = await supabase
        .from('writing_posts')
        .select(`
          id,
          title,
          slug,
          content,
          created_at,
          updated_at,
          post_categories (
            categories (
              id,
              name
            )
          )
        `)
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Error fetching post by slug:', error)
        return null
      }

      return post ? this.transformDatabasePost(post) : null
    } catch (error) {
      console.error('Error in getPostBySlug:', error)
      return null
    }
  }

  // Transform database post to our Post type
  private static transformDatabasePost(dbPost: any): Post {
    console.log('Transforming post:', dbPost.title)
    console.log('Post categories data:', dbPost.post_categories)

    // Extract ALL categories from the join
    const categories = dbPost.post_categories || []
    let primaryCategory = 'mixed' // default fallback
    let allCategoryNames: string[] = []
    
    if (categories.length > 0) {
      // Get all category names from the nested structure
      allCategoryNames = categories
        .map((pc: any) => pc.categories?.name)
        .filter((name: string) => name) // Remove null/undefined
        .map(mapCategoryName) // Use the standalone function
      
      console.log('Extracted category names:', allCategoryNames)
      
      // Determine primary category
      if (allCategoryNames.length === 1) {
        primaryCategory = allCategoryNames[0]
      } else if (allCategoryNames.length > 1) {
        // If multiple categories, prefer specific ones over 'mixed'
        const specificCategories = allCategoryNames.filter(cat => cat !== 'mixed')
        if (specificCategories.length > 0) {
          primaryCategory = specificCategories[0] // Use first specific category
        } else {
          primaryCategory = 'mixed'
        }
      }
    }

    console.log('Final primary category:', primaryCategory)
    console.log('Final all categories:', allCategoryNames)

    // Format date
    const date = new Date(dbPost.created_at).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    })

    // Extract description from content (first paragraph or first 200 chars)
    let description = ''
    if (dbPost.content) {
      // Remove markdown headers and get first meaningful paragraph
      const cleanContent = dbPost.content
        .replace(/^#+\s+/gm, '') // Remove markdown headers
        .replace(/\n+/g, ' ') // Replace line breaks with spaces
        .trim()
      
      description = cleanContent.length > 200 
        ? cleanContent.substring(0, 200) + '...'
        : cleanContent
    }

    // Ensure we have a slug - use the database slug if available, otherwise generate one
    const postSlug = dbPost.slug || slugify(dbPost.title || 'untitled')

    const transformedPost = {
      id: dbPost.id,
      title: dbPost.title || 'Untitled',
      slug: postSlug,
      category: primaryCategory as Post['category'],
      date,
      description,
      content: dbPost.content || '',
      tags: allCategoryNames, // Store all categories as tags for display
      published: true, // All posts in DB are considered published
      allCategories: allCategoryNames // Add this for filtering
    }

    console.log('Final transformed post:', transformedPost)
    return transformedPost
  }
}