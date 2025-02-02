import React from 'react';
import { BookOpen, Download, ExternalLink, Phone, Users, Video } from 'lucide-react';

const resources = [
  {
    category: "Self-Help Guides",
    items: [
      {
        title: "Stress Management Toolkit",
        description: "A comprehensive guide with practical exercises and techniques for managing stress.",
        icon: BookOpen,
        link: "#"
      },
      {
        title: "Meditation Basics",
        description: "Learn the fundamentals of meditation with guided audio sessions.",
        icon: Video,
        link: "#"
      }
    ]
  },
  {
    category: "Support Networks",
    items: [
      {
        title: "Support Group Directory",
        description: "Find local and online support groups for various mental health concerns.",
        icon: Users,
        link: "#"
      },
      {
        title: "Crisis Hotlines",
        description: "24/7 emergency contact numbers and crisis support resources.",
        icon: Phone,
        link: "#"
      }
    ]
  }
];

const ResourceCard = ({ item }) => (
  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white/15">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/20">
          <item.icon className="w-6 h-6 text-purple-400" />
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
        <p className="text-purple-200 mb-4">{item.description}</p>
        <a
          href={item.link}
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          Access Resource
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  </div>
);

function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {/* Hero Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Mental Health Resources
          </h1>
          <p className="text-purple-200">
            Access our curated collection of mental health resources, tools, and support materials to help you on your wellness journey.
          </p>
        </div>

        {/* Featured Download */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Wellness Starter Kit
                </h2>
                <p className="text-purple-100">
                  Download our comprehensive guide to getting started with mental wellness.
                </p>
              </div>
              <button className="px-6 py-3 bg-white text-purple-900 rounded-lg hover:bg-purple-100 transition-colors flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </button>
            </div>
          </div>
        </div>

        {/* Resource Categories */}
        <div className="space-y-12">
          {resources.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-white mb-6">
                {category.category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {category.items.map((item, itemIndex) => (
                  <ResourceCard key={itemIndex} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;
