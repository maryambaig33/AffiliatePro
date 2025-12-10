import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Trending Section */}
        <div id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
               Trending Now
             </h2>
             <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
               Our most popular picks this week. Grab them while they last!
             </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
            {MOCK_PRODUCTS.filter(p => p.isBestSeller).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Categories Sections */}
        {CATEGORIES.map((category, index) => {
           const categoryProducts = MOCK_PRODUCTS.filter(p => p.category === category.slug);
           if (categoryProducts.length === 0) return null;

           return (
             <div key={category.id} id={category.slug} className={`py-12 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      {category.name}
                    </h2>
                    <a href="#" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                      See all {category.name} &rarr;
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                    {categoryProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
             </div>
           );
        })}

        {/* Content/Blog Teaser */}
        <div className="bg-indigo-700">
           <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
             <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
               <span className="block">Ready to upgrade your gear?</span>
               <span className="block text-indigo-200">Get expert advice from our AI.</span>
             </h2>
             <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
               <div className="inline-flex rounded-md shadow">
                 <button 
                    onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                 >
                   Chat with AI
                 </button>
               </div>
             </div>
           </div>
        </div>

      </main>

      <AIAssistant />
      <Footer />
    </div>
  );
};

export default App;
