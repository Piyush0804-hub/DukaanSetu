
import { stores, getProductsWithStorePrices } from '../../data/mockData';
import { MapPin, Star } from 'lucide-react';
import { useAppContext } from '../../context/AppProvider';

export default function StoreProfile() {
  const store = stores[0]; // Just mocking Gupta General Store
  const products = getProductsWithStorePrices().map(p => {
    return {
      ...p,
      storePrice: p.storePrices.find(sp => sp.store?.id === store.id)
    }
  }).filter(p => p.storePrice);

  const { addToCart, cart } = useAppContext();

  return (
    <div className="pb-24">
      {/* Store Header */}
      <div className="bg-orange-50 border-b border-orange-100 text-gray-900 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">{store.name}</h1>
              <p className="text-gray-600 mb-4 font-medium">Your neighborhood store since {store.since}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded">
                  <Star className="w-4 h-4 text-brand-accent fill-brand-accent" />
                  {store.rating}
                </span>
                <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded">
                  <MapPin className="w-4 h-4" />
                  {store.distance} km away
                </span>
                <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Open Now
                </span>
              </div>
            </div>
            {store.verified && (
              <div className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                ✓ Verified Store
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Products at this store</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => {
            const inCart = cart.find(c => c.productId === product.id && c.storeId === store.id);
            const sp = product.storePrice;
            if (!sp) return null;

            return (
              <div key={product.id} className="card p-3 flex flex-col group hover:border-brand-primary/30 transition-colors">
                <div className="aspect-square bg-gray-50 rounded-lg p-2 mb-3 border border-gray-100 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                  {!sp.inStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                      <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800 leading-tight mb-1 group-hover:text-brand-primary transition-colors line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.packSize}</p>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="font-bold text-gray-900">₹{sp.price}</div>
                  <button 
                    disabled={!sp.inStock}
                    onClick={() => addToCart({ productId: product.id, storeId: store.id, price: sp.price, quantity: 1 })}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                      inCart ? 'bg-kirana-200 text-kirana-800' 
                      : sp.inStock ? 'bg-brand-primary text-white hover:bg-kirana-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {inCart ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
