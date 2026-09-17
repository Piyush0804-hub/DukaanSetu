import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Store, CreditCard, Banknote, MapPin } from 'lucide-react';
import { useAppContext } from '../../context/AppProvider';
import { supabase } from '../../lib/supabase';

export default function Checkout() {
  const { cartTotal, cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      // Group items by store because an order is per-store
      const cartByStore = cart.reduce((acc, item) => {
        if (!acc[item.storeId]) acc[item.storeId] = [];
        acc[item.storeId].push(item);
        return acc;
      }, {} as Record<string, typeof cart>);
      
      let firstOrderId = null;
      
      // Get current user for customer_id
      const { data: { user } } = await supabase.auth.getUser();

      // For each store, create an order and its order_items
      for (const [storeId, items] of Object.entries(cartByStore)) {
        const storeTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const finalAmount = storeTotal + (deliveryType === 'delivery' ? 20 : 0); // Include delivery fee if applicable per store or total. Keeping simple.
        
        // 1. Insert Order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([{
            store_id: storeId,
            customer_id: user?.id || null, // Optional if anonymous checkout isn't strictly blocked
            total_amount: finalAmount,
            status: 'new',
            delivery_type: deliveryType,
            payment_method: paymentMethod
          }])
          .select()
          .single();
          
        if (orderError) throw orderError;
        
        if (!firstOrderId) firstOrderId = order.id;

        // 2. Insert Order Items
        const orderItemsToInsert = items.map(item => ({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
          price_at_time: item.price
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItemsToInsert);
          
        if (itemsError) throw itemsError;
      }

      // Success! Clear cart and redirect
      clearCart();
      navigate(`/order/${firstOrderId}`);
      
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="p-4 md:p-6 pb-24 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="space-y-6">
        {/* Delivery Options */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4">How would you like to get your order?</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center text-center transition ${deliveryType === 'delivery' ? 'border-brand-primary bg-kirana-50' : 'border-gray-100 hover:border-gray-200'}`}>
              <input type="radio" name="delivery" value="delivery" checked={deliveryType === 'delivery'} onChange={() => setDeliveryType('delivery')} className="sr-only" />
              <Truck className={`w-8 h-8 mb-2 ${deliveryType === 'delivery' ? 'text-brand-primary' : 'text-gray-400'}`} />
              <span className="font-semibold text-sm">Store Delivery</span>
              <span className="text-xs text-gray-500 mt-1">25-35 min • ₹20</span>
            </label>
            <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center text-center transition ${deliveryType === 'pickup' ? 'border-brand-primary bg-kirana-50' : 'border-gray-100 hover:border-gray-200'}`}>
              <input type="radio" name="delivery" value="pickup" checked={deliveryType === 'pickup'} onChange={() => setDeliveryType('pickup')} className="sr-only" />
              <Store className={`w-8 h-8 mb-2 ${deliveryType === 'pickup' ? 'text-brand-primary' : 'text-gray-400'}`} />
              <span className="font-semibold text-sm">Pickup from Store</span>
              <span className="text-xs text-green-600 font-medium mt-1">FREE • 15 min</span>
            </label>
          </div>
        </section>

        {/* Address */}
        {deliveryType === 'delivery' && (
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Delivery Address</h2>
            </div>
            <div className="bg-kirana-50 border border-kirana-200 rounded-xl p-4 flex gap-3">
              <MapPin className="text-brand-primary mt-1" />
              <div>
                <p className="font-bold text-gray-800">Home</p>
                <p className="text-sm text-gray-600 mt-1">Flat 402, Shipra Krishna Vista, Ahinsa Khand 1, Indirapuram, Ghaziabad, 201014</p>
                <p className="text-sm text-gray-600 mt-1">Phone: +91 98765 43210</p>
              </div>
            </div>
          </section>
        )}

        {/* Payment */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'upi' ? 'border-brand-primary bg-kirana-50' : 'border-gray-100'}`}>
              <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-brand-primary" />
              <div className="w-8 h-8 bg-white border border-gray-100 rounded flex items-center justify-center font-bold text-brand-accent text-xs">UPI</div>
              <span className="font-medium">UPI (GPay, PhonePe, Paytm)</span>
            </label>
            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'cod' ? 'border-brand-primary bg-kirana-50' : 'border-gray-100'}`}>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-brand-primary" />
              <Banknote className="w-8 h-8 p-1.5 bg-white border border-gray-100 rounded text-green-700" />
              <span className="font-medium">Cash on Delivery</span>
            </label>
            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'card' ? 'border-brand-primary bg-kirana-50' : 'border-gray-100'}`}>
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-brand-primary" />
              <CreditCard className="w-8 h-8 p-1.5 bg-white border border-gray-100 rounded text-blue-600" />
              <span className="font-medium">Credit / Debit Card</span>
            </label>
          </div>
        </section>

        {/* Total & Submit */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky bottom-20 md:static">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">₹{cartTotal + (deliveryType === 'delivery' ? 20 : 0)}</span>
          </div>
          <button 
            type="submit" 
            disabled={isProcessing}
            className={`w-full text-white py-4 rounded-xl font-bold text-lg transition shadow-sm ${isProcessing ? 'bg-kirana-300 cursor-not-allowed' : 'bg-brand-primary hover:bg-kirana-700'}`}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
