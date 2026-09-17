import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { AppProvider } from './context/AppProvider';

// Layouts
import CustomerLayout from './components/customer/CustomerLayout';
import MerchantLayout from './components/merchant/MerchantLayout';

// Pages
import Login from './pages/auth/Login';
import CustomerHome from './pages/customer/Home';
import ProductSearch from './pages/customer/Search';
import StoreProfile from './pages/customer/Store';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderTracking from './pages/customer/OrderTracking';
import ComparePrices from './pages/customer/ComparePrices';

import MerchantDashboard from './pages/merchant/Dashboard';
import MerchantProducts from './pages/merchant/Products';
import MerchantOrders from './pages/merchant/Orders';
import MerchantAICatalog from './pages/merchant/AICatalog';

// Auth Guard for Merchant
function MerchantGuard({ children }: { children: JSX.Element }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="p-10 text-center font-medium">Checking authentication...</div>;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Customer Routes */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<CustomerHome />} />
            <Route path="search" element={<ProductSearch />} />
            <Route path="compare" element={<ComparePrices />} />
            <Route path="store/:id" element={<StoreProfile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order/:id" element={<OrderTracking />} />
          </Route>
          
          {/* Merchant Routes (Protected) */}
          <Route path="/merchant" element={
            <MerchantGuard>
              <MerchantLayout />
            </MerchantGuard>
          }>
            <Route index element={<MerchantDashboard />} />
            <Route path="products" element={<MerchantProducts />} />
            <Route path="orders" element={<MerchantOrders />} />
            <Route path="ai-catalog" element={<MerchantAICatalog />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
