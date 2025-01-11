import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Dropdown } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configurar moment en español y que la semana inicie en lunes
moment.locale("es");
moment.updateLocale("es", {
  week: {
    dow: 1, // Lunes
  },
});

const localizer = momentLocalizer(moment);

const TalleresPage = () => {
  const [talleres, setTalleres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Cargar talleres desde el JSON
  useEffect(() => {
    fetch("/data/talleres.json")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los talleres.");
        return response.json();
      })
      .then((data) => {
        const parsedData = data.map((taller) => ({
          ...taller,
          start: new Date(taller.start),
          end: new Date(taller.end),
        }));
        setTalleres(parsedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Validar cupo completo
  const isCupoLleno = (taller) => {
    return taller.inscritos.length >= taller.cupoMaximo;
  };

  // Seleccionar taller al hacer clic
  const handleSelectEvent = (event) => {
    setSelectedTaller(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTaller(null);
  };

  // Inscripción
  const handleSubmitInscription = (event) => {
    event.preventDefault();

    if (isCupoLleno(selectedTaller)) {
      alert("El taller ya está lleno. No puedes inscribirte.");
      return;
    }

    const name = event.target.name.value;
    const email = event.target.email.value;

    const updatedTaller = {
      ...selectedTaller,
      inscritos: [...selectedTaller.inscritos, { name, email }],
    };

    setTalleres((prevTalleres) =>
      prevTalleres.map((taller) =>
        taller.id === updatedTaller.id ? updatedTaller : taller
      )
    );

    alert("¡Inscripción realizada con éxito!");
    handleCloseModal();
  };

  // Filtrar talleres por mes seleccionado
  const filterTalleresByMonth = (month) => {
    const startOfMonth = moment(month).startOf("month").toDate();
    const endOfMonth = moment(month).endOf("month").toDate();

    return talleres.filter(
      (taller) =>
        moment(taller.start).isSameOrAfter(startOfMonth) &&
        moment(taller.end).isBefore(endOfMonth)
    );
  };

  // Cambiar mes
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Nuestros Talleres</h1>

      <Row>
        {/* Calendario */}
        <Col md={8}>
          <Calendar
            localizer={localizer}
            events={filterTalleresByMonth(selectedMonth)}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={["month"]}
            date={selectedMonth}
            onNavigate={handleMonthChange}
            culture="es"
            formats={{
              weekdayFormat: (date) => moment(date).format("dddd"),
              dayFormat: (date) => moment(date).format("D"),
            }}
            onSelectEvent={handleSelectEvent}
            toolbar={true}
            dayPropGetter={(date) => {
              const hasEvent = talleres.some(
                (taller) =>
                  moment(taller.start).isSame(date, "day") ||
                  moment(taller.end).isSame(date, "day")
              );
              if (hasEvent) {
                return {
                  className: "bg-info text-white",
                  style: { cursor: "pointer" },
                };
              }
              return {};
            }}
          />
        </Col>

        {/* Selector de mes */}
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

      {/* Modal del taller */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTaller?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTaller && (
            <>
              <div className="text-center">
                <img
                  src={selectedTaller.image}
                  alt={selectedTaller.title}
                  className="img-fluid mb-3"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <p>{selectedTaller.description}</p>
              <p>
                {isCupoLleno(selectedTaller) ? (
                  <span className="text-danger">Cupo completo</span>
                ) : (
                  <span>
                    {selectedTaller.inscritos.length} / {selectedTaller.cupoMaximo} inscritos
                  </span>
                )}
              </p>

              {!isCupoLleno(selectedTaller) && (
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
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TalleresPage;
