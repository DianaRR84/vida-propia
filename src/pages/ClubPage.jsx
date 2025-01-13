import { useState } from "react";
import { Link } from "react-router-dom";
import SorteoModal from "../components/SorteoModal"; // Componente para el modal de sorteo

const Club = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Contenido Exclusivo para Socios</h1>

      {/* Sección de tips de costura */}
      <div className="seccion mb-4 p-4 border rounded-3 shadow-sm">
        <h2 className="h3 text-primary">Tips de Costura</h2>
        <p>Accede a consejos exclusivos para mejorar tus habilidades de costura.</p>
        <Link to="/tips" className="btn btn-outline-primary">
          Ir a Tips de Costura
        </Link>
      </div>

      {/* Sección de sorteos */}
      <div className="seccion mb-4 p-4 border rounded-3 shadow-sm">
        <h2 className="h3 text-success">Sorteos</h2>
        <p>Participa en nuestros sorteos y gana premios increíbles.</p>
        <button onClick={openModal} className="btn btn-outline-success">
          Ver Sorteos
        </button>
      </div>

      {/* Modal para apuntarse al sorteo */}
      {isModalOpen && <SorteoModal closeModal={closeModal} />}
    </div>
  );
};

export default Club;
