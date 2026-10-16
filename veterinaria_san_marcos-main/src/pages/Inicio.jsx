import { useState } from "react";
import { Container, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TarjetaPaciente from "../components/TarjetaPaciente";

function Inicio({ pacientes, citas }) {
  const [busqueda, setBusqueda] = useState("");
  const [especieFiltro, setEspecieFiltro] = useState("Todas");
  const navigate = useNavigate();

  const pacientesFiltrados = pacientes.filter((p) => {
    const coincideEspecie = especieFiltro === "Todas" || p.especie === especieFiltro;
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.dueno.toLowerCase().includes(busqueda.toLowerCase());
    return coincideEspecie && coincideBusqueda;
  });

  const vacunasPendientes = pacientes.filter((p) => !p.vacunasAlDia).length;

  return (
    <>
      {/* Banner / Hero */}
      <div className="p-4 p-md-5 mb-4 rounded-3 bg-white shadow-sm border-start border-primary border-5">
        <div className="container-fluid py-2">
          <h1 className="display-6 fw-bold text-dark">Clínica Veterinaria San Marcos</h1>
          <p className="col-md-8 fs-6 text-muted mb-0">
            Atención médica integral en Rancagua. Consulta general, vacunación, cirugías y ficha clínica digital.
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <Row className="g-3 mb-4">
        <Col xs={12} md={4}>
          <Card className="border-0 shadow-sm bg-white text-center p-2">
            <Card.Body>
              <h2 className="display-6 fw-bold text-primary mb-0">{pacientes.length}</h2>
              <span className="text-muted small">Pacientes Registrados</span>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="border-0 shadow-sm bg-white text-center p-2">
            <Card.Body>
              <h2 className="display-6 fw-bold text-warning mb-0">{vacunasPendientes}</h2>
              <span className="text-muted small">Vacunaciones Pendientes</span>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="border-0 shadow-sm bg-white text-center p-2">
            <Card.Body>
              <h2 className="display-6 fw-bold text-success mb-0">{citas.length}</h2>
              <span className="text-muted small">Citas Agendadas</span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Buscador y Filtro */}
      <Card className="p-3 mb-4 shadow-sm border-0">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={7}>
            <InputGroup>
              <InputGroup.Text bg="light">🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de mascota o dueño..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={5}>
            <Form.Select
              value={especieFiltro}
              onChange={(e) => setEspecieFiltro(e.target.value)}
            >
              <option value="Todas">Todas las Especies</option>
              <option value="Perro">Perros</option>
              <option value="Gato">Gatos</option>
              <option value="Conejo">Conejo</option>
              <option value="Ave">Aves</option>
            </Form.Select>
          </Col>
        </Row>
      </Card>

      {/* Grilla de Pacientes */}
      <h2 className="h5 mb-3 text-secondary">Listado de Pacientes ({pacientesFiltrados.length})</h2>
      {pacientesFiltrados.length === 0 ? (
        <div className="alert alert-info text-center my-4 py-4">
          No se encontraron pacientes con los criterios ingresados.
        </div>
      ) : (
        <Row className="g-4 mb-5">
          {pacientesFiltrados.map((p) => (
            <Col key={p.id} xs={12} md={6} lg={4}>
              <TarjetaPaciente paciente={p} onVerFicha={(id) => navigate(`/ficha/${id}`)} />
            </Col>
          ))}
        </Row>
      )}

      {/* Mapa */}
      <Card className="shadow-sm border-0 mt-5 p-4">
        <Row className="align-items-center">
          <Col md={6}>
            <h3 className="h5 text-primary mb-2">📍 Ubicación de la Clínica</h3>
            <p className="text-muted mb-1"><strong>Dirección:</strong> Av. San Marcos 1234, Rancagua</p>
            <p className="text-muted mb-1"><strong>Horario:</strong> Lunes a Viernes 09:00 - 19:00 hrs</p>
            <p className="text-muted mb-0"><strong>Urgencias:</strong> +56 9 1234 5678</p>
          </Col>
          <Col md={6} className="mt-3 mt-md-0">
            <div className="bg-secondary text-white rounded p-4 text-center">
              Mapa Interactivo (Rancagua)
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default Inicio;