export interface Project {
  id: string;
  title: string;
  subheader?: string;
  date: string;
  tags: string[];
  external_url: string;
  created_at?: string;
  updated_at?: string;
}