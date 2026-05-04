import React, { createContext, useContext, useState, ReactNode } from "react";

// Nueva interfaz para los pedidos
export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  address: string;
}

interface CartContextType {
  cart: any[]; 
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  
  
  orders: Order[];
  addOrder: (order: Order) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  // Estado para el usuario
  const [user, setUser] = useState<any | null>(() => {
    const saved = localStorage.getItem("userAccount");
    return saved ? JSON.parse(saved) : null;
  });
  // 👇 Estado para el historial de pedidos
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  
  const clearCart = () => setCart([]);
  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);

  const login = (userData: any) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userAccount"); 
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, addToCart, removeFromCart, cartCount, cartTotal,
        user, login, logout,
        orders, addOrder, clearCart // 👈 Pasamos las nuevas funciones al Provider
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};