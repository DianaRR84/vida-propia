import React from 'react';
import { Link } from "react-router-dom";


function HomePage() {
    return (
      <div className="container-fluid p-0">
        {/* Hero Section */}
        <section className="hero bg-primary text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Bienvenido a Vida Propia</h1>
            <p className="lead">Inspiración para transformar tu vida</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <a href="#about" className="btn btn-light btn-lg">
                ÚNETE AL CLUB
              </a>
              <Link to="/login" className="btn btn-outline-light btn-lg">
                YA SOY VIDA PROPIA
              </Link>
            </div>
          </div>
        </section>
  
        {/* About Section */}
        <section id="about" className="py-5">
          <div className="container text-center">
            <h2 className="fw-bold">¿Quiénes Somos?</h2>
            <p className="text-muted mt-3">
              Un proyecto donde la sostenibilidad, el consumo responsable, la creatividad y el impulso rural, son nuestros principales pilares. VIDAPROPIA es nuestro estilo de vida, y queremos que nos acompañéis en esta aventura…
              Te ofrecemos recursos, apoyo y una comunidad para empoderarte y ayudarte a construir una vida que amas.
            </p>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="bg-light py-5">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-4 mb-4">
                <i className="bi bi-heart-fill text-danger fs-1"></i>
                <h4 className="mt-3">Apoyo Comunitario</h4>
                <p className="text-muted">Una comunidad que te comprende y te respalda.</p>
              </div>
              <div className="col-md-4 mb-4">
                <i className="bi bi-book-half text-info fs-1"></i>
                <h4 className="mt-3">Recursos Educativos</h4>
                <p className="text-muted">Cursos y artículos para tu crecimiento personal.</p>
              </div>
              <div className="col-md-4 mb-4">
                <i className="bi bi-globe text-success fs-1"></i>
                <h4 className="mt-3">Impacto Global</h4>
                <p className="text-muted">Inspiración para transformar vidas en todo el mundo.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="cta bg-primary text-white text-center py-5">
          <div className="container">
            <h2 className="fw-bold">¡Únete a nuestra comunidad!</h2>
            <p className="lead">Regístrate hoy y comienza tu transformación.</p>
            <Link to="/signup" className="btn btn-light btn-lg mt-3">
              Regístrate Ahora
            </Link>
          </div>
        </section>
      </div>
    );
}
  
export default HomePage;
  