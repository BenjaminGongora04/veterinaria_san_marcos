import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navegacion({ usuario, onCerrarSesion }) {
  return (
    <Navbar expand="md" bg="primary" variant="dark" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          🐾 Veterinaria San Marcos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            
            {usuario?.rol === "CLIENTE" && (
              <Nav.Link as={NavLink} to="/mis-citas">Mis Citas</Nav.Link>
            )}
            {(usuario?.rol === "RECEPCIONISTA" || usuario?.rol === "ADMIN") && (
              <Nav.Link as={NavLink} to="/admin/citas">Gestión Citas</Nav.Link>
            )}

            {usuario ? (
              <button className="btn btn-outline-light btn-sm ms-md-2" onClick={onCerrarSesion}>
                Salir ({usuario.nombre})
              </button>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="btn btn-light text-primary btn-sm ms-md-2 text-dark">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;