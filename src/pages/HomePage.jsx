import React from 'react';
import { Heart, Phone, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';
// import Questionnaire from './Questionnaire.tsx';
import Blog from './Blog.jsx';
import Resources from './Resources.jsx';
import Welcome from './Welcome.jsx';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('home');

  if (showQuestionnaire) {
    return <Welcome />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <Blog />;
      case 'resources':
        return <Resources />;
      default:
        return (
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h1 className="max-w-lg mb-6 font-sans text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl md:mx-auto">
                Your Journey to Mental Wellness Starts Here
              </h1>
              <p className="text-base text-purple-200 md:text-lg">
                We provide compassionate support, professional guidance, and resources to help you navigate life's challenges. You're not alone on this journey.
              </p>
            </div>

            {/* Cards */}
            <div className="grid gap-8 row-gap-5 md:grid-cols-2 lg:grid-cols-3 mb-16">
              <div className="relative p-px overflow-hidden transition duration-300 transform border rounded-2xl hover:scale-105 group hover:shadow-xl">
                <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-purple-400 group-hover:scale-x-100"></div>
                <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-purple-400 group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-purple-400 group-hover:scale-x-100"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-purple-400 group-hover:scale-y-100"></div>
                <div className="relative p-5 bg-white/10 rounded-2xl backdrop-blur-lg">
                  <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                    <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-purple-400 lg:mb-0">
                      <MessageCircle className="w-6 h-6 text-deep-purple-900" />
                    </div>
                    <h6 className="font-semibold leading-5 text-white">Game Therapy</h6>
                  </div>
                  <p className="mb-2 text-sm text-purple-200">
                    Connect with licensed therapists from the comfort of your home. Flexible scheduling and secure video sessions.
                  </p>
                  <a href="#" className="inline-flex items-center text-sm font-semibold text-white transition-colors duration-200 hover:text-purple-400">
                    Start <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>

              <div className="relative p-px overflow-hidden transition duration-300 transform border rounded-2xl hover:scale-105 group hover:shadow-xl">
                <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-purple-400 group-hover:scale-x-100"></div>
                <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-purple-400 group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-purple-400 group-hover:scale-x-100"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-purple-400 group-hover:scale-y-100"></div>
                <div className="relative p-5 bg-white/10 rounded-2xl backdrop-blur-lg">
                  <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                    <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-purple-400 lg:mb-0">
                      <Heart className="w-6 h-6 text-deep-purple-900" />
                    </div>
                    <h6 className="font-semibold leading-5 text-white">Music Therapy</h6>
                  </div>
                  <p className="mb-2 text-sm text-purple-200">
                    Join our supportive community. Share experiences and learn from others in a safe, moderated environment.
                  </p>
                  <a href="#" className="inline-flex items-center text-sm font-semibold text-white transition-colors duration-200 hover:text-purple-400">
                    Start <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>

              <div className="relative p-px overflow-hidden transition duration-300 transform border rounded-2xl hover:scale-105 group hover:shadow-xl">
                <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-purple-400 group-hover:scale-x-100"></div>
                <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-purple-400 group-hover:scale-y-100"></div>
                <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-purple-400 group-hover:scale-x-100"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-purple-400 group-hover:scale-y-100"></div>
                <div className="relative p-5 bg-white/10 rounded-2xl backdrop-blur-lg">
                  <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                    <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-purple-400 lg:mb-0">
                      <Phone className="w-6 h-6 text-deep-purple-900" />
                    </div>
                    <h6 className="font-semibold leading-5 text-white">Video Therapy</h6>
                  </div>
                  <p className="mb-2 text-sm text-purple-200">
                    24/7 emergency support when you need it most. Trained professionals ready to help in critical moments.
                  </p>
                  <a href="#" className="inline-flex items-center text-sm font-semibold text-white transition-colors duration-200 hover:text-purple-400">
                    Watch <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => setShowQuestionnaire(true)}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors duration-300 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      {/* Navbar */}
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white/10 backdrop-blur-lg">
        <a 
          className="text-2xl font-bold leading-none text-white flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          <Heart className="w-8 h-8 text-purple-400" />
          <span>MindGuru</span>
        </a>
        
        <div className="lg:hidden">
          <button 
            className="navbar-burger flex items-center text-purple-200 p-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li><a onClick={() => setCurrentPage('home')} className="text-sm text-purple-200 hover:text-white transition-colors cursor-pointer">Home</a></li>
          <li><a className="text-sm text-purple-200 hover:text-white transition-colors cursor-pointer">Services</a></li>
          <li><a onClick={() => setCurrentPage('resources')} className="text-sm text-purple-200 hover:text-white transition-colors cursor-pointer">Resources</a></li>
          <li><a className="text-sm text-purple-200 hover:text-white transition-colors cursor-pointer">About Us</a></li>
          <li><a onClick={() => setCurrentPage('blog')} className="text-sm text-purple-200 hover:text-white transition-colors cursor-pointer">Blog</a></li>
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a className="px-4 py-2 text-purple-200 hover:text-white transition-colors" href="#">
            <Phone className="w-5 h-5 inline-block mr-1" />
            Emergency: 988
          </a>
          <button 
            onClick={() => setShowQuestionnaire(true)}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            Take Assessment
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-menu relative z-50 lg:hidden">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-indigo-900 border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <a 
                className="mr-auto text-2xl font-bold leading-none text-white flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
              >
                <Heart className="w-8 h-8 text-purple-400" />
                <span>MindfulCare</span>
              </a>
              <button className="navbar-close" onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6 text-purple-200" />
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <a 
                    className="block p-4 text-sm text-purple-200 hover:bg-purple-800/50 hover:text-white rounded cursor-pointer"
                    onClick={() => {
                      setCurrentPage('home');
                      setIsMenuOpen(false);
                    }}
                  >
                    Home
                  </a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-sm text-purple-200 hover:bg-purple-800/50 hover:text-white rounded cursor-pointer">
                    Services
                  </a>
                </li>
                <li className="mb-1">
                  <a 
                    className="block p-4 text-sm text-purple-200 hover:bg-purple-800/50 hover:text-white rounded cursor-pointer"
                    onClick={() => {
                      setCurrentPage('resources');
                      setIsMenuOpen(false);
                    }}
                  >
                    Resources
                  </a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-sm text-purple-200 hover:bg-purple-800/50 hover:text-white rounded cursor-pointer">
                    About Us
                  </a>
                </li>
                <li className="mb-1">
                  <a 
                    className="block p-4 text-sm text-purple-200 hover:bg-purple-800/50 hover:text-white rounded cursor-pointer"
                    onClick={() => {
                      setCurrentPage('blog');
                      setIsMenuOpen(false);
                    }}
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowQuestionnaire(true);
                  }}
                  className="block px-6 py-3 mb-3 w-full text-center bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  Take Assessment
                </button>
                <a className="block px-4 py-3 mb-2 text-purple-200 text-center hover:text-white transition-colors" href="#">
                  <Phone className="w-5 h-5 inline-block mr-1" />
                  Emergency: 988
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Page Content */}
      {renderPage()}
    </div>
  );
}

export default HomePage;
