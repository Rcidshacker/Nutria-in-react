
import React from 'react';
import { Button } from '../components/Button';
import { AppRoute } from '../types';

interface BlogsScreenProps {
  navigateTo: (route: AppRoute) => void;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 Superfoods for a Healthier You',
    author: 'Dr. Nutria',
    date: 'July 28, 2024',
    excerpt: 'Discover the power of nutrient-dense foods that can boost your energy and overall well-being...',
    imageUrl: 'https://picsum.photos/seed/superfoods/400/200'
  },
  {
    id: '2',
    title: 'Mindful Eating: A Beginner\'s Guide',
    author: 'Jane Wellness',
    date: 'July 25, 2024',
    excerpt: 'Learn how to connect with your food and improve your digestion with simple mindful eating techniques.',
    imageUrl: 'https://picsum.photos/seed/mindfuleating/400/200'
  },
  {
    id: '3',
    title: 'The Importance of Hydration for Fitness',
    author: 'Coach Hydro',
    date: 'July 22, 2024',
    excerpt: 'Water is crucial for performance and recovery. Find out how much you really need.',
    imageUrl: 'https://picsum.photos/seed/hydration/400/200'
  }
];

const BlogCard: React.FC<{ post: BlogPost; onReadMore: (id: string) => void }> = ({ post, onReadMore }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1">
    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover"/>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-nutria-green-700 dark:text-nutria-green-400 mb-2">{post.title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">By {post.author} on {post.date}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
      <Button onClick={() => onReadMore(post.id)} variant="link" className="text-nutria-green-600 dark:text-nutria-green-300">
        Read More &rarr;
      </Button>
    </div>
  </div>
);

export const BlogsScreen: React.FC<BlogsScreenProps> = ({ navigateTo }) => {
  const handleReadMore = (postId: string) => {
    alert(`Read More clicked for post ID: ${postId}. Full blog post view not yet implemented.`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Nutria Health Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleBlogPosts.map(post => (
          <BlogCard key={post.id} post={post} onReadMore={handleReadMore} />
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
        Stay tuned for more insightful articles!
      </p>
    </div>
  );
};
