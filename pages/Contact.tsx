
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiHelperText, setAiHelperText] = useState('');
  const [isAiHelping, setIsAiHelping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const generateHelp = async () => {
    setIsAiHelping(true);
    const prompt = "Help me draft a professional message to a web developer I want to hire for a simple website project. Keep it under 50 words.";
    const response = await getGeminiResponse(prompt);
    setAiHelperText(response);
    setIsAiHelping(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="fa-solid fa-check text-4xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Received!</h2>
        <p className="text-slate-600 mb-10">
          Thanks for reaching out. I'll get back to you within 24-48 business hours. 
          Looking forward to chatting!
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-indigo-600 font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Information */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Let's build something <span className="text-indigo-600">exceptional.</span></h1>
          <p className="text-lg text-slate-600 mb-12">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities, creative ideas, or minimalist design philosophies.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-envelope text-xl"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Email</h4>
                <p className="text-slate-900 font-medium text-lg">hello@minimalistdev.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-location-dot text-xl"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Location</h4>
                <p className="text-slate-900 font-medium text-lg">Remote / Global</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Socials</h4>
              <div className="flex space-x-4">
                {['linkedin', 'github', 'twitter'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:shadow-md transition-all">
                    <i className={`fa-brands fa-${social} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="mb-8 p-4 bg-indigo-50 rounded-2xl flex items-center justify-between">
            <p className="text-xs text-indigo-800 font-medium italic">
              "Need help finding the right words?"
            </p>
            <button 
              onClick={generateHelp}
              disabled={isAiHelping}
              className="text-[10px] bg-indigo-600 text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isAiHelping ? 'Thinking...' : 'AI Prompt Helper'}
            </button>
          </div>

          {aiHelperText && (
            <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 animate-in slide-in-from-top duration-300">
              <p className="mb-2 font-bold text-indigo-600">Suggested Message:</p>
              {aiHelperText}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
              <input
                required
                type="text"
                value={formState.subject}
                onChange={(e) => setFormState({...formState, subject: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Project Inquiry"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell me about your vision..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Sending...</>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
