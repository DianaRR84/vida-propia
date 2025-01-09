import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importa el hook del contexto

const ProductDetails = () => {
  const { productId } = useParams(); // Obtenemos el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const { cartCount, cartMessage, addToCart } = useCart();  // Usamos el carrito desde el contexto
  
  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        const foundProduct = data.find((prod) => prod.id === productId);
        setProduct(foundProduct);
        if (foundProduct) {
          setSelectedModel(foundProduct.models[0]); // Selecciona el primer modelo por defecto
        }
      })
      .catch((error) => console.error("Error al cargar el producto:", error));
  }, [productId]);

  const handleAddToCart = () => {
    addToCart();  // Llamamos a la función del contexto
  };

  if (!product) {
    return <div className="container my-5">Producto no encontrado.</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center">{product.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={selectedModel?.img}
            alt={selectedModel?.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4>{product.price}</h4>
          <button onClick={handleAddToCart} className="btn btn-success">
            Añadir al carrito
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
