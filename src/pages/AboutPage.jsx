import React from "react";
import sostenibleImage from "/assets/img/sostenible.jpg";
import localImage from "/assets/img/local.jpg";
import exclusividadImage from "/assets/img/exclusividad.jpg";

const AboutPage = () => {
  return (
    <div className="container my-5">
      {/* Sección de Introducción */}
      <section className="text-center mb-5">
        <h1 className="display-3 text-primary fw-bold">Bienvenidos a VidaPropia</h1>
        <p className="lead text-dark mb-4" style={{ fontSize: "1.2rem" }}>
          <b>SOMOS MÓNICA Y SANDRA, PRIMAS Y COMPAÑERAS DE TRABAJO</b>
          <br />
          Juntas dirigimos <b>VIDAPROPIA</b>, una marca de bolsos y accesorios hechos a mano, responsables con el medio ambiente al utilizar tejidos recuperados y producidos en nuestra tienda-taller de Guardo, Montaña Palentina.
          <br />
          <b>VIDAPROPIA</b> nace de la ilusión por <b>crear artículos originales, diferentes y únicos</b>. De <b>dar segundas vidas a tejidos</b> y de querer <b>vivir en un entorno incomparable en el mundo rural como es nuestra comarca, La Montaña Palentina.</b>
          <br />
          Nuestro carácter está marcado a fuego en todo lo que rodea este proyecto: <b>la pasión por viajar, respetar el medio ambiente y participar al máximo en nuestra comunidad.</b>
        </p>
        <a href="#valores" className="btn btn-success btn-lg shadow-lg">
          Descubre más
        </a>
      </section>

      {/* Sección sobre la importancia de la moda sostenible */}
      <section className="row justify-content-center mb-5" id="valores">
        <div className="col-md-8 text-center">
          <h2 className="text-warning display-4 mb-3">¿Por qué la moda sostenible?</h2>
          <p className="text-muted fs-5">
            La industria de la moda es responsable de una gran parte de la contaminación mundial. Al optar por un enfoque sostenible, podemos reducir el impacto ambiental y mejorar la calidad de vida de las personas que producen nuestra ropa.
            Cada decisión cuenta.
          </p>
        </div>
      </section>

      {/* Sección de Valores de VidaPropia */}
      <section className="text-center mb-5">
        <h2 className="text-primary mb-4">Nuestros Valores</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Sostenible y Responsable */}
          <div className="col">
            <div className="card shadow-lg border-0 rounded-4 bg-light hover-shadow">
              <img
                src={sostenibleImage}
                className="card-img-top rounded-top-4"
                alt="Sostenible"
              />
              <div className="card-body">
                <h5 className="card-title text-success">SOSTENIBLE Y RESPONSABLE</h5>
                <p className="card-text text-muted">
                  Nuestro objetivo es promover una moda que respete el medio ambiente, eligiendo materiales y procesos que reduzcan el impacto en el planeta.
                </p>
              </div>
            </div>
          </div>

          {/* Producción Local */}
          <div className="col">
            <div className="card shadow-lg border-0 rounded-4 bg-light hover-shadow">
              <img
                src={localImage}
                className="card-img-top rounded-top-4"
                alt="Local"
              />
              <div className="card-body">
                <h5 className="card-title text-success">PRODUCCIÓN LOCAL</h5>
                <p className="card-text text-muted">
                  Apoyamos las prácticas de comercio justo, asegurándonos de que todos los involucrados en la cadena de producción trabajen en condiciones justas y transparentes.
                </p>
              </div>
            </div>
          </div>

          {/* Exclusividad */}
          <div className="col">
            <div className="card shadow-lg border-0 rounded-4 bg-light hover-shadow">
              <img
                src={exclusividadImage}
                className="card-img-top rounded-top-4"
                alt="Exclusividad"
              />
              <div className="card-body">
                <h5 className="card-title text-success">EXCLUSIVIDAD</h5>
                <p className="card-text text-muted">
                  Fomentamos la creatividad y la innovación en cada prenda, con diseños únicos que promueven el reciclaje y el reuso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default AboutPage;
