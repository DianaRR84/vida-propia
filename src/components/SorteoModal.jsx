import React from "react";

const SorteoModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="modal-content bg-white p-4 rounded-3 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">¡Apúntate al Sorteo!</h2>
        <p className="text-center mb-4">Ingresa tus datos para participar en el sorteo.</p>
        
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Tu correo electrónico"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Participar
          </button>
        </form>
        
        <button
          onClick={closeModal}
          className="btn btn-secondary w-100"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SorteoModal;

