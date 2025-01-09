import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StorePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center">Tienda</h1>
      <div className="row g-4 text-center">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card shadow border-0">
              <img
                src={product.models[0].img} // Muestra la imagen del primer modelo
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p>{product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-outline-success">
                  Ver producto
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
