export interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'technology' | 'finance' | 'personal' | 'mixed';
  date: string;
  description: string;
  content: string;
  tags: string[];
  published: boolean;
  allCategories?: string[]; // Optional field for all linked categories
}

export interface PostFormData {
  title: string;
  category: 'technology' | 'finance' | 'personal' | 'mixed';
  description: string;
  content: string;
  tags: string[];
  published: boolean;
}