import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBasket, User, MapPin } from 'lucide-react';
import { useAppContext } from '../../context/AppProvider';

export default function CustomerLayout() {
  const { currentLocation, cartCount } = useAppContext();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-brand-primary' : 'text-gray-500';

  return (
    <div className="min-h-screen bg-brand-light flex flex-col pb-16 md:pb-0">
      {/* Top Navbar */}
      <header className="bg-white sticky top-0 z-50 border-b border-kirana-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBasket className="text-brand-primary w-7 h-7" />
            <span className="font-bold text-xl tracking-tight text-brand-primary">DukaanSetu</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 text-sm font-medium bg-kirana-50 px-3 py-1.5 rounded-full text-brand-text">
            <MapPin className="w-4 h-4 text-brand-primary" />
            {currentLocation}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-gray-600 hover:text-brand-primary font-medium">Search</Link>
            <Link to="/compare" className="text-gray-600 hover:text-brand-primary font-medium">Compare</Link>
            <Link to="/merchant" className="text-sm font-bold text-brand-accent hover:underline">Seller Login</Link>
            <Link to="/cart" className="relative text-gray-700">
              <ShoppingBasket className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-brand-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="w-8 h-8 rounded-full bg-kirana-200 flex items-center justify-center text-brand-primary font-bold">
              U
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-2 bg-kirana-50 px-2 py-1 rounded-md text-xs font-medium text-brand-text truncate max-w-[150px]">
            <MapPin className="w-3 h-3 text-brand-primary flex-shrink-0" />
            <span className="truncate">{currentLocation}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-kirana-100 flex justify-between px-6 py-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/')}`}>
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center p-2 ${isActive('/search')}`}>
          <Search className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Search</span>
        </Link>
        <Link to="/compare" className={`flex flex-col items-center p-2 ${isActive('/compare')}`}>
          <div className="relative">
            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <span className="text-[10px] font-medium">Compare</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center p-2 relative ${isActive('/cart')}`}>
          <ShoppingBasket className="w-6 h-6 mb-1" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-2 bg-brand-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        <Link to="/merchant" className={`flex flex-col items-center p-2 ${isActive('/profile')}`}>
          <User className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Merchant</span>
        </Link>
      </nav>
    </div>
  );
}
