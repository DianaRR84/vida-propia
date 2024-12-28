import React from "react";
import tips from "../data/tips.js"; // Importa los datos si están en un archivo separado

const TipsCard = ({ title, tips }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">{title}</h5>
        <ul className="list-group list-group-flush">
          {tips.map((tip, index) => (
            <li key={index} className="list-group-item">
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TipsPage = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Consejos Rápidos</h1>
      <div className="row g-4">
        {tips.map((category, index) => (
          <div className="col-md-4" key={index}>
            <TipsCard title={category.type} tips={category.tips} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsPage;
