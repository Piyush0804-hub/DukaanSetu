import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Star, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { categories } from '../../data/mockData';

export default function CustomerHome() {
  const navigate = useNavigate();
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      const { data, error } = await supabase.from('stores').select('*').limit(8);
      if (!error && data) {
        setStores(data);
      }
      setLoading(false);
    }
    fetchStores();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get('q');
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24">
      {/* Hero Section */}
      <div className="bg-kirana-50 border border-kirana-100 rounded-2xl p-6 md:p-10 text-gray-900 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-sm">
        <div className="z-10 md:max-w-[60%]">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 font-serif">Shop Local. Compare Smart.</h1>
          <p className="text-gray-600 text-sm md:text-lg mb-6 leading-relaxed">
            Find groceries from trusted stores around you, compare prices, and order directly from your preferred local shop.
          </p>
          <div className="flex gap-3">
            <Link to="/search" className="bg-brand-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-primary/90 transition shadow-sm">
              Start Shopping
            </Link>
            <Link to="/compare" className="bg-white border border-kirana-200 text-gray-800 px-5 py-2.5 rounded-lg font-semibold hover:bg-kirana-50 transition shadow-sm">
              Compare Prices
            </Link>
          </div>
        </div>
        <div className="hidden md:block w-64 h-64 bg-kirana-100 rounded-full absolute -right-10 -bottom-10 opacity-50 blur-3xl"></div>
        <div className="z-10 bg-white p-4 rounded-xl transform rotate-3 shadow-md border border-kirana-100">
          <div className="text-4xl">🛒 🌾 🥛</div>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mt-8 relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="text" 
          name="q"
          placeholder="What are you looking for? (e.g. Tata Salt)" 
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-kirana-200 shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none text-lg placeholder:text-gray-400"
        />
        <button type="submit" className="absolute right-2 top-2 bottom-2 bg-brand-primary text-white px-4 rounded-lg font-medium hover:bg-brand-primary/90">
          Search
        </button>
      </form>

      {/* Categories */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
          <span>Shop by Category</span>
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {categories.map(c => (
            <Link to={`/search?c=${c.id}`} key={c.id} className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl border border-kirana-100 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                {c.icon}
              </div>
              <span className="text-[11px] md:text-sm font-medium text-center text-gray-700 leading-tight">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Nearby Stores */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
          <span>Stores near you</span>
          <Link to="/search" className="text-sm font-medium text-brand-primary flex items-center">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </h2>
        
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading nearby stores...</div>
        ) : stores.length === 0 ? (
          <div className="py-8 text-center text-gray-500 bg-kirana-50 rounded-xl border border-kirana-100">
            No stores registered yet. Be the first to add your store!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stores.map(store => (
              <Link to={`/store/${store.id}`} key={store.id} className="card p-4 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand-primary transition-colors">{store.name}</h3>
                  {store.verified && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      ✓ Verified
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
                    <span className="font-medium">{store.rating || '5.0'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {store.distance || '0.5'} km
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    {store.delivery_time || '25-35 min'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${store.is_open ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-xs font-medium">{store.is_open ? 'Open' : 'Closed'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Zero Commission / USP Section */}
      <div className="mt-16 bg-kirana-50 border border-kirana-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Different problem. Different model.</h2>
          <p className="text-gray-600 mb-4">We provide the digital infrastructure that helps existing neighborhood stores participate in online commerce.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs">✓</div>
              Digitize the stores already serving your neighborhood.
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs">✓</div>
              Compare nearby prices before you buy.
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs">✓</div>
              Zero per-order commission for merchants.
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-kirana-100 text-center">
          <div className="text-4xl mb-2">🤝</div>
          <h3 className="font-bold text-lg">Your neighborhood store, online.</h3>
        </div>
      </div>
    </div>
  );
}
