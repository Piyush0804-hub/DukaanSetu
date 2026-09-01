import { TrendingUp, ShoppingCart, Package, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MerchantDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, Shopkeeper 👋</h1>

      {/* Hero SaaS Value Prop */}
      <div className="bg-gradient-to-br from-orange-50 to-kirana-100 border border-kirana-200 rounded-2xl p-6 text-gray-900 mb-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-block bg-brand-primary/10 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border border-brand-primary/20 text-brand-primary inline-block">
            DUKAANSETU PRO
          </div>
          <h2 className="text-3xl font-bold font-serif mb-2">Your Sale. Your Money.</h2>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-black text-brand-accent">₹0</span>
            <span className="text-lg text-gray-500 font-medium mb-1">platform commission</span>
          </div>
          <p className="text-gray-600 max-w-md mb-6">
            Grow your business without losing a percentage of every order. DukaanSetu is powered by a simple monthly SaaS subscription.
          </p>
          <button className="bg-brand-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-brand-primary/90 transition">
            Manage Subscription
          </button>
        </div>
        
        {/* Background graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
          <div className="w-64 h-64 border-[40px] border-brand-primary/10 rounded-full absolute -right-20 -top-20"></div>
          <div className="w-32 h-32 bg-brand-accent rounded-full absolute right-20 bottom-10"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <p className="text-gray-500 text-sm font-medium">Today's Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-gray-500 text-sm font-medium">Today's Sales</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹4,820</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Package className="w-5 h-5" />
          </div>
          <p className="text-gray-500 text-sm font-medium">Products Live</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">482</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-brand-accent/20 shadow-sm bg-orange-50/30">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-brand-accent flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5" />
          </div>
          <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
          <p className="text-2xl font-bold text-brand-accent mt-1">7</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Pending Actions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-orange-100 bg-orange-50/50 rounded-xl">
              <div>
                <p className="font-bold text-gray-900">New Order #DS1042</p>
                <p className="text-sm text-gray-600">3 items • ₹375 • Delivery</p>
              </div>
              <Link to="/merchant/orders" className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                Review
              </Link>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
              <div>
                <p className="font-bold text-gray-900">Restock Amul Milk</p>
                <p className="text-sm text-gray-600">Currently out of stock</p>
              </div>
              <Link to="/merchant/products" className="text-brand-primary font-bold text-sm px-4 py-2 border border-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition">
                Update
              </Link>
            </div>
          </div>
        </div>

        {/* AI Promotion */}
        <div className="bg-gradient-to-br from-kirana-50 to-white rounded-2xl border border-kirana-200 shadow-sm p-6 flex flex-col items-center text-center justify-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 border border-kirana-100 text-brand-primary">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Build your catalog faster</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">
            Just take a photo of your shelf. Our AI identifies products and drafts the listing for you.
          </p>
          <Link to="/merchant/ai-catalog" className="bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-kirana-700 shadow-sm transition-all w-full md:w-auto">
            Try AI Catalog Creator
          </Link>
        </div>
      </div>
    </div>
  );
}
