// --- START OF NEW FILE: screens/profile/BlogScreen.tsx ---

import React from 'react';
import { BlogPost } from '../../types'; // We will add this type in the next step
import { ArrowRight } from 'lucide-react';
import { PRIMARY_COLOR_CLASS } from '../../constants';

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Importance of Hydration for Optimal Health',
    author: 'Dr. Jane Doe',
    date: 'June 10, 2025',
    imageUrl: 'https://picsum.photos/seed/hydration/400/300',
    excerpt: 'Staying hydrated is crucial for everything from regulating body temperature to preventing infections and keeping organs functioning properly.'
  },
  {
    id: '2',
    title: 'Understanding Macronutrients: Carbs, Fats, and Proteins',
    author: 'John Smith, R.D.',
    date: 'June 05, 2025',
    imageUrl: 'https://picsum.photos/seed/macros/400/300',
    excerpt: 'Learn the role each macronutrient plays in your body and how to balance them for your specific fitness goals.'
  },
  {
    id: '3',
    title: 'Top 5 Exercises for a Stronger Core',
    author: 'Alex Ray',
    date: 'May 28, 2025',
    imageUrl: 'https://picsum.photos/seed/core-exercises/400/300',
    excerpt: 'A strong core is the foundation of all movement. Discover five essential exercises to build stability and strength.'
  },
];

export const BlogScreen: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Health & Wellness Blog</h2>

      <div className="space-y-6">
        {mockBlogPosts.map(post => (
          <button
            key={post.id}
            onClick={() => alert(`Navigating to blog post: "${post.title}" (not implemented).`)}
            className="w-full text-left bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row items-center transform transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]"
          >
            <img src={post.imageUrl} alt={post.title} className="w-full md:w-48 h-32 md:h-full object-cover flex-shrink-0" />
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-peach-100 mb-1">{post.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  By {post.author} on {post.date}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className={`mt-3 text-sm font-semibold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 flex items-center`}>
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- END OF NEW FILE: screens/profile/BlogScreen.tsx ---