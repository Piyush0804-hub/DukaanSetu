import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBasket, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppProvider';
import { baseProducts, stores } from '../../data/mockData';

export default function Cart() {
  const { cart, updateQuantity, cartTotal } = useAppContext();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-6 pb-24 max-w-3xl mx-auto flex flex-col items-center text-center mt-10">
        <div className="w-24 h-24 bg-kirana-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBasket className="w-12 h-12 text-kirana-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your basket is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any groceries yet.</p>
        <Link to="/" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  // Group cart items by store
  const cartByStore = cart.reduce((acc, item) => {
    if (!acc[item.storeId]) {
      acc[item.storeId] = [];
    }
    acc[item.storeId].push(item);
    return acc;
  }, {} as Record<string, typeof cart>);

  return (
    <div className="p-4 md:p-6 pb-24 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ShoppingBasket className="text-brand-primary" /> Your Grocery Basket
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {Object.entries(cartByStore).map(([storeId, items]) => {
            const store = stores.find(s => s.id === storeId);
            const storeTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            return (
              <div key={storeId} className="bg-white rounded-2xl shadow-sm border border-kirana-200 overflow-hidden">
                <div className="bg-kirana-50 p-4 border-b border-kirana-200 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Ordering from</p>
                    <Link to={`/store/${storeId}`} className="font-bold text-brand-primary text-lg hover:underline">
                      {store?.name}
                    </Link>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Store Total</p>
                    <p className="font-bold text-gray-900">₹{storeTotal}</p>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100 p-4">
                  {items.map(item => {
                    const product = baseProducts.find(p => p.id === item.productId);
                    if (!product) return null;
                    
                    return (
                      <div key={item.productId} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded border border-gray-100 p-1">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-bold text-gray-800">{product.name}</h3>
                            <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{product.packSize} • ₹{item.price}/each</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                              <button 
                                onClick={() => updateQuantity(item.productId, item.storeId, item.quantity - 1)}
                                className="p-1.5 text-gray-500 hover:text-brand-primary transition"
                              >
                                {item.quantity === 1 ? <Trash2 className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4" />}
                              </button>
                              <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.productId, item.storeId, item.quantity + 1)}
                                className="p-1.5 text-gray-500 hover:text-brand-primary transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Order Summary */}
        <div className="md:w-80">
          <div className="bg-white rounded-2xl shadow-sm border border-kirana-200 p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4 pb-2 border-b border-gray-100">Bill Details</h2>
            
            <div className="space-y-3 mb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span className="font-medium text-gray-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span>
                <span className="font-medium text-gray-900">₹0</span>
              </div>
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>To Pay</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-kirana-700 transition shadow-sm"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
