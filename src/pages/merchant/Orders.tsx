import { useState } from 'react';
import { Package, Truck, CheckCircle2 } from 'lucide-react';

export default function MerchantOrders() {
  const [orders, setOrders] = useState([
    {
      id: 'DS1042',
      customer: 'Rahul K.',
      items: 3,
      total: 375,
      type: 'Delivery',
      status: 'new',
      time: '10:42 AM'
    },
    {
      id: 'DS1041',
      customer: 'Ananya S.',
      items: 6,
      total: 620,
      type: 'Pickup',
      status: 'preparing',
      time: '10:15 AM'
    },
    {
      id: 'DS1040',
      customer: 'Vikram',
      items: 1,
      total: 140,
      type: 'Delivery',
      status: 'out_for_delivery',
      time: '09:30 AM'
    }
  ]);

  const acceptOrder = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'preparing' } : o));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Orders Column */}
        <div className="bg-kirana-50 rounded-2xl p-4 border border-kirana-100 h-[calc(100vh-140px)] flex flex-col">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
            New Orders
            <span className="bg-brand-accent text-white text-xs px-2 py-0.5 rounded-full">
              {orders.filter(o => o.status === 'new').length}
            </span>
          </h2>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {orders.filter(o => o.status === 'new').map(order => (
              <div key={order.id} className="bg-white rounded-xl p-4 border border-brand-accent shadow-sm border-l-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">#{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.customer} • {order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-primary">₹{order.total}</p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded w-max">
                  {order.type === 'Delivery' ? <Truck className="w-4 h-4 text-brand-primary" /> : <Package className="w-4 h-4 text-brand-accent" />}
                  {order.type}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
                    Reject
                  </button>
                  <button 
                    onClick={() => acceptOrder(order.id)}
                    className="bg-brand-primary text-white py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-kirana-700 transition"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
            {orders.filter(o => o.status === 'new').length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">No new orders.</p>
            )}
          </div>
        </div>

        {/* Preparing Column */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 h-[calc(100vh-140px)] flex flex-col">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
            Preparing
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {orders.filter(o => o.status === 'preparing').length}
            </span>
          </h2>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {orders.filter(o => o.status === 'preparing').map(order => (
              <div key={order.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">#{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.customer} • {order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{order.total}</p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded w-max">
                  {order.type === 'Delivery' ? <Truck className="w-4 h-4 text-brand-primary" /> : <Package className="w-4 h-4 text-brand-accent" />}
                  {order.type}
                </div>
                
                <button className="w-full bg-blue-50 text-blue-700 py-2 rounded-lg text-sm font-bold border border-blue-200 hover:bg-blue-100 transition mt-2">
                  Mark Ready
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dispatched / Ready Column */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 h-[calc(100vh-140px)] flex flex-col">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
            Out / Ready
          </h2>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {orders.filter(o => o.status === 'out_for_delivery').map(order => (
              <div key={order.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm opacity-70">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 line-through decoration-gray-300">#{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
