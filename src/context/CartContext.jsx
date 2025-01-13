import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  // Contar los artículos en el carrito
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Añadir producto al carrito
  const addToCart = (product, selectedModel) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.model === selectedModel.name
    );

    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, aumentamos la cantidad
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Si no está en el carrito, lo añadimos con cantidad 1
      const newItem = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.replace("€", "")),
        model: selectedModel.name,
        img: selectedModel.img,
        quantity: 1,
      };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }

    setCartMessage("Artículo añadido");
    setTimeout(() => setCartMessage(""), 2000);  // Ocultar mensaje después de 2s
  };

  // Calcular total a pagar
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartMessage, addToCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCart = () => useContext(CartContext);
