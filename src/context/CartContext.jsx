import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState('');

  const addToCart = () => {
    setCartCount(cartCount + 1);
    setCartMessage('Artículo añadido correctamente');
    setTimeout(() => setCartMessage(''), 2000);  // Eliminar mensaje después de 2 segundos
  };

  return (
    <CartContext.Provider value={{ cartCount, cartMessage, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCart = () => {
  return useContext(CartContext);
};
