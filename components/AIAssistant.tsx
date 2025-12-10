import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { getShoppingAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown'; // Assuming standard text, but if markdown is needed we can render it raw or use a library. For this specific prompt I will render raw or simple text processing to avoid extra deps if possible, but the prompt says use popular libraries. I will skip react-markdown to stay strictly within "handful of files" and no package.json changes request, but I will simulate it with basic line breaks.

// Actually, rendering markdown properly is better. I will assume basic text rendering for simplicity in a single file or use a simple parser if needed. 
// Given the constraints, I will just render text with whitespace-pre-wrap.

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m your AI Shopping Assistant. Looking for something specific? Ask me about our tech, home, or fashion deals!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getShoppingAdvice(userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format text with simple bolding if the model uses markdown-style **
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-indigo-900 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isOpen ? 'hidden' : 'flex'} bg-indigo-600 text-white`}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6 animate-pulse" />
      </button>

      {/* Chat Window */}
      <div
        id="ai-chat"
        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-96 bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl flex flex-col transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-indigo-600 p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center space-x-2 text-white">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold">AI Shopping Guide</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-indigo-200 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
              >
                <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                 <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="text-center mt-2">
             <span className="text-xs text-gray-400">Powered by Gemini AI</span>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIAssistant;
