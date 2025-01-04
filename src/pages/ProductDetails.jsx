import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Base de datos de productos
const products = [
    
  {
    // Mochilas Yakarta
    id: "mochilayakarta",
    name: "Mochila Yakarta",
    description: "Ligera y práctica para llevar a cualquier lugar.",
    price: "48€",
    colors: [
      { name: "Negro", img: "path/to/black.jpg" },
      { name: "Azul", img: "path/to/blue.jpg" },
      { name: "Rojo", img: "path/to/red.jpg" },
    ],
    models: [
      {
        name: "Modelo 1",
        img: "path/to/model1.jpg",
      },
      {
        name: "Modelo 2",
        img: "path/to/model2.jpg",
      },
    ],
  },

  {
    // Billeteras
    id: "2",
    name: "Billetera Eco",
    description: "Billetera ecológica fabricada con materiales sostenibles.",
    price: "29.99€",
    colors: [
      { name: "Negro", img: "path/to/black.jpg" },
      { name: "Verde", img: "path/to/green.jpg" },
    ],
    models: [
      {
        name: "Modelo A",
        img: "path/to/modelA.jpg",
      },
      {
        name: "Modelo B",
        img: "path/to/modelB.jpg",
      },
    ],
  },
  
  {
    // Bandoleras Maxi
    id: "bandolerasmaxi",
    name: "Bandoleras Maxi",
    description: "Nuestra bandolera maxi es tu nueva mejor amiga. Con su amplio espacio interior y dos bolsillos exteriores de fácil acceso para tus objetos más utilizados, y dos bolsillos interiores seguros para tus pertenencias más valiosas, tendrás todo organizado y a mano. ¡Perfecta para el día a día!",
    price: "48€",
    models: [
      {
        name: "Modelo Skulls",
        img: "/assets/img/products/bandolera-maxi/bandolera-maxi-skulls.jpg",
      },
      {
        name: "Modelo B",
        img: "path/to/modelB.jpg",
      },
    ],
  },
];

const ProductDetails = () => {
  const { productId } = useParams(); // Obtenemos el ID del producto desde la URL

  // Encontramos el producto basado en el ID
  const product = products.find((prod) => prod.id === productId);

  if (!product) {
    return <div>Producto no encontrado.</div>; // Si no existe el producto
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedModel, setSelectedModel] = useState(product.models[0]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center">{product.name}</h1>
      <div className="row">
        {/* Imagen y detalles del producto */}
        <div className="col-md-6">
          <img
            src={selectedColor.img}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4>{product.price}</h4>
          <button className="btn btn-success">Añadir al carrito</button>
          <div className="mt-4">
            <h5>Modelos</h5>
            <div className="d-flex">
              {product.models.map((model, index) => (
                <div
                  key={index}
                  className="p-2"
                  style={{
                    cursor: "pointer",
                    border: model === selectedModel ? "2px solid green" : "none",
                  }}
                  onClick={() => handleModelChange(model)}
                >
                  <img src={model.img} alt={model.name} width="100" />
                </div>
              ))}
            </div>
            <h5>Colores</h5>
            <div className="d-flex">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="p-2"
                  style={{
                    cursor: "pointer",
                    border: color === selectedColor ? "2px solid green" : "none",
                  }}
                  onClick={() => handleColorChange(color)}
                >
                  <img src={color.img} alt={color.name} width="40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
