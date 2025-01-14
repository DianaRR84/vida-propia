import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert, Spinner, Card, Row, Col } from "react-bootstrap";

const VidaEcoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Credenciales de Habitica
  const USER_ID = process.env.REACT_APP_HABITICA_USER_ID; 
  const API_TOKEN = process.env.REACT_APP_HABITICA_API_TOKEN; 
  const API_URL = "https://habitica.com/api/v3";

  // Configuración de autenticación
  const authHeaders = {
    "x-api-user": USER_ID,
    "x-api-key": API_TOKEN,
  };

  // Obtener tareas de Habitica
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks/user`, {
        headers: authHeaders,
      });
      setTasks(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar las tareas.");
    } finally {
      setLoading(false);
    }
  };

  // Completar una tarea
  const completeTask = async (taskId) => {
    try {
      await axios.post(`${API_URL}/tasks/${taskId}/score/up`, {}, {
        headers: authHeaders,
      });
      alert("¡Tarea completada! 🌱");
      fetchTasks(); // Recargar tareas
    } catch (err) {
      console.error(err);
      alert("Error al completar la tarea.");
    }
  };

  // Cargar tareas al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🌿 VidaEco - Hábitos Sostenibles 🌿</h2>

      {loading && <Spinner animation="border" role="status" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col md={4} key={task.id}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>{task.text}</Card.Title>
                  <Card.Text>{task.notes || "Sin descripción"}</Card.Text>
                  <Button
                    variant="success"
                    onClick={() => completeTask(task.id)}
                  >
                    ✅ Completar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Alert variant="info">No tienes tareas. ¡Empieza a crear hábitos sostenibles! 🌎</Alert>
        )}
      </Row>
    </div>
  );
};

export default VidaEcoPage;
