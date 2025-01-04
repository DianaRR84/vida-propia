import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Dropdown } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configuración de moment.js en español
moment.locale("es"); // Establece el idioma a español para moment.js

// Localización para el calendario (en español)
const localizer = momentLocalizer(moment);

// Definir los talleres con fechas
const talleres = [
  {
    id: 1,
    title: "Taller de Reciclaje",
    start: new Date(2025, 3, 15, 10, 0), // Mes: 0 es enero, 3 es abril, etc.
    end: new Date(2025, 3, 15, 12, 0),
    description: "Aprende a reciclar y reutilizar objetos.",
    image: "/images/taller-reciclaje.jpg", // Ruta de la imagen
  },
  {
    id: 2,
    title: "Taller de Creación de Bolsos",
    start: new Date(2025, 4, 20, 14, 0),
    end: new Date(2025, 4, 20, 16, 0),
    description: "Crea tu propio bolso con materiales reciclados.",
    image: "/images/taller-bolsos.jpg",
  },
  // Agregar más talleres aquí
];

const TalleresPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // Fecha actual para mostrar el mes actual
  const [selectedMonth, setSelectedMonth] = useState(currentDate); // Fecha seleccionada para mostrar el mes

  // Mostrar los eventos cuando se selecciona un evento
  const handleSelectEvent = (event) => {
    setSelectedTaller(event);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTaller(null);
  };

  // Enviar la inscripción
  const handleSubmitInscription = (event) => {
    event.preventDefault();
    alert("Inscripción realizada con éxito");
    handleCloseModal();
  };

  // Filtrar los talleres para el mes seleccionado
  const filterTalleresByMonth = (month) => {
    const startOfMonth = moment(month).startOf("month").toDate();
    const endOfMonth = moment(month).endOf("month").toDate();

    return talleres.filter(
      (taller) =>
        moment(taller.start).isSameOrAfter(startOfMonth) &&
        moment(taller.end).isBefore(endOfMonth)
    );
  };

  // Cambiar el mes seleccionado
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // Manejar la navegación del calendario
  const handleNavigate = (date) => {
    setSelectedMonth(date);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Nuestros Talleres</h1>

      <Row>
        {/* Calendario del mes actual */}
        <Col md={8}>
          <Calendar
            localizer={localizer}
            events={filterTalleresByMonth(selectedMonth)}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={["month"]}
            date={selectedMonth} // Aseguramos que se muestre el mes seleccionado
            onNavigate={handleNavigate} // Actualiza el mes cuando se navega
            onSelectEvent={handleSelectEvent}
            selectable // Habilitar selección de días
            dayPropGetter={(date) => {
              // Resaltar los días con talleres
              const hasEvent = talleres.some(
                (taller) =>
                  moment(taller.start).isSame(date, "day") ||
                  moment(taller.end).isSame(date, "day")
              );
              if (hasEvent) {
                return {
                  className: "bg-info text-white", // Colorear los días con talleres
                  style: { cursor: "pointer" },
                };
              }
              return {};
            }}
          />
        </Col>

        {/* Selector para cambiar el mes */}
        <Col md={4}>
          <h4 className="mb-3">Selecciona otro mes</h4>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {moment(selectedMonth).format("MMMM YYYY")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Array.from({ length: 12 }).map((_, index) => {
                const month = moment().month(index);
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleMonthChange(month.toDate())}
                  >
                    {month.format("MMMM YYYY")}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Modal para mostrar los detalles del taller */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTaller?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedTaller?.image}
            alt={selectedTaller?.title}
            className="img-fluid mb-3"
          />
          <p>{selectedTaller?.description}</p>

          <Form onSubmit={handleSubmitInscription}>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Introduce tu nombre" required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Introduce tu correo" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Inscribirse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TalleresPage;
