
import React, { useState, useRef, useEffect } from 'react';
import { Skill, Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const skills: Skill[] = [
  { name: 'HTML5', icon: 'fa-brands fa-html5', color: 'text-orange-500' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: 'text-blue-500' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'text-yellow-500' },
  { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: 'text-sky-500' },
  { name: 'Responsive Design', icon: 'fa-solid fa-mobile-screen', color: 'text-indigo-500' },
  { name: 'Git & GitHub', icon: 'fa-brands fa-github', color: 'text-slate-800' },
];

const About: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm the AI companion for this portfolio. Ask me anything about the developer's skills or philosophy!" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages: Message[] = [...chatMessages, { role: 'user', content: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    const context = "I am a new developer focused on simple, clean web design using vanilla technologies and modern CSS. I value accessibility and performance.";
    const response = await getGeminiResponse(userInput, context);
    
    setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="animate-in slide-in-from-bottom duration-700 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Profile / Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
            Obsessed with the <span className="text-indigo-600">Fundamentals.</span>
          </h1>
          <div className="prose prose-lg text-slate-600 leading-relaxed mb-12">
            <p className="mb-6">
              I believe that a truly great website doesn't need to be over-engineered. 
              My journey into web development started with a simple question: 
              "How can I make the internet more readable and accessible?"
            </p>
            <p className="mb-6">
              By focusing on the core triad—<strong>HTML, CSS, and JavaScript</strong>—I build 
              interfaces that are lightning-fast, easy to maintain, and a joy to use. I enjoy 
              stripping away the noise to let the content shine.
            </p>
            <p>
              When I'm not coding, you'll find me exploring typography, practicing minimal 
              design principles, or learning more about web performance metrics.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-6">Technical Toolkit</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <i className={`${skill.icon} ${skill.color} text-3xl mb-3`}></i>
                <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chat Bot Section */}
        <div className="sticky top-24">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-slate-900 p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Portfolio Assistant</h4>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Online</span>
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex items-center space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask me about my experience..."
                className="flex-grow px-4 py-2 text-sm bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
              <button 
                type="submit"
                className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md active:scale-90"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
