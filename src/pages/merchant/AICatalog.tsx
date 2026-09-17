import { useState } from 'react';
import { Upload, Sparkles, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { supabase } from '../../lib/supabase';

export default function MerchantAICatalog() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  
  // Form State
  const [productData, setProductData] = useState({
    name: '', brand: '', category: '', packSize: '', description: '', price: '0', stock: '0'
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setPreviewUrl(URL.createObjectURL(file));
    
    setIsProcessing(true);
    
    try {
      // Send image to our Express backend for Gemini AI Processing
      const formData = new FormData();
      formData.append('image', file);
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/ai/catalog`, formData);
      
      setProductData({
        ...productData,
        name: res.data.name || '',
        brand: res.data.brand || '',
        category: res.data.category || '',
        packSize: res.data.packSize || '',
        description: res.data.description || ''
      });
      
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('AI processing failed. Please try again.');
      setStep(1);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToStore = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      // 1. Get or create a store for this user
      let storeId;
      const { data: stores } = await supabase.from('stores').select('id').eq('user_id', user.id);
      
      if (stores && stores.length > 0) {
        storeId = stores[0].id;
      } else {
        const { data: newStore, error: storeErr } = await supabase.from('stores').insert([
          { user_id: user.id, name: "My Grocery Store", address: "Local Address" }
        ]).select().single();
        if (storeErr) throw storeErr;
        storeId = newStore.id;
      }

      // 2. Insert into global products table
      const { data: newProduct, error: prodErr } = await supabase.from('products').insert([
        {
          name: productData.name,
          brand: productData.brand,
          pack_size: productData.packSize,
          category: productData.category,
          description: productData.description
        }
      ]).select().single();
      
      if (prodErr) throw prodErr;

      // 3. Add to store inventory
      const { error: invErr } = await supabase.from('inventory').insert([
        {
          store_id: storeId,
          product_id: newProduct.id,
          price: Number(productData.price),
          stock_count: Number(productData.stock),
          in_stock: Number(productData.stock) > 0
        }
      ]);
      
      if (invErr) throw invErr;

      alert("🎉 Product successfully added to your store's database!");
      setStep(1);
      setProductData({ name: '', brand: '', category: '', packSize: '', description: '', price: '0', stock: '0' });
    } catch (err: any) {
      console.error(err);
      alert("Failed to add product: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-kirana-100 rounded-2xl mb-4 text-brand-primary">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Build your catalog faster with AI</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Upload a product photo. Gemini AI will identify it, extract details, and save it directly to your Supabase database.</p>
      </div>

      {step === 1 && (
        <label className="bg-white rounded-2xl border-2 border-dashed border-kirana-200 p-10 text-center hover:bg-kirana-50/50 transition cursor-pointer block">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isProcessing} />
          
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-kirana-200 border-t-brand-primary rounded-full animate-spin mb-4"></div>
              <h3 className="font-bold text-lg text-brand-primary">Gemini AI is analyzing image...</h3>
              <p className="text-gray-500 text-sm mt-2">Extracting brand, category, and size.</p>
            </div>
          ) : (
            <div className="py-8">
              <div className="w-20 h-20 bg-kirana-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Click to upload a product photo</h3>
              <p className="text-gray-500 text-sm mb-6">Or tap to use camera</p>
            </div>
          )}
        </label>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-white px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <h2 className="font-bold text-brand-primary">AI Extracted Details</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-40 h-40 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Product Name</label>
                    <input type="text" value={productData.name} onChange={e => setProductData({...productData, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Brand</label>
                    <input type="text" value={productData.brand} onChange={e => setProductData({...productData, brand: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <input type="text" value={productData.category} onChange={e => setProductData({...productData, category: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Pack Size</label>
                    <input type="text" value={productData.packSize} onChange={e => setProductData({...productData, packSize: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium" />
                  </div>
                </div>
              </div>
            </div>
            
            <hr className="my-6 border-dashed border-gray-200" />
            
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <h3 className="font-bold text-gray-900 mb-4">Set your price and stock</h3>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Selling Price (₹)</label>
                  <input type="number" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 font-bold text-lg focus:border-brand-primary outline-none focus:ring-1 focus:ring-brand-primary" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Stock Quantity</label>
                  <input type="number" value={productData.stock} onChange={e => setProductData({...productData, stock: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 font-bold text-lg focus:border-brand-primary outline-none focus:ring-1 focus:ring-brand-primary" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50" onClick={() => setStep(1)}>
                Cancel
              </button>
              <button className="px-5 py-2.5 bg-brand-primary text-white font-bold rounded-xl shadow-sm hover:bg-brand-primary/90 flex items-center gap-2" onClick={handleAddToStore}>
                Add to Database <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
