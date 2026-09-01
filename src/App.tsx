import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppProvider } from './context/AppProvider';

// Layouts
import CustomerLayout from './components/customer/CustomerLayout';
import MerchantLayout from './components/merchant/MerchantLayout';

// Pages
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

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
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
          
          {/* Merchant Routes */}
          <Route path="/merchant" element={<MerchantLayout />}>
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
