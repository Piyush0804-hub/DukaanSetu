
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';
import { getProductsWithStorePrices } from '../../data/mockData';
import { useAppContext } from '../../context/AppProvider';

export default function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart, cart } = useAppContext();
  
  const allProducts = getProductsWithStorePrices();
  
  // Filter products based on search query
  const filteredProducts = query 
    ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()))
    : allProducts;

  return (
    <div className="p-4 md:p-6 pb-24">
      {/* Search Header */}
      <div className="mb-6">
        <form onSubmit={(e) => {
          e.preventDefault();
          const q = new FormData(e.currentTarget).get('q') as string;
          setSearchParams(q ? { q } : {});
        }} className="relative max-w-3xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Search groceries..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
          />
        </form>
      </div>

      {query && (
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Showing results for "{query}"
        </h1>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Couldn't find that nearby</h2>
          <p className="text-gray-500">Try another product or category.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredProducts.map(product => {
            const bestPrice = product.storePrices[0];
            
            return (
              <div key={product.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-kirana-200">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Product Info */}
                  <div className="flex gap-4 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2 border border-gray-100">
                      <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 leading-tight mb-1">{product.name}</h2>
                      <p className="text-sm text-gray-500 mb-2">{product.packSize} • {product.brand}</p>
                      
                      {bestPrice && (
                        <div className="bg-kirana-50 border border-brand-primary/20 text-brand-primary px-2 py-1.5 rounded text-xs font-semibold inline-block">
                          Best nearby price: ₹{bestPrice.price}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Store Comparison */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-brand-accent" />
                      Available at {product.storePrices.length} nearby stores
                    </h3>
                    
                    <div className="space-y-3">
                      {product.storePrices.map((sp, idx) => {
                        const inCart = cart.find(c => c.productId === product.id && c.storeId === sp.store?.id);
                        
                        return (
                          <div key={sp.store?.id} className={`flex items-center justify-between p-3 rounded-xl border ${idx === 0 ? 'border-brand-primary/30 bg-kirana-50/50' : 'border-gray-100'}`}>
                            <div className="flex-1">
                              <Link to={`/store/${sp.store?.id}`} className="font-bold text-gray-800 hover:text-brand-primary transition">
                                {sp.store?.name}
                              </Link>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-brand-accent fill-brand-accent"/> {sp.store?.rating}</span>
                                <span>•</span>
                                <span>{sp.store?.distance} km</span>
                              </div>
                            </div>
                            
                            <div className="text-right mr-4">
                              <div className="font-bold text-lg text-gray-900">₹{sp.price}</div>
                              {sp.inStock ? (
                                <div className={`text-[10px] font-medium ${sp.stockCount < 5 ? 'text-brand-accent' : 'text-green-600'}`}>
                                  {sp.stockCount < 5 ? `Only ${sp.stockCount} left` : '🟢 In stock'}
                                </div>
                              ) : (
                                <div className="text-[10px] font-medium text-red-500">Out of stock</div>
                              )}
                            </div>
                            
                            <button 
                              disabled={!sp.inStock}
                              onClick={() => sp.store && addToCart({ productId: product.id, storeId: sp.store.id, price: sp.price, quantity: 1 })}
                              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                inCart 
                                  ? 'bg-kirana-200 text-kirana-800'
                                  : sp.inStock 
                                    ? 'bg-white border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-100'
                              }`}
                            >
                              {inCart ? 'Added' : 'Add'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
