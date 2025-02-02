import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, User2 } from 'lucide-react';

const blogPosts = [
  {
    title: "Understanding Anxiety: Signs, Symptoms, and Coping Strategies",
    excerpt: "Learn about the different types of anxiety disorders, how to recognize their symptoms, and effective strategies for managing anxiety in daily life.",
    author: "Dr. Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    title: "The Power of Mindfulness in Mental Health",
    excerpt: "Discover how mindfulness practices can improve your mental well-being, reduce stress, and help you stay present in the moment.",
    author: "Mark Thompson",
    date: "March 12, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    title: "Building Resilience Through Difficult Times",
    excerpt: "Explore practical techniques for developing emotional resilience and maintaining mental strength during challenging periods in life.",
    author: "Dr. Emily Chen",
    date: "March 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800&h=500"
  }
];

function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Mental Health Insights & Stories
          </h1>
          <p className="text-purple-200">
            Explore our collection of articles, research, and personal stories about mental health, wellness, and recovery.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {blogPosts.map((post, index) => (
            <article key={index} className="group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={post.image}
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                alt={post.title}
              />
              <div className="p-6">
                <div className="flex items-center text-purple-300 text-sm mb-4">
                  <User2 className="w-4 h-4 mr-1" />
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mb-3 text-xl font-bold leading-snug text-white">
                  {post.title}
                </h2>
                <p className="mb-4 text-purple-200">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
