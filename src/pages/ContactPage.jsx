// Contact.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com"; // Importar EmailJS

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    emailjs
      .send(
        "service_yourServiceId", // Reemplaza con tu ID de servicio EmailJS
        "template_yourTemplateId", // Reemplaza con tu ID de plantilla EmailJS
        formData,
        "your_userId" // Reemplaza con tu clave pública EmailJS
      )
      .then(
        () => {
          setSuccessMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("Error al enviar el mensaje:", error);
          setErrorMessage("Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.");
        }
      );
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">Contáctanos</h2>
      <div className="row">
        {/* Formulario de Contacto */}
        <div className="col-md-8">
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            {/* Campo Nombre */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo Correo */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo Asunto */}
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo Mensaje */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Información de Contacto */}
        <div className="col-md-4">
          <div className="p-4 border rounded shadow">
            <h5 className="text-primary">Información de Contacto</h5>
            <p className="mb-2">
              <i className="bi bi-telephone-fill me-2"></i> Teléfono:{" "}
              <a href="tel:+34979850876" className="text-decoration-none">
                +34 979 85 08 76
              </a>
            </p>
            <p className="mb-2">
              <i className="bi bi-envelope-fill me-2"></i> Correo:{" "}
              <a
                href="mailto:vidapropia14@gmail.com"
                className="text-decoration-none"
              >
                vidapropia14@gmail.com
              </a>
            </p>
            <p className="mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i> Dirección: Calle Santa
              Bárbara, 1, 34880 Guardo, Palencia
            </p>
          </div>

          {/* Mapa de Google */}
          <div className="mt-4 border rounded shadow">
            <iframe
              title="Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.5918689431346!2d-4.8442532!3d42.7753714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd47e26b6cb7f107%3A0xeb10a3f9c6c4e7b!2sC.%20Sta.%20B%C3%A1rbara%2C%201%2C%2034880%20Guardo%2C%20Palencia!5e0!3m2!1ses!2ses!4v1691086463732!5m2!1ses!2ses"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
