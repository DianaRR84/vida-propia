import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaLeaf, FaPaintBrush, FaShoppingBag } from "react-icons/fa";

function HomePage() {
    const [quote, setQuote] = useState("");   // Estado para la cita
    const [author, setAuthor] = useState(""); // Estado para el autor
    const [loading, setLoading] = useState(true); // Estado para carga

    // Llamada a la API de citas
    useEffect(() => {
      const fetchQuote = async () => {
          const today = new Date().toLocaleDateString();  // Fecha actual
          const savedQuote = localStorage.getItem("dailyQuote");
          const savedAuthor = localStorage.getItem("dailyAuthor");
          const savedDate = localStorage.getItem("quoteDate");

          // Si la cita guardada es del día actual, cargarla desde localStorage
          if (savedQuote && savedDate === today) {
              setQuote(savedQuote);
              setAuthor(savedAuthor);
              setLoading(false);
          } else {
              try {
                  const response = await fetch("https://api.quotable.io/random");
                  if (!response.ok) {
                      throw new Error("Error al cargar la cita");
                  }
                  const data = await response.json();
                  setQuote(data.content);
                  setAuthor(data.author);

                  // Guardar la nueva cita y la fecha en localStorage
                  localStorage.setItem("dailyQuote", data.content);
                  localStorage.setItem("dailyAuthor", data.author);
                  localStorage.setItem("quoteDate", today);
              } catch (error) {
                  console.error("Error:", error);
                  setQuote("La inspiración también viene de nuestros propios pasos.");
                  setAuthor("Vida Propia");
              } finally {
                  setLoading(false);
              }
          }
      };

      fetchQuote();
  }, []);

    return (
      <div className="container-fluid p-0">
        {/* Hero Section */}
        <section className="hero bg-primary text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Bienvenido a Vida Propia</h1>
            
            {/* Cita del día */}
            {loading ? (
              <p className="lead fst-italic mt-3">Cargando cita del día...</p>
            ) : (
              <p className="lead fst-italic mt-3">
                <strong>Cita del día:</strong> "{quote}" 
                <span className="text-light">- {author}</span>
              </p>
            )}

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link to="/signup" className="btn btn-light btn-lg shadow-sm">
                ÚNETE AL CLUB
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg shadow-sm">
                YA SOY VIDA PROPIA
              </Link>
            </div>
          </div>
        </section>
  
        {/* About Section */}
        <section id="about" className="py-5 bg-light">
          <div className="container text-center">
            <h2 className="fw-bold display-5 text-primary">¿Quiénes Somos?</h2>
            <p className="text-muted mt-3 fs-5">
              Un proyecto donde la sostenibilidad, el consumo responsable, la creatividad y el impulso rural son nuestros principales pilares. 
              <b>VIDAPROPIA</b> es nuestro estilo de vida, y queremos que nos acompañes en esta aventura…
            </p>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="features bg-white py-5">
          <div className="container">
            <h2 className="text-center text-primary fw-bold mb-5">¿Qué te ofrecemos?</h2>
            <div className="row text-center">
              <div className="col-md-4 mb-4">
                <Link to="/vidaeco" className="text-decoration-none text-dark">
                  <div className="p-4 rounded shadow-lg hover-shadow">
                    <FaLeaf className="text-success fs-1 mb-3" />
                    <h4 className="fw-bold">VIDAECO</h4>
                    <p className="text-muted">
                      Una sección llena de alternativas para que tus actividades diarias sean más responsables.
                      Opciones para generar menos residuos en tu propio hogar o si tienes que comer fuera de casa.
                      Declara la guerra a los plásticos de un solo uso.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-4">
                <Link to="/talleres" className="text-decoration-none text-dark">
                  <div className="p-4 rounded shadow-lg hover-shadow">
                    <FaPaintBrush className="text-info fs-1 mb-3" />
                    <h4 className="fw-bold">TALLERES</h4>
                    <p className="text-muted">
                      La creatividad es un regalo y nos encanta fomentarla con todo tipo de talleres. 
                      Tanto si los impartimos nosotras como si vienen expertos en cada campo priorizamos el aprendizaje práctico. Consúltanos.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-4">
                <Link to="/store" className="text-decoration-none text-dark">
                  <div className="p-4 rounded shadow-lg hover-shadow">
                    <FaShoppingBag className="text-danger fs-1 mb-3" />
                    <h4 className="fw-bold">TIENDA</h4>
                    <p className="text-muted">
                      Nuestras mochilas y bolsos están hechos a partir de tejidos recuperados de la campaña de recogida que tenemos en la tienda y pequeñas cantidades de telas especiales que compramos.
                      <br></br>
                      Entra en nuestra tienda.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="cta bg-primary text-white text-center py-5">
          <div className="container">
            <h2 className="fw-bold">¡Únete a nuestra comunidad!</h2>
            <p className="lead">Regístrate hoy y comienza tu transformación.</p>
            <Link to="/signup" className="btn btn-light btn-lg mt-3 shadow-sm">
              Regístrate Ahora
            </Link>
          </div>
        </section>
      </div>
    );
}
  
export default HomePage;
