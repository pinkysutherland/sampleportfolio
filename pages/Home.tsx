
import React, { useState } from 'react';
import { generateProjectIdea } from '../services/geminiService';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Minimal Clock',
    description: 'A precise, dark-themed analog clock built entirely with vanilla CSS and minimal JS logic.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: 'https://picsum.photos/seed/clock/600/400',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '2',
    title: 'Typo Landing',
    description: 'Focusing on typography and whitespace to create a high-converting agency landing page.',
    tags: ['Tailwind', 'Responsive', 'HTML'],
    imageUrl: 'https://picsum.photos/seed/landing/600/400',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'Recipe Deck',
    description: 'An interactive grid of cards for foodies, featuring smooth transitions and search filtering.',
    tags: ['JS Filters', 'Grid', 'Flexbox'],
    imageUrl: 'https://picsum.photos/seed/recipe/600/400',
    demoUrl: '#',
    githubUrl: '#'
  }
];

const Home: React.FC = () => {
  const [aiIdea, setAiIdea] = useState<{title: string, description: string} | null>(null);
  const [isLoadingIdea, setIsLoadingIdea] = useState(false);

  const fetchIdea = async () => {
    setIsLoadingIdea(true);
    const idea = await generateProjectIdea(['HTML5', 'Modern CSS', 'Vanilla JavaScript']);
    setAiIdea(idea);
    setIsLoadingIdea(false);
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Available for New Roles
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Clean code. <br />
            <span className="text-indigo-600">Simpler interfaces.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Hi, I'm a Web Developer specializing in the essential building blocks of the web. 
            I craft fast, beautiful, and functional experiences using HTML, CSS, and JavaScript.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#/about" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-medium rounded-full shadow-lg hover:bg-slate-800 transition-all hover:translate-y-[-2px]">
              View My Story
            </a>
            <a href="#/contact" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 font-medium rounded-full shadow-sm hover:bg-slate-50 transition-all">
              Contact Me
            </a>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Selected Work</h2>
              <p className="text-slate-500 mt-2">Projects that showcase my approach to the modern web.</p>
            </div>
            <a href="#" className="hidden sm:block text-indigo-600 font-medium hover:underline">
              View All Projects <i className="fa-solid fa-arrow-right ml-1"></i>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <a href={project.demoUrl} className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform">
                      <i className="fa-solid fa-link"></i>
                    </a>
                    <a href={project.githubUrl} className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Inspiration Generator */}
      <section className="py-20 bg-indigo-600 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-6">Need Project Inspiration?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            I've integrated Gemini AI to help fellow developers find their next simple web project idea. Try it out!
          </p>
          
          <button 
            onClick={fetchIdea}
            disabled={isLoadingIdea}
            className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isLoadingIdea ? (
              <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Thinking...</>
            ) : (
              <><i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Idea</>
            )}
          </button>

          {aiIdea && (
            <div className="mt-10 p-8 glass text-slate-900 rounded-3xl animate-in zoom-in duration-500 max-w-lg mx-auto border-none">
              <h4 className="text-xl font-bold mb-3 text-indigo-700">{aiIdea.title}</h4>
              <p className="text-slate-700 leading-relaxed italic">"{aiIdea.description}"</p>
            </div>
          )}
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Home;
