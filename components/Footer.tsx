import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">AffiliatePro AI</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Your ultimate destination for curated products and intelligent shopping advice. 
              We leverage cutting-edge AI to help you find exactly what you need at the best prices.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
               <p className="text-xs text-gray-500">Subscribe to our newsletter</p>
               <div className="flex mt-2">
                 <input type="email" placeholder="Email" className="bg-gray-800 text-white text-xs p-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                 <button className="bg-indigo-600 px-3 py-2 rounded-r-md text-xs hover:bg-indigo-700">OK</button>
               </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; 2024 AffiliatePro AI. All rights reserved.</p>
          <p className="text-xs text-gray-600 mt-2">
            Disclosure: We earn a commission if you click this link and make a purchase at no additional cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
