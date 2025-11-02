'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Clock, TrendingUp, Bookmark, Share2, Eye, ChevronLeft, ChevronRight, Sparkles, Flame, Star } from 'lucide-react';

interface NewsArticle {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  time: string;
  views: string;
  trending: boolean;
  author: string;
  authorAvatar: string;
}

type Category = 'All' | 'World' | 'Business' | 'Sports' | 'Tech' | 'Entertainment';

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categories: Category[] = ['All', 'World', 'Business', 'Sports', 'Tech', 'Entertainment'];

  const dummyNews: NewsArticle[] = [
    {
      id: 1,
      category: 'Tech',
      title: 'Revolutionary AI Breakthrough Changes Industry Standards',
      description: 'Scientists unveil groundbreaking artificial intelligence system that promises to transform multiple sectors with unprecedented capabilities.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      time: '2 hours ago',
      views: '12.5K',
      trending: true,
      author: 'Sarah Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      category: 'Business',
      title: 'Global Markets Show Strong Recovery Amid Economic Shifts',
      description: 'Stock markets worldwide experience significant gains as investors respond to new economic indicators and policy changes.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop',
      time: '4 hours ago',
      views: '8.3K',
      trending: true,
      author: 'Michael Ross',
      authorAvatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      category: 'Sports',
      title: 'Championship Finals Set Record-Breaking Viewership Numbers',
      description: 'Historic sporting event captivates millions of viewers across the globe in an unforgettable showdown.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop',
      time: '5 hours ago',
      views: '15.2K',
      trending: false,
      author: 'Emma Wilson',
      authorAvatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      category: 'World',
      title: 'International Summit Addresses Climate Change Initiatives',
      description: 'World leaders convene to discuss comprehensive strategies for environmental sustainability and green energy.',
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=500&fit=crop',
      time: '6 hours ago',
      views: '9.7K',
      trending: false,
      author: 'James Park',
      authorAvatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 5,
      category: 'Entertainment',
      title: 'Award-Winning Film Breaks Box Office Records Worldwide',
      description: 'Latest cinematic release achieves unprecedented success, captivating audiences globally with stunning visuals.',
      image: 'https://images.unsplash.com/photo-1574267432644-f610a7f9ff6f?w=800&h=500&fit=crop',
      time: '8 hours ago',
      views: '11.4K',
      trending: false,
      author: 'Lisa Anderson',
      authorAvatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 6,
      category: 'Tech',
      title: 'New Smartphone Technology Promises Extended Battery Life',
      description: 'Innovative battery technology could revolutionize mobile device usage patterns for millions of users.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=500&fit=crop',
      time: '10 hours ago',
      views: '6.8K',
      trending: false,
      author: 'David Kim',
      authorAvatar: 'https://i.pravatar.cc/150?img=6'
    },
    {
      id: 7,
      category: 'Business',
      title: 'Startup Unicorns Reshape Investment Landscape',
      description: 'Emerging companies reach billion-dollar valuations, attracting major venture capital interest worldwide.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=500&fit=crop',
      time: '12 hours ago',
      views: '7.2K',
      trending: false,
      author: 'Rachel Green',
      authorAvatar: 'https://i.pravatar.cc/150?img=7'
    },
    {
      id: 8,
      category: 'World',
      title: 'Cultural Heritage Sites Receive UNESCO Recognition',
      description: 'Multiple historical landmarks gain protected status in effort to preserve global heritage for future generations.',
      image: 'https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=800&h=500&fit=crop',
      time: '14 hours ago',
      views: '5.9K',
      trending: false,
      author: 'Alex Turner',
      authorAvatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 9,
      category: 'Sports',
      title: 'Olympic Athletes Prepare for International Competition',
      description: 'Top performers from around the world intensify training regimens ahead of major sporting events.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=500&fit=crop',
      time: '16 hours ago',
      views: '10.1K',
      trending: false,
      author: 'Chris Martinez',
      authorAvatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 10,
      category: 'Entertainment',
      title: 'Music Festival Announces Star-Studded Lineup',
      description: 'Annual celebration brings together renowned artists from various genres for unforgettable performances.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop',
      time: '18 hours ago',
      views: '13.6K',
      trending: false,
      author: 'Nina Patel',
      authorAvatar: 'https://i.pravatar.cc/150?img=10'
    },
    {
      id: 11,
      category: 'Tech',
      title: 'Quantum Computing Advances Promise New Possibilities',
      description: 'Researchers achieve breakthrough in quantum technology, opening doors to revolutionary computing power.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=500&fit=crop',
      time: '20 hours ago',
      views: '8.9K',
      trending: false,
      author: 'Tom Bradley',
      authorAvatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
      id: 12,
      category: 'Business',
      title: 'E-commerce Giants Expand Global Operations',
      description: 'Major online retailers invest billions in infrastructure to meet growing consumer demand worldwide.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
      time: '22 hours ago',
      views: '6.4K',
      trending: false,
      author: 'Sophie Lee',
      authorAvatar: 'https://i.pravatar.cc/150?img=12'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setNews(dummyNews);
      setLoading(false);
    }, 800);
  }, []);

  const filteredNews: NewsArticle[] = activeCategory === 'All' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  const scrollContainer = (direction: 'left' | 'right', id: string): void => {
    const container = document.getElementById(id);
    const scrollAmount = 400;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50'}`}>
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-0 -left-4 w-72 h-72 ${darkMode ? 'bg-blue-700' : 'bg-blue-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
        <div className={`absolute top-0 -right-4 w-72 h-72 ${darkMode ? 'bg-purple-700' : 'bg-purple-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-8 left-20 w-72 h-72 ${darkMode ? 'bg-pink-700' : 'bg-pink-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>
      </div>

      <nav className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-all duration-500 ${darkMode ? 'bg-slate-900/70 border-slate-700/30 shadow-2xl shadow-slate-900/50' : 'bg-white/70 border-slate-200/50 shadow-xl shadow-slate-200/50'}`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 transform hover:scale-110 hover:rotate-3 transition-all duration-500">
                  <Sparkles className="text-white" size={28} strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className={`text-3xl font-black tracking-tight bg-gradient-to-r ${darkMode ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent drop-shadow-lg`}>
                  NewsHub
                </h1>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'} flex items-center space-x-1`}>
                  <Star size={12} className="text-yellow-500" />
                  <span>Premium News Experience</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative p-4 rounded-2xl transition-all duration-500 hover:scale-110 group ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-700 shadow-2xl shadow-slate-900/50' : 'bg-gradient-to-br from-white to-slate-100 shadow-2xl shadow-slate-300/50'}`}
            >
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${darkMode ? 'bg-yellow-500/20 opacity-100' : 'bg-slate-800/10 opacity-0 group-hover:opacity-100'}`}></div>
              {darkMode ? <Sun className="relative text-yellow-400 drop-shadow-lg" size={24} /> : <Moon className="relative text-slate-700" size={24} />}
            </button>
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-6 pt-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-8 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                  activeCategory === category
                    ? darkMode
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-blue-500/50'
                      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50'
                    : darkMode
                    ? 'text-slate-300 hover:bg-slate-800/60 border-2 border-slate-700/50 backdrop-blur-sm'
                    : 'text-slate-700 hover:bg-white/80 border-2 border-slate-200/50 backdrop-blur-sm shadow-lg'
                }`}
              >
                {activeCategory === category && <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 blur-xl"></div>}
                <span className="relative">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
        {activeCategory === 'All' && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className={`relative p-3 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-orange-600/30 to-red-600/30 backdrop-blur-xl' : 'bg-gradient-to-br from-orange-200 to-red-200 backdrop-blur-xl'}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                  <Flame className={`relative ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} size={32} />
                </div>
                <div>
                  <h2 className={`text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Trending Now</h2>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Hot stories everyone&apos;s reading</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => scrollContainer('left', 'trending-scroll')} className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 ${darkMode ? 'bg-slate-800/80 text-white shadow-2xl' : 'bg-white/80 text-slate-900 shadow-2xl'}`}>
                  <ChevronLeft size={22} />
                </button>
                <button onClick={() => scrollContainer('right', 'trending-scroll')} className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 ${darkMode ? 'bg-slate-800/80 text-white shadow-2xl' : 'bg-white/80 text-slate-900 shadow-2xl'}`}>
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
            
            <div id="trending-scroll" className="flex space-x-8 overflow-x-auto pb-6 scrollbar-hide scroll-smooth">
              {news.filter(item => item.trending).map((item) => (
                <article key={item.id} className={`relative flex-shrink-0 w-[550px] group rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.03] cursor-pointer ${darkMode ? 'bg-slate-800/50 backdrop-blur-xl shadow-2xl' : 'bg-white/80 backdrop-blur-xl shadow-2xl'}`}>
                  <div className="relative overflow-hidden h-96">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute top-6 left-6 flex items-center space-x-3">
                      <span className="px-5 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl flex items-center space-x-2">
                        <Flame size={16} />
                        <span>TRENDING</span>
                      </span>
                      <span className={`px-5 py-2.5 rounded-full text-xs font-bold ${darkMode ? 'bg-slate-900/90 text-white' : 'bg-white/95 text-slate-900'} backdrop-blur-xl shadow-2xl`}>{item.category}</span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-black text-white mb-4 line-clamp-2 drop-shadow-2xl">{item.title}</h3>
                      <div className="flex items-center space-x-4 text-white/90 text-sm backdrop-blur-sm bg-black/20 rounded-xl px-4 py-2 w-fit">
                        <div className="flex items-center space-x-2">
                          <img src={item.authorAvatar} alt={item.author} className="w-8 h-8 rounded-full border-2 border-white/50" />
                          <span className="font-bold">{item.author}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-2">
                          <Eye size={16} />
                          <span>{item.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className={`text-base mb-6 line-clamp-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.description}</p>
                    <div className="flex items-center justify-between">
                      <button className="px-8 py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:scale-105 transition-all">Read Full Story →</button>
                      <div className="flex items-center space-x-3">
                        <button className={`p-3.5 rounded-2xl ${darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'} hover:scale-110 transition-all`}><Bookmark size={18} /></button>
                        <button className={`p-3.5 rounded-2xl ${darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'} hover:scale-110 transition-all`}><Share2 size={18} /></button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{activeCategory === 'All' ? 'Latest Stories' : activeCategory}</h2>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{filteredNews.length} articles</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => scrollContainer('left', 'latest-scroll')} className={`p-4 rounded-2xl transition-all hover:scale-110 ${darkMode ? 'bg-slate-800/80 text-white shadow-2xl' : 'bg-white/80 text-slate-900 shadow-2xl'}`}>
              <ChevronLeft size={22} />
            </button>
            <button onClick={() => scrollContainer('right', 'latest-scroll')} className={`p-4 rounded-2xl transition-all hover:scale-110 ${darkMode ? 'bg-slate-800/80 text-white shadow-2xl' : 'bg-white/80 text-slate-900 shadow-2xl'}`}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div id="latest-scroll" className="flex space-x-8 overflow-x-auto pb-6 scrollbar-hide scroll-smooth">
          {filteredNews.map((item) => (
            <article key={item.id} className={`flex-shrink-0 w-[380px] group rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.05] cursor-pointer ${darkMode ? 'bg-slate-800/50 backdrop-blur-xl shadow-2xl' : 'bg-white/80 backdrop-blur-xl shadow-2xl'}`}>
              <div className="relative overflow-hidden h-64">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className={`px-4 py-2 rounded-xl text-xs font-bold ${darkMode ? 'bg-slate-900/90 text-white' : 'bg-white/95 text-slate-900'} backdrop-blur-xl shadow-2xl`}>{item.category}</span>
                  <button className={`p-2.5 rounded-xl opacity-0 group-hover:opacity-100 ${darkMode ? 'bg-slate-900/80 text-white' : 'bg-white/90 text-slate-900'} shadow-2xl transition-all`}><Bookmark size={16} /></button>
                </div>
                <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center space-x-2 text-white text-xs bg-black/40 rounded-lg px-3 py-2 w-fit backdrop-blur-sm">
                    <Eye size={14} />
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <img src={item.authorAvatar} alt={item.author} className="w-7 h-7 rounded-full" />
                  <div>
                    <p className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.author}</p>
                    <div className="flex items-center space-x-1">
                      <Clock size={10} className="text-slate-500" />
                      <span className="text-xs text-slate-500">{item.time}</span>
                    </div>
                  </div>
                </div>
                <h3 className={`text-base font-bold mb-3 line-clamp-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.description}</p>
                <button className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] transition-all shadow-lg">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
