import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';
import { getProductsWithStorePrices } from '../../data/mockData';

export default function MerchantProducts() {
  const [search, setSearch] = useState('');
  
  // Get products for store s1 (Gupta General Store)
  const storeProducts = getProductsWithStorePrices()
    .map(p => ({
      ...p,
      inventory: p.storePrices.find(sp => sp.store?.id === 's1')
    }))
    .filter(p => p.inventory);

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
              {storeProducts.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-gray-100 bg-white p-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.packSize}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.categoryId === 'c4' ? 'Staples' : item.categoryId === 'c3' ? 'Atta & Rice' : 'Snacks'}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">₹{item.inventory?.price}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${item.inventory?.stockCount === 0 ? 'text-red-500' : (item.inventory?.stockCount || 0) < 10 ? 'text-brand-accent' : 'text-gray-900'}`}>
                      {item.inventory?.stockCount} units
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.inventory?.inStock ? (
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
        </div>
      </div>
    </div>
  );
}
