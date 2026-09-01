import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Phone, MapPin, ChevronLeft } from 'lucide-react';
import { stores } from '../../data/mockData';

export default function OrderTracking() {
  const { id } = useParams();
  const store = stores[0];

  return (
    <div className="max-w-xl mx-auto md:mt-8 pb-24">
      <div className="bg-kirana-50 border border-kirana-100 p-6 md:rounded-t-2xl">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-primary mb-6 text-sm font-medium transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif text-gray-900">Order Placed!</h1>
            <p className="text-gray-600 font-medium">Order #{id}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow-sm border-x border-b border-gray-100 md:rounded-b-2xl">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
          <div>
            <h2 className="font-bold text-lg text-gray-800">{store.name}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5" /> {store.distance} km away
            </p>
          </div>
          <button className="w-10 h-10 bg-kirana-50 rounded-full flex items-center justify-center text-brand-primary border border-kirana-200">
            <Phone className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-6">Track your order</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-primary before:via-gray-200 before:to-gray-200 pl-8">
            
            <div className="relative flex items-start group">
              <div className="absolute -left-[39px] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-brand-primary bg-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Order Placed</h4>
                <p className="text-sm text-gray-500">10:42 AM</p>
              </div>
            </div>
            
            <div className="relative flex items-start group">
              <div className="absolute -left-[39px] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-brand-primary bg-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Store Confirmed</h4>
                <p className="text-sm text-gray-500">Your local store has received your order</p>
              </div>
            </div>

            <div className="relative flex items-start group">
              <div className="absolute -left-[39px] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-brand-primary bg-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-brand-primary text-lg">Preparing your order</h4>
                <p className="text-sm text-gray-500 mt-1">Arriving in 25–35 minutes</p>
              </div>
            </div>

            <div className="relative flex items-start group">
              <div className="absolute -left-[39px] flex items-center justify-center">
                <Circle className="w-6 h-6 text-gray-300 bg-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-400">Out for Delivery</h4>
              </div>
            </div>

            <div className="relative flex items-start group">
              <div className="absolute -left-[39px] flex items-center justify-center">
                <Circle className="w-6 h-6 text-gray-300 bg-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-400">Delivered</h4>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="bg-kirana-50 p-4 rounded-xl border border-kirana-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Amount to pay</p>
            <p className="font-bold text-gray-900">₹375.00</p>
          </div>
          <div className="bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded">
            UNPAID (COD)
          </div>
        </div>
      </div>
    </div>
  );
}
