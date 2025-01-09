import React, { useState, useEffect } from "react";

const RevolucionPage = () => {
    const [videos, setVideos] = useState([]);
    const [playingVideo, setPlayingVideo] = useState(null); // Controla qué video está reproduciéndose
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/revolucionVideos.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar los videos.");
                }
                return response.json();
            })
            .then((data) => {
                setVideos(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const handlePlay = (videoId) => {
        setPlayingVideo(videoId); // Marca el video que está en reproducción
    };

    if (loading) {
        return <div className="container my-5">Cargando videos...</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">La Revolución de las Personas</h1>
            <div className="row g-4">
                {videos.map((video) => (
                    <div className="col-md-4" key={video.id}>
                        <div className="card shadow border-0">
                            <div
                                className="video-container"
                                style={{
                                    position: "relative",
                                    paddingTop: "56.25%", // Relación de aspecto 16:9
                                    overflow: "hidden",
                                    borderRadius: "10px", // Opcional, para esquinas redondeadas
                                }}
                            >
                                <video
                                    className="video-player"
                                    src={video.url}
                                    controls
                                    onPlay={() => handlePlay(video.id)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain", // Mantiene las proporciones del video
                                    }}
                                >
                                    Tu navegador no soporta la reproducción de este video.
                                </video>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{video.title}</h5>
                                <p className="card-text">{video.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevolucionPage;
