import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const ProjectsPage = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPodcasts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:4000/proxy?url=https://www.ivoox.com/feed_fg_f1860242_filtro_1.xml"
      );
      if (!response.ok) {
        throw new Error("No se pudo cargar el feed de podcasts.");
      }
      const data = await response.text();

      // Parsear el XML
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/xml");
      const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
        title: item.querySelector("title")?.textContent,
        description: item.querySelector("description")?.textContent,
        link: item.querySelector("link")?.textContent,
        pubDate: item.querySelector("pubDate")?.textContent,
      }));
      setPodcasts(items);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los podcasts. Por favor, inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (section) => {
    if (section === "Amapolas 2.0") {
      fetchPodcasts();
    }
    setCurrentSection(section);
  };

  return (
    <Container className="my-5">
      {!currentSection && (
        <>
          <h1 className="text-center mb-5">Proyectos</h1>
          <Row className="g-4">
            {/* Amapolas 2.0 */}
            <Col md={6}>
              <Card className="shadow">
                <Card.Img
                  variant="top"
                  src="/assets/img/amapolas.JPG"
                  alt="Amapolas 2.0"
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>Amapolas 2.0</Card.Title>
                  <Card.Text>
                    Un espacio para reflexionar sobre el desarrollo personal,
                    el feminismo y la creatividad. Descubre más sobre nuestra
                    comunidad.
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => handleSectionClick("Amapolas 2.0")}
                  >
                    Saber más...
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* La Revolución de las Personas */}
            <Col md={6}>
              <Card className="shadow">
                <Card.Img
                  variant="top"
                  src="/assets/img/personas.jpg"
                  alt="La Revolución de las Personas"
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>La Revolución de las Personas</Card.Title>
                  <Card.Text>
                    Costura que transforma.
                    <br></br>
                    Proyecto colaborativo de producción responsable de moda con mujeres en Paita (Perú) y coordinado por Vidapropia.
                  </Card.Text>
                  <Button as={Link} to="/revolucion" variant="success">
                    Saber más...
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {currentSection === "Amapolas 2.0" && (
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => setCurrentSection(null)}
            className="mb-4"
          >
            Volver
          </Button>
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
      )}

      {currentSection === "La Revolución de las Personas" && (
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => setCurrentSection(null)}
            className="mb-4"
          >
            Volver
          </Button>
          <h2 className="text-center mb-4">La Revolución de las Personas</h2>
          <p className="text-center">
            Aquí puedes agregar más contenido sobre este proyecto, como
            información detallada, imágenes, enlaces, etc.
          </p>
        </div>
      )}
    </Container>
  );
};

export default ProjectsPage;
