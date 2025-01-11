import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();  // Obtener el parámetro de la categoría desde la URL

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        // Filtrar los productos según la categoría si existe
        if (category) {
          const filteredProducts = data.filter((product) =>
            product.category.toLowerCase() === category.toLowerCase()
          );
          setProducts(filteredProducts);
        } else {
          setProducts(data); // Si no hay categoría, mostrar todos los productos
        }
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [category]); // Reejecutar cuando la categoría cambie

  return (
    <div className="container my-5">
      <h1 className="display-4 text-center">Tienda</h1>

      {/* Mostrar productos filtrados */}
      <div className="row g-4 text-center">
      {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card shadow border-0">
                <img
                  src={product.models[0].img} // Muestra la imagen del primer modelo
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>

                  <Link to={`/product/${product.id}`} className="btn btn-outline-success">
                    Ver producto
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No se encontraron productos para esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;