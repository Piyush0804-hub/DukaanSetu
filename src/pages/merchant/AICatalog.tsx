import { useState } from 'react';
import { Upload, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function MerchantAICatalog() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleUpload = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-kirana-100 rounded-2xl mb-4 text-brand-primary">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Build your catalog faster with AI</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Take a photo of your product. We'll identify it, extract details, and prepare the listing automatically.</p>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-kirana-200 p-10 text-center hover:bg-kirana-50/50 transition cursor-pointer" onClick={handleUpload}>
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-kirana-200 border-t-brand-primary rounded-full animate-spin mb-4"></div>
              <h3 className="font-bold text-lg text-brand-primary">AI is identifying your product...</h3>
              <p className="text-gray-500 text-sm mt-2">Scanning brand, category, and size.</p>
            </div>
          ) : (
            <div className="py-8">
              <div className="w-20 h-20 bg-kirana-50 rounded-full flex items-center justify-center mx-auto mb-4 text-kirana-400">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Click to upload a product photo</h3>
              <p className="text-gray-500 text-sm mb-6">Or drag and drop an image here</p>
              
              <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-400">
                <div className="flex items-center gap-1"><Check className="w-4 h-4 text-brand-primary" /> Supports JPG, PNG</div>
                <div className="flex items-center gap-1"><Check className="w-4 h-4 text-brand-primary" /> Max 5MB</div>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-kirana-100 to-white px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <h2 className="font-bold text-brand-primary">AI Extracted Details</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-40 h-40 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0">
                <img src="https://m.media-amazon.com/images/I/611ZzXhNbdL._SX679_.jpg" alt="Tata Salt" className="w-32 h-32 object-contain mix-blend-multiply" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Product Name</label>
                    <input type="text" defaultValue="Tata Salt" className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Brand</label>
                    <input type="text" defaultValue="Tata" className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium">
                      <option>Oil & Masala</option>
                      <option>Staples</option>
                      <option>Snacks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Pack Size</label>
                    <input type="text" defaultValue="1 kg" className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 font-medium" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Suggested Description</label>
                  <textarea rows={2} defaultValue="Vacuum evaporated iodised salt suitable for everyday cooking." className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm"></textarea>
                </div>
              </div>
            </div>
            
            <hr className="my-6 border-dashed border-gray-200" />
            
            <div className="bg-kirana-50 p-6 rounded-xl border border-kirana-200">
              <h3 className="font-bold text-gray-900 mb-4">Set your price and stock</h3>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Selling Price (₹)</label>
                  <input type="number" defaultValue="27" className="w-full border border-gray-300 rounded-lg px-3 py-2 font-bold text-lg focus:border-brand-primary outline-none focus:ring-1 focus:ring-brand-primary" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Stock Quantity</label>
                  <input type="number" defaultValue="24" className="w-full border border-gray-300 rounded-lg px-3 py-2 font-bold text-lg focus:border-brand-primary outline-none focus:ring-1 focus:ring-brand-primary" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50" onClick={() => setStep(1)}>
                Cancel
              </button>
              <button className="px-5 py-2.5 bg-brand-primary text-white font-bold rounded-xl shadow-sm hover:bg-kirana-700 flex items-center gap-2" onClick={() => {
                alert("Product Added to Store Successfully!");
                setStep(1);
              }}>
                Add to Store <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
