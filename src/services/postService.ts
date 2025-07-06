import { supabase } from '../lib/supabase'
import { Post } from '../types/Post'
import { slugify } from '../utils/slugify'

export class PostService {
  // Debug function to check database state
  static async debugDatabase(): Promise<void> {
    console.log('=== DATABASE DEBUG ===')
    
    // Check posts
    const { data: posts, error: postsError } = await supabase
      .from('writing_posts')
      .select('*')
    console.log('Posts:', posts, 'Error:', postsError)
    
    // Check categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
    console.log('Categories:', categories, 'Error:', catError)
    
    // Check post_categories
    const { data: postCategories, error: pcError } = await supabase
      .from('post_categories')
      .select('*')
    console.log('Post Categories:', postCategories, 'Error:', pcError)
    
    // Check post_categories with joins
    const { data: joinedData, error: joinError } = await supabase
      .from('post_categories')
      .select(`
        post_id,
        category_id,
        categories (
          id,
          name
        )
      `)
    console.log('Joined Post Categories:', joinedData, 'Error:', joinError)
  }

  // Get all published posts with their categories
  static async getPosts(): Promise<Post[]> {
    try {
      // Debug the database first
      await this.debugDatabase()
      
      // First, let's try a simpler query to debug
      const { data: posts, error: postsError } = await supabase
        .from('writing_posts')
        .select(`
          id,
          title,
          slug,
          content,
          created_at,
          updated_at
        `)
        .not('slug', 'is', null)
        .order('created_at', { ascending: false })

      if (postsError) {
        console.error('Error fetching posts:', postsError)
        return []
      }

      console.log('Raw posts data:', posts)

      if (!posts || posts.length === 0) {
        return []
      }

      // Now get categories for each post separately
      const postsWithCategories = await Promise.all(
        posts.map(async (post) => {
          const { data: postCategories, error: catError } = await supabase
            .from('post_categories')
            .select(`
              categories (
                id,
                name
              )
            `)
            .eq('post_id', post.id)

          if (catError) {
            console.error('Error fetching categories for post:', post.id, catError)
            return { ...post, post_categories: [] }
          }

          console.log(`Categories for post "${post.title}":`, postCategories)
          return { ...post, post_categories: postCategories || [] }
        })
      )

      console.log('Posts with categories:', postsWithCategories)

      return postsWithCategories?.map(this.transformDatabasePost) || []
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
          updated_at
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching post by ID:', error)
        return null
      }

      if (!post) return null

      // Get categories separately
      const { data: postCategories, error: catError } = await supabase
        .from('post_categories')
        .select(`
          categories (
            id,
            name
          )
        `)
        .eq('post_id', post.id)

      if (catError) {
        console.error('Error fetching categories for post:', post.id, catError)
      }

      const postWithCategories = { ...post, post_categories: postCategories || [] }
      return this.transformDatabasePost(postWithCategories)
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
          updated_at
        `)
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Error fetching post by slug:', error)
        return null
      }

      if (!post) return null

      // Get categories separately
      const { data: postCategories, error: catError } = await supabase
        .from('post_categories')
        .select(`
          categories (
            id,
            name
          )
        `)
        .eq('post_id', post.id)

      if (catError) {
        console.error('Error fetching categories for post:', post.id, catError)
      }

      const postWithCategories = { ...post, post_categories: postCategories || [] }
      return this.transformDatabasePost(postWithCategories)
    } catch (error) {
      console.error('Error in getPostBySlug:', error)
      return null
    }
  }

  // Transform database post to our Post type
  private static transformDatabasePost(dbPost: any): Post {
    // Debug: Log the transformation process
    console.log('Transforming post:', dbPost.title)
    console.log('Raw categories:', dbPost.post_categories)

    // Extract ALL categories from the join
    const categories = dbPost.post_categories || []
    let primaryCategory = 'mixed' // default fallback
    let allCategoryNames: string[] = []
    
    if (categories.length > 0) {
      // Get all category names
      allCategoryNames = categories
        .map((pc: any) => {
          console.log('Processing category:', pc.categories)
          return pc.categories?.name
        })
        .filter((name: string) => name) // Remove null/undefined
        .map((name: string) => {
          const mapped = this.mapCategoryName(name)
          console.log(`Mapping "${name}" to "${mapped}"`)
          return mapped
        })
      
      console.log('All mapped categories:', allCategoryNames)
      
      // Use the first category as primary, or 'mixed' if multiple
      if (allCategoryNames.length === 1) {
        primaryCategory = allCategoryNames[0]
      } else if (allCategoryNames.length > 1) {
        // If multiple categories, check if one is dominant or use 'mixed'
        primaryCategory = 'mixed'
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
      allCategories: allCategoryNames // Add this for reference
    }

    console.log('Final transformed post:', transformedPost)
    return transformedPost
  }

  // Map database category names to frontend categories
  private static mapCategoryName(dbCategoryName: string): string {
    const normalized = dbCategoryName.toLowerCase().trim()
    
    console.log(`Mapping category: "${dbCategoryName}" -> normalized: "${normalized}"`)
    
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
        console.log(`No mapping found for "${normalized}", defaulting to "mixed"`)
        return 'mixed'
    }
  }
}