import { useParams, Link } from "react-router-dom";
import { Container, Card, Badge, Button, Row, Col, ListGroup } from "react-bootstrap";

function DetalleFicha({ pacientes }) {
  const { id } = useParams();
  
  // Buscar el paciente por ID convirtiendo el parámetro a número (Guía 11)
  const paciente = pacientes.find((item) => item.id === Number(id));

  // Manejo de paciente no encontrado (Guía 11)
  if (!paciente) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-warning shadow-sm">
          <h2 className="h4">Ficha Médica No Encontrada</h2>
          <p>El paciente solicitado no existe o fue retirado del sistema.</p>
          <Link to="/" className="btn btn-primary mt-2">
            Volver al Inicio
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-3">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← Volver al Listado
        </Link>
      </div>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
          <h1 className="h3 mb-0">🐾 Ficha Médica: {paciente.nombre}</h1>
          <Badge bg={paciente.vacunasAlDia ? "success" : "warning"} className="fs-6">
            {paciente.vacunasAlDia ? "Vacunas al Día" : "Vacunación Pendiente"}
          </Badge>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-4">
            {/* Información General del Paciente */}
            <Col md={6}>
              <h2 className="h5 text-primary border-bottom pb-2">Datos del Paciente</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Especie:</strong> {paciente.especie}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Raza:</strong> {paciente.raza}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Próximo Control/Vacuna:</strong> {paciente.proximaVacuna || "Sin fecha programada"}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Información del Dueño */}
            <Col md={6}>
              <h2 className="h5 text-primary border-bottom pb-2">Datos del Propietario</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Nombre Dueño/a:</strong> {paciente.dueno}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>ID Propietario:</strong> {paciente.duenoId}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Clínica Asignada:</strong> San Marcos - Rancagua
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {/* Historial Clínico */}
          <div className="mt-4 pt-3 border-top">
            <h2 className="h5 text-primary mb-3">Historial de Consultas y Atenciones</h2>
            {paciente.historial && paciente.historial.length > 0 ? (
              <ListGroup>
                {paciente.historial.map((registro, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center">
                    <span className="me-2">📋</span> {registro}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted italic">No hay atenciones previas registradas en la ficha digital.</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DetalleFicha;