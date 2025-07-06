import { Post } from '../types/Post';
import { PostService } from '../services/postService';

// Legacy functions that now use Supabase
export const getPosts = async (): Promise<Post[]> => {
  return await PostService.getPosts();
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
  const post = await PostService.getPostById(id);
  return post || undefined;
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const post = await PostService.getPostBySlug(slug);
  return post || undefined;
};

// Remove all editing functionality - posts are managed only through backend
export const defaultPosts: Post[] = [];