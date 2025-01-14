import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1); // Cuántas unidades del modelo

  useEffect(() => {
    // Fetch del producto basado en el ID
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
          setSelectedModel(foundProduct.models[0]); // Modelo por defecto
        }
      })
      .catch((error) => console.error("Error al cargar el producto:", error));
  }, [productId]);

  const handleAddToCart = () => {
    if (selectedModel) {
      // Añadir al carrito con la cantidad seleccionada
      for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedModel);
      }
    }
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  if (!product) {
    return <div className="container my-5">Producto no encontrado.</div>;
  }
  
  return (
    <div className="container my-5">
      <h1 className="display-4 text-center">{product.name}</h1>
      <div className="row">
        {/* Imagen del modelo seleccionado */}
        <div className="col-md-6">
          <img
            src={selectedModel?.img}
            alt={selectedModel?.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Detalles del producto */}
        <div className="col-md-6">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4>{product.price} €</h4>

          {/* Burbujas de selección de modelo */}
          <div className="d-flex gap-3 my-3 flex-wrap">
            {product.models.map((model, index) => (
              <div
                key={index}
                onClick={() => handleModelSelect(model)}
                className={`text-center p-2 rounded shadow-sm cursor-pointer ${
                  selectedModel?.name === model.name
                    ? "border border-3 border-primary"
                    : "border"
                }`}
                style={{
                  width: "90px",
                  cursor: "pointer",
                  backgroundColor: selectedModel?.name === model.name ? "#f0f8ff" : "#fff",
                }}
              >
                <img
                  src={model.img}
                  alt={model.name}
                  className="img-fluid rounded"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <small className="d-block mt-1">{model.name}</small>
              </div>
            ))}
          </div>

          {/* Selección de cantidad */}
          <div className="mb-3 row">
            <label htmlFor="quantity" className="col-sm-2 col-form-label">Cantidad</label>
            <div className="col-sm-4">
              <input
                type="number"
                id="quantity"
                className="form-control form-control-sm"  // Input pequeño
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>

          {/* Botón Añadir al carrito */}
          <button onClick={handleAddToCart} className="btn btn-success">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

