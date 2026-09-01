import { createContext, useContext, useState, type ReactNode } from 'react';

type CartItem = {
  productId: string;
  storeId: string;
  quantity: number;
  price: number;
};

type AppContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, storeId: string) => void;
  updateQuantity: (productId: string, storeId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentLocation, setCurrentLocation] = useState('Indirapuram, Ghaziabad');

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.storeId === item.storeId);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, storeId: string) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.storeId === storeId)));
  };

  const updateQuantity = (productId: string, storeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, storeId);
      return;
    }
    setCart(prev => prev.map(i => 
      (i.productId === productId && i.storeId === storeId) ? { ...i, quantity } : i
    ));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal,
      currentLocation, setCurrentLocation
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
