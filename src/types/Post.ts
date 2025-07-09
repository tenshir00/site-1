export interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'technology' | 'finance' | 'personal' | 'mixed';
  date: string;
  description: string; // Preview text shown on writing page
  content: string; // Full content (subheader + body) for article view
  tags: string[];
  published: boolean;
  allCategories?: string[]; // Optional field for all linked categories
  subheader?: string; // Subheader shown under title in article view
  body?: string; // Main body content in article view
  created_at?: string; // Raw timestamp from database
}

export interface PostFormData {
  title: string;
  category: 'technology' | 'finance' | 'personal' | 'mixed';
  description: string;
  content: string;
  tags: string[];
  published: boolean;
}