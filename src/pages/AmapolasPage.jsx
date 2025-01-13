import React, { useState, useEffect } from "react";
import { Spinner, Alert, Row, Col, Card, Button } from "react-bootstrap";

const Amapolas = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar los podcasts cuando el componente se monta
    const fetchPodcasts = async () => {
      setLoading(true);
      setError(null);

      // Función para decodificar las entidades HTML
      function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/proxy?url=https://www.ivoox.com/feed_fg_f1860242_filtro_1.xml"
        );

        // Si la respuesta no es exitosa, lanzamos un error
        if (!response.ok) {
          throw new Error("No se pudo cargar el feed de podcasts.");
        }

        // Obtener los datos del feed en formato texto
        const data = await response.text();

        // Parsear el XML del feed
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");

        // Extraer los elementos de podcast
        const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: decodeHtml(item.querySelector("title")?.textContent || ""),
          description: decodeHtml(item.querySelector("description")?.textContent || ""),
          link: item.querySelector("link")?.textContent,
          pubDate: item.querySelector("pubDate")?.textContent,
        }));

        // Establecer el estado de podcasts
        setPodcasts(items);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los podcasts. Por favor, inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Podcasts de Amapolas 2.0</h2>
      {loading && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Row className="g-4">
          {podcasts.map((podcast, index) => (
            <Col md={4} key={index}>
              <Card className="shadow">
                
                <Card.Body>
                  <Card.Title>{podcast.title}</Card.Title>
                  <Card.Text>
                    {podcast.description?.length > 100
                      ? `${podcast.description.slice(0, 100)}...`
                      : podcast.description}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    Publicado: {new Date(podcast.pubDate).toLocaleDateString()}
                  </Card.Text>
                  <Button
                    variant="primary"
                    href={podcast.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Escuchar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Amapolas;
