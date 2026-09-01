import { Outlet, Link, useLocation } from 'react-router-dom';
import { Store, Package, ShoppingCart, BarChart, ScanLine, LogOut } from 'lucide-react';

export default function MerchantLayout() {
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/merchant', icon: BarChart },
    { name: 'Orders', path: '/merchant/orders', icon: ShoppingCart, badge: 3 },
    { name: 'Products', path: '/merchant/products', icon: Package },
    { name: 'AI Catalog', path: '/merchant/ai-catalog', icon: ScanLine },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-kirana-100 text-gray-800 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-kirana-100">
          <Link to="/" className="text-xl font-bold font-serif text-brand-primary flex items-center gap-2 mb-6">
            <Store className="text-brand-primary" /> DukaanSetu
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary text-white rounded-lg flex items-center justify-center font-bold text-lg">
              G
            </div>
            <div>
              <p className="font-bold leading-tight">Gupta General</p>
              <p className="text-xs text-brand-accent font-medium">🟢 Store Live</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-kirana-50 text-brand-primary font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <div className="flex items-center gap-3 font-medium">
                  <Icon className="w-5 h-5" />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-kirana-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 transition-colors">
            <LogOut className="w-5 h-5" /> Exit to Customer
          </Link>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden bg-white border-b border-kirana-100 text-gray-900 p-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Store className="text-brand-primary w-5 h-5" />
          <span className="font-bold text-lg font-serif">Gupta General</span>
        </div>
        <Link to="/" className="text-xs text-gray-500 underline">Exit</Link>
      </div>

      {/* Mobile Navigation Scroll */}
      <div className="md:hidden bg-white text-gray-800 flex overflow-x-auto hide-scrollbar sticky top-[60px] z-40 border-b border-kirana-100 shadow-sm">
        {menu.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${isActive ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500'}`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
