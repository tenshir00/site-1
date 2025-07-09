/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `subheader` (text, optional description)
      - `date` (text, for month/year format like "January 2024")
      - `tags` (text array, for technology tags)
      - `external_url` (text, required link to project)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  subheader text,
  date text DEFAULT '',
  tags text[] DEFAULT '{}',
  external_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Insert sample projects
INSERT INTO projects (title, subheader, date, tags, external_url) VALUES
(
  'Infrastructure Dashboard',
  'A real-time monitoring dashboard for distributed systems with custom metrics and alerting.',
  'January 2024',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker'],
  'https://github.com/example/infrastructure-dashboard'
),
(
  'Design System',
  'A comprehensive design system and component library for modern web applications.',
  'March 2023',
  ARRAY['TypeScript', 'Storybook', 'Figma', 'CSS-in-JS'],
  'https://github.com/example/design-system'
),
(
  'CLI Tool',
  'A command-line interface for managing development workflows and deployment pipelines.',
  'June 2023',
  ARRAY['Go', 'Cobra', 'Docker', 'Kubernetes'],
  'https://github.com/example/cli-tool'
),
(
  'Mobile App',
  'A cross-platform mobile application for personal productivity and habit tracking.',
  'September 2022',
  ARRAY['React Native', 'TypeScript', 'Firebase', 'Redux'],
  'https://apps.apple.com/app/example-app'
);