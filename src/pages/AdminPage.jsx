import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Importar configuración de Firebase
import { collection, getDocs } from "firebase/firestore"; // Para obtener los correos de Firestore

// Importar los íconos de Bootstrap
import { FiMail, FiGift } from "react-icons/fi"; // Iconos de correo y sorteo

const Admin = () => {
  const [emails, setEmails] = useState([]); // Guardará los correos de los usuarios
  const [message, setMessage] = useState(""); // Estado para el mensaje del correo
  const [isSending, setIsSending] = useState(false); // Para controlar el estado de envío

  // Cargar los correos de los usuarios desde Firebase Firestore
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const usersCollection = collection(db, "users"); // Accedemos a la colección de usuarios
        const userSnapshot = await getDocs(usersCollection); // Obtenemos los documentos
        const userList = userSnapshot.docs.map((doc) => doc.data().email); // Extraemos los correos
        setEmails(userList); // Guardamos los correos en el estado
      } catch (error) {
        console.error("Error al obtener los correos:", error);
      }
    };

    fetchEmails();
  }, []); // Ejecutar solo una vez al montar el componente

  // Función para enviar correos utilizando SendGrid
  const sendEmail = async () => {
    if (!message || emails.length === 0) {
      alert("Por favor, ingresa un mensaje y asegúrate de que haya correos.");
      return;
    }

    setIsSending(true); // Iniciar el estado de envío

    // Aquí llamamos a la API de SendGrid
    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_SENDGRID_API_KEY`, // Reemplaza con tu clave de API
        },
        body: JSON.stringify({
          personalizations: emails.map((email) => ({
            to: [{ email }],
            subject: "Mensaje desde el Administrador de Vida Propia",
          })),
          from: { email: "admin@vidapropia.com" }, // El correo del remitente
          content: [
            {
              type: "text/plain",
              value: message, // El mensaje que se enviará
            },
          ],
        }),
      });

      if (response.ok) {
        alert("Correos enviados exitosamente!");
      } else {
        alert("Hubo un error al enviar los correos.");
      }
    } catch (error) {
      console.error("Error al enviar correos:", error);
      alert("Hubo un error al enviar los correos.");
    }

    setIsSending(false); // Detener el estado de envío
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Panel de Administrador</h1>

      <div className="row">
        {/* Sección de Envío de Correos */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h3>
                <FiMail /> Envío de Correos
              </h3>
            </div>
            <div className="card-body">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="btn btn-primary mt-3"
                onClick={sendEmail}
                disabled={isSending}
              >
                {isSending ? "Enviando..." : "Enviar Correos"}
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Sorteos */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h3>
                <FiGift /> Sorteos
              </h3>
            </div>
            <div className="card-body">
              <p>Aquí se gestionan los sorteos de Vida Propia.</p>
              {/* Agrega la lógica para manejar los sorteos */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
