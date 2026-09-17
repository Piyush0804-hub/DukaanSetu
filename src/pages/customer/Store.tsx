import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { MapPin, Star } from 'lucide-react';
import { useAppContext } from '../../context/AppProvider';

export default function StoreProfile() {
  const { id } = useParams();
  const [store, setStore] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, cart } = useAppContext();

  useEffect(() => {
    async function fetchStoreData() {
      if (!id) return;
      
      // Fetch store
      const { data: storeData } = await supabase.from('stores').select('*').eq('id', id).single();
      if (storeData) setStore(storeData);

      // Fetch inventory with joined products
      const { data: invData } = await supabase
        .from('inventory')
        .select(`
          id, price, stock_count, in_stock,
          product_id,
          products ( id, name, brand, pack_size, category, image )
        `)
        .eq('store_id', id);
        
      if (invData) setInventory(invData);
      setLoading(false);
    }
    
    fetchStoreData();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading store...</div>;
  if (!store) return <div className="p-10 text-center text-red-500">Store not found</div>;

  return (
    <div className="pb-24">
      {/* Store Header */}
      <div className="bg-orange-50 border-b border-orange-100 text-gray-900 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2">{store.name}</h1>
              <p className="text-gray-600 mb-4 font-medium">{store.address || 'Your local neighborhood store'}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                  <Star className="w-4 h-4 text-brand-primary fill-brand-primary" />
                  {store.rating || '5.0'}
                </span>
                <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                  <MapPin className="w-4 h-4" />
                  {store.distance || '0.5'} km away
                </span>
                <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${store.is_open !== false ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {store.is_open !== false ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>
            {store.verified !== false && (
              <div className="bg-green-100 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                ✓ Verified Store
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Products at this store</h2>
        
        {inventory.length === 0 ? (
          <div className="bg-kirana-50 border border-kirana-100 p-8 text-center rounded-xl text-gray-500">
            This store hasn't added any products to their catalog yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {inventory.map(invItem => {
              const product = invItem.products;
              const inCart = cart.find(c => c.productId === product.id && c.storeId === store.id);

              return (
                <div key={invItem.id} className="card p-3 flex flex-col group hover:border-brand-primary/30 transition-colors">
                  <div className="aspect-square bg-gray-50 rounded-lg p-2 mb-3 border border-gray-100 relative">
                    {/* Fallback image if not present in DB yet */}
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-white rounded-md mix-blend-multiply">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      ) : (
                        "🛍️"
                      )}
                    </div>
                    
                    {!invItem.in_stock && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                        <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-800 leading-tight mb-1 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.brand} • {product.pack_size}</p>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-bold text-gray-900">₹{invItem.price}</div>
                    <button 
                      disabled={!invItem.in_stock}
                      onClick={() => addToCart({ 
                        productId: product.id, 
                        storeId: store.id, 
                        price: invItem.price, 
                        quantity: 1, 
                        name: product.name,
                        image: product.image,
                        packSize: product.pack_size,
                        storeName: store.name 
                      })}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                        inCart ? 'bg-kirana-200 text-kirana-800' 
                        : invItem.in_stock ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm' 
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
        )}
      </div>
    </div>
  );
}
