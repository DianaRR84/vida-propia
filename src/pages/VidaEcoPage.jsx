import React, { useEffect, useState } from "react";
import axios from "axios";

const VidaEcoPage = () => {
  const [videos, setVideos] = useState([]);
  
  // Tu Access Token generado en Vimeo
  const vimeoAccessToken = "b90a799d326b17f5ad5d9aef9a4e8a5a";

  // Función para obtener los videos de Vimeo
  const fetchVimeoVideos = async () => {
    try {
      const response = await axios.get("https://api.vimeo.com/videos", {
        headers: {
          Authorization: `Bearer ${vimeoAccessToken}`,
        },
        params: {
          query: "recycling", // Búsqueda relacionada con reciclaje de ropa
          per_page: 6, // Número de videos que deseas mostrar
        },
      });

      setVideos(response.data.data);
    } catch (error) {
      console.error("Error al obtener los videos de Vimeo:", error);
    }
  };

  // Cargar los videos al montar el componente
  useEffect(() => {
    fetchVimeoVideos();
  }, []);

  return (
    <div className="container my-5">
      {/* Título Principal */}
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">VIDAECO</h1>
        <p className="lead text-muted">
          Una sección llena de alternativas para que tus actividades diarias sean más responsables.
          <br />
          Opciones para generar menos residuos en tu propio hogar o si tienes que comer fuera de casa.
          <br />
          Declara la guerra a los plásticos de un solo uso.
        </p>
      </section>

      {/* Videos sobre Reciclaje */}
      <section className="row g-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.uri} className="col-md-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{video.name}</h5>
                  <p className="card-text text-muted">
                    {video.description ? video.description : "No hay descripción disponible."}
                  </p>
                  <a
                    href={`https://vimeo.com${video.uri}`}
                    className="btn btn-outline-success"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Video
                  </a>
                </div>
                <div className="card-footer">
                  <iframe
                    title={video.name}
                    src={`https://player.vimeo.com/video/${video.uri.split("/")[2]}`}
                    width="100%"
                    height="215"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Cargando videos...</p>
        )}
      </section>
    </div>
  );
};

export default VidaEcoPage;
