import { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function MerchantProducts() {
  const [search, setSearch] = useState('');
  const [storeProducts, setStoreProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Get the retailer's store
        const { data: store } = await supabase
          .from('stores')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!store) {
          setLoading(false);
          return;
        }

        // 2. Fetch inventory joined with product details
        const { data: inventory, error } = await supabase
          .from('inventory')
          .select(`
            id, price, stock_count, in_stock,
            products (id, name, brand, pack_size, category, image)
          `)
          .eq('store_id', store.id);

        if (error) throw error;
        setStoreProducts(inventory || []);
      } catch (err) {
        console.error("Error fetching merchant products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = storeProducts.filter(item => 
    item.products?.name?.toLowerCase().includes(search.toLowerCase()) || 
    item.products?.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-kirana-700 shadow-sm">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-12 flex justify-center text-brand-primary">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : storeProducts.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No products found. Use the AI Catalog tool to add some!
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-kirana-50 text-gray-600 font-medium border-b border-kirana-100">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded border border-gray-100 bg-white p-1 flex items-center justify-center text-xl">
                          {item.products?.image ? (
                            <img src={item.products.image} alt={item.products.name} className="w-full h-full object-contain mix-blend-multiply" />
                          ) : '🛍️'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{item.products?.name}</p>
                          <p className="text-xs text-gray-500">{item.products?.pack_size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 capitalize">{item.products?.category || 'General'}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">₹{item.price}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${item.stock_count === 0 ? 'text-red-500' : item.stock_count < 10 ? 'text-brand-accent' : 'text-gray-900'}`}>
                        {item.stock_count} units
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.in_stock ? (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreVertical className="w-5 h-5 ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
