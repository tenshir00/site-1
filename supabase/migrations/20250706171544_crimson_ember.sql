/*
  # Add description field and sample content

  1. Schema Changes
    - Add `description` column to `writing_posts` table for preview text
    - Update existing posts with proper descriptions and content

  2. Sample Data
    - Add meaningful descriptions for post previews
    - Add full article content for individual post views
    - Ensure posts have proper category relationships
*/

-- Add description column to writing_posts table
ALTER TABLE writing_posts 
ADD COLUMN IF NOT EXISTS description text DEFAULT '';

-- Update existing posts with proper descriptions and content
UPDATE writing_posts 
SET 
  description = 'Exploring the intersection of artificial intelligence and modern software development practices, examining how AI tools are reshaping the way we build applications.',
  content = '# The Future of AI in Software Development

The landscape of software development is undergoing a profound transformation. As artificial intelligence becomes more sophisticated, we''re witnessing a fundamental shift in how applications are conceived, built, and maintained.

## The Current State

Today''s AI tools have moved beyond simple code completion. They''re becoming collaborative partners in the development process, capable of understanding context, suggesting architectural patterns, and even identifying potential security vulnerabilities before they become problems.

## What This Means for Developers

The role of the software developer is evolving. Rather than replacing human creativity and problem-solving, AI is amplifying our capabilities. We''re seeing developers become more strategic, focusing on high-level design decisions while AI handles routine implementation details.

## Looking Ahead

The next decade will likely bring even more dramatic changes. As AI systems become better at understanding business requirements and translating them into working code, the barrier to entry for software development will continue to lower.

This democratization of development tools presents both opportunities and challenges. While more people will be able to build software solutions, the need for experienced developers to guide architecture and ensure quality will become even more critical.'
WHERE title = 'Tech Article 1';

UPDATE writing_posts 
SET 
  description = 'A deep dive into emerging technologies that are reshaping industries, from blockchain applications to quantum computing breakthroughs.',
  content = '# Emerging Technologies Reshaping Our World

We''re living through one of the most exciting periods of technological innovation in human history. From quantum computing to advanced materials science, breakthrough technologies are moving from research labs to real-world applications.

## Quantum Computing: Beyond the Hype

Quantum computing has long been promised as the next revolutionary leap in computational power. Recent advances suggest we''re finally approaching practical applications that could transform cryptography, drug discovery, and financial modeling.

The key breakthrough isn''t just in building more stable qubits, but in developing algorithms that can run effectively on near-term quantum devices. This hybrid approach, combining classical and quantum processing, is opening new possibilities we''re only beginning to explore.

## Blockchain Beyond Cryptocurrency

While much attention has focused on digital currencies, the underlying blockchain technology is finding applications in supply chain management, digital identity verification, and decentralized autonomous organizations.

The real innovation lies in creating systems that are both transparent and efficient, solving real-world problems rather than just creating new financial instruments.

## The Integration Challenge

Perhaps the most interesting development is how these technologies are beginning to work together. AI systems that can optimize quantum algorithms, blockchain networks that secure AI training data, and quantum-resistant cryptography that protects blockchain transactions.

The future belongs to those who can see the connections between these emerging technologies and apply them to solve meaningful problems.'
WHERE title = 'Tech Article 2';

-- Ensure posts have proper slugs
UPDATE writing_posts 
SET slug = 'the-future-of-ai-in-software-development'
WHERE title = 'Tech Article 1' AND (slug IS NULL OR slug = 'tech-article-1');

UPDATE writing_posts 
SET slug = 'emerging-technologies-reshaping-our-world'
WHERE title = 'Tech Article 2' AND (slug IS NULL OR slug = 'tech-article-2');

-- Update titles to be more descriptive
UPDATE writing_posts 
SET title = 'The Future of AI in Software Development'
WHERE title = 'Tech Article 1';

UPDATE writing_posts 
SET title = 'Emerging Technologies Reshaping Our World'
WHERE title = 'Tech Article 2';