import React from "react";
import { Link } from "react-router-dom";
import bandanasImage from "../assets/img/bandanas.jpg";
import bandolerasImage from "../assets/img/bandoleras.jpg";
import bandolerasmaxiImage from "../assets/img/bandolerasmaxi.jpg";
import billeterasImage from "../assets/img/billeteras.jpg";
import bolsosjaponesImage from "../assets/img/bolsosjapones.jpg";
import bolsosmanoImage from "../assets/img/bolsosmano.jpg";
import mochilasImage from "../assets/img/mochilas.jpg";
import pajaritasImage from "../assets/img/pajaritas.jpg";
import rinonerasImage from "../assets/img/rinoneras.jpg";
import snacksImage from "../assets/img/snacks.jpg";

// Simula una lista de productos
const products = [
  { id: "mochilayakarta", name: "Mochila Yakarta", image: mochilasImage },
  { id: "bandanas", name: "Bandanas", image: bandanasImage },
  { id: "bandoleras", name: "Bandoleras", image: bandolerasImage },
  { id: "bandolerasmaxi", name: "Bandoleras Maxi", image: bandolerasmaxiImage },
  { id: "4", name: "Billeteras", image: billeterasImage },
  { id: "5", name: "Bolsos de mano", image: bolsosmanoImage },
  { id: "6", name: "Bolsos Japoneses", image: bolsosjaponesImage },
  { id: "7", name: "Riñoneras", image: rinonerasImage },
  { id: "8", name: "Bolsas de Snacks", image: snacksImage },
];

const StorePage = () => {
  return (
    <div className="container my-5">
      <h1 className="display-4 text-center">Tienda</h1>
      <div className="row g-4 text-center">

        {/* Mapea los productos */}
        {/* Mochila Yakarta */}
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card shadow border-0">
              <img
                src={product.image}
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
        ))}


      </div>
    </div>
  );
};

export default StorePage;