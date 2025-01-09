import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Dropdown } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa la localización en español
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es"); // Configura el idioma a español

moment.updateLocale("es", {
  week: {
    dow: 1, // Primer día de la semana (0 = domingo, 1 = lunes)
  },
});

const localizer = momentLocalizer(moment); // Crear el localizador de moment

const TalleresPage = () => {
  const [talleres, setTalleres] = useState([]); // Cargar talleres dinámicamente
  const [showModal, setShowModal] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate);
  const [inscripto, setInscripto] = useState(false); // Estado para controlar la inscripción


  useEffect(() => {
    // Cargar talleres desde el archivo JSON
    fetch("/data/talleres.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los talleres.");
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = data.map((taller) => ({
          ...taller,
          start: new Date(taller.start), // Convertir a objetos Date
          end: new Date(taller.end),
        }));
        setTalleres(parsedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Validar si el taller está lleno
  const isCupoLleno = (taller) => {
    return taller.inscritos.length >= taller.cupoMaximo;
  };

  // Manejar el evento de selección del taller
  const handleSelectEvent = (event) => {
    setSelectedTaller(event);
    setShowModal(true);
  };

  // Manejar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTaller(null);
  };

  const handleSubmitInscription = (event) => {
    event.preventDefault();

    if (isCupoLleno(selectedTaller)) {
      alert("El taller ya está lleno. No puedes inscribirte.");
      return;
    }

    const name = event.target.name.value;
    const email = event.target.email.value;

    // Añadir la persona inscrita al taller seleccionado
    const updatedTaller = {
      ...selectedTaller,
      inscritos: [...selectedTaller.inscritos, { name, email }],
    };

    // Actualizar el estado de talleres con la nueva lista de inscritos
    setTalleres((prevTalleres) =>
      prevTalleres.map((taller) =>
        taller.id === updatedTaller.id ? updatedTaller : taller
      )
    );

    alert("Inscripción realizada con éxito");
    setInscripto(true);
    handleCloseModal();
  };

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
            style={{ height: 400 }}
            views={["month"]}
            date={selectedMonth}
            onNavigate={handleNavigate}
            culture="es" // Establecer el idioma a español
            formats={{
              weekdayFormat: (date, culture, localizer) => moment(date).format("dddd"), // Formato completo del día en español
            }}
            onSelectEvent={handleSelectEvent}
            toolbar={false} // Elimina los botones predeterminados
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
          <div className="text-center">
            <img
              src={selectedTaller?.image}
              alt={selectedTaller?.title}
              className="img-fluid mb-3"
              style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }} // Estilo para limitar tamaño
            />
          </div>
          <p>{selectedTaller?.description}</p>

          <p>
            {isCupoLleno(selectedTaller) ? (
              <span className="text-danger">Cupo completo</span>
            ) : (
              <span>
                {selectedTaller?.inscritos?.length} / {selectedTaller?.cupoMaximo} inscritos
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TalleresPage;
