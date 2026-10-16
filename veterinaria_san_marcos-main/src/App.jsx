import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navegacion from "./components/Navegacion";
import Inicio from "./pages/Inicio";
import DetalleFicha from "./pages/DetalleFicha";
import NoEncontrada from "./pages/NoEncontrada";
import FormularioCita from "./pages/admin/FormularioCita";
import { pacientesIniciales } from "./data/pacientesIniciales";
import { obtenerDatosGuardados, guardarEnStorage } from "./utils/persistencia";

function App() {
  const [pacientes] = useState(pacientesIniciales);
  const [citas, setCitas] = useState(() => obtenerDatosGuardados("citas_vetsm", []));
  const [usuario, setUsuario] = useState({
  nombre: "María Recepción",
  rol: "RECEPCIONISTA"
});
  useEffect(() => {
    guardarEnStorage("citas_vetsm", citas);
  }, [citas]);

  function agregarCita(nuevaCita) {
    setCitas([...citas, nuevaCita]);
  }
  function cerrarSesion() {
    setUsuario(null);
}

  return (
    <div className="bg-light min-vh-100">
      <Navegacion
        usuario={usuario}
        onCerrarSesion={cerrarSesion}
      />
      <Container className="pb-5">
        <Routes>
          {/* Ruta Principal */}
          <Route path="/" element={<Inicio pacientes={pacientes} citas={citas} />} />
          
          {/* Ruta Dinámica con Parámetro ID (Guía 11) */}
          <Route path="/ficha/:id" element={<DetalleFicha pacientes={pacientes} />} />

          {/* Ruta Administrativa */}
          <Route path="/admin/citas" element={
            <Row className="g-4">
              <Col md={6}>
                <FormularioCita onGuardarCita={agregarCita} />
              </Col>
              <Col md={6}>
                <h3 className="h5 mb-3">Citas Agendadas ({citas.length})</h3>
                {citas.length === 0 ? (
                  <p className="text-muted">No hay citas agendadas aún.</p>
                ) : (
                  <ul className="list-group shadow-sm">
                    {citas.map((c) => (
                      <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{c.nombreMascota}</strong> ({c.dueno})
                        </div>
                        <span className="badge bg-primary rounded-pill">{c.fecha} {c.hora}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
            </Row>
          } />

          {/* Ruta 404 */}
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;