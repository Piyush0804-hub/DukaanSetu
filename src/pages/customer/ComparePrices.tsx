import { TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ComparePrices() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 pb-24 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Can we save you money?</h1>
        <p className="text-gray-500">Same products. Different stores. Your choice.</p>
      </div>

      <div className="bg-kirana-50 border border-kirana-200 rounded-2xl p-6 mb-10">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Your Typical Monthly Basket</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-white border border-gray-200 text-sm px-3 py-1.5 rounded-full">Tata Salt 1kg</span>
          <span className="bg-white border border-gray-200 text-sm px-3 py-1.5 rounded-full">Aashirvaad Atta 5kg</span>
          <span className="bg-white border border-gray-200 text-sm px-3 py-1.5 rounded-full">Amul Milk 1L</span>
          <span className="bg-white border border-gray-200 text-sm px-3 py-1.5 rounded-full">Parle-G 1kg</span>
          <span className="bg-white border border-gray-200 text-sm px-3 py-1.5 rounded-full">Maggi 70g</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border-2 border-brand-primary relative shadow-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Best Price
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Gupta General Store</h3>
            <p className="text-xs text-gray-500 mb-4">0.5 km away</p>
            
            <div className="text-3xl font-bold text-brand-primary mb-1">₹489</div>
            <p className="text-sm font-medium text-brand-primary flex items-center gap-1 mb-6">
              <TrendingDown className="w-4 h-4" /> Save ₹26
            </p>
            
            <button 
              onClick={() => navigate('/search')}
              className="w-full bg-kirana-100 text-brand-primary hover:bg-brand-primary hover:text-white transition font-bold py-2 rounded-lg text-sm"
            >
              Shop from here
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 opacity-80">
            <h3 className="font-bold text-gray-900 mb-1">Sharma Supermart</h3>
            <p className="text-xs text-gray-500 mb-4">1.2 km away</p>
            
            <div className="text-3xl font-bold text-gray-900 mb-1">₹497</div>
            <p className="text-sm font-medium text-transparent mb-6">Spacer</p>
            
            <button 
              onClick={() => navigate('/search')}
              className="w-full bg-gray-50 text-gray-700 hover:bg-gray-100 transition font-bold py-2 rounded-lg text-sm"
            >
              Shop from here
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 opacity-60">
            <h3 className="font-bold text-gray-900 mb-1">Daily Needs Shop</h3>
            <p className="text-xs text-gray-500 mb-4">2.1 km away</p>
            
            <div className="text-3xl font-bold text-gray-900 mb-1">₹515</div>
            <p className="text-sm font-medium text-transparent mb-6">Spacer</p>
            
            <button 
              onClick={() => navigate('/search')}
              className="w-full bg-gray-50 text-gray-700 hover:bg-gray-100 transition font-bold py-2 rounded-lg text-sm"
            >
              Shop from here
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-bold text-gray-800 mb-4">How it works</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center text-xl mb-2 shadow-sm">🔍</div>
            <p className="text-sm font-medium text-gray-600">Search Product</p>
          </div>
          <div className="hidden md:block w-8 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full border border-brand-primary/30 flex items-center justify-center text-xl mb-2 shadow-sm">⚖️</div>
            <p className="text-sm font-medium text-gray-600">Compare Nearby</p>
          </div>
          <div className="hidden md:block w-8 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center text-xl mb-2 shadow-sm">🛒</div>
            <p className="text-sm font-medium text-gray-900">Choose & Order</p>
          </div>
        </div>
      </div>
    </div>
  );
}
