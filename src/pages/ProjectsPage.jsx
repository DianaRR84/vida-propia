// ProjectsPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const ProjectsPage = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const navigate = useNavigate(); // Hook de redirección

  const handleSectionClick = (section) => {
    if (section === "Amapolas 2.0") {
      navigate("/amapolas"); // Redirigir a la página Amapolas
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
    </Container>
  );
};

export default ProjectsPage;

