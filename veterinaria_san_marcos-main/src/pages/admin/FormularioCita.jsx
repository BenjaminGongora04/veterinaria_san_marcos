import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const inicial = { nombreMascota: "", dueno: "", fecha: "", hora: "" };

function FormularioCita({ onGuardarCita }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});

  function cambiar(e) {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(e) {
    e.preventDefault();
    const err = {};
    if (!datos.nombreMascota.trim()) err.nombreMascota = "El nombre de la mascota es obligatorio";
    if (!datos.dueno.trim()) err.dueno = "El nombre del dueño es obligatorio";

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    onGuardarCita({ ...datos, id: Date.now() });
    setDatos(inicial);
  }

  return (
    <Form onSubmit={enviar} noValidate className="p-4 border rounded bg-white shadow-sm">
      <h3 className="h5 mb-3 text-primary">Solicitar Cita Médica</h3>
      
      <Form.Group className="mb-3" controlId="nombreMascota">
        <Form.Label>Nombre de la Mascota</Form.Label>
        <Form.Control
          name="nombreMascota"
          value={datos.nombreMascota}
          onChange={cambiar}
          isInvalid={Boolean(errores.nombreMascota)}
        />
        <Form.Control.Feedback type="invalid">{errores.nombreMascota}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueno">
        <Form.Label>Nombre del Dueño/a</Form.Label>
        <Form.Control
          name="dueno"
          value={datos.dueno}
          onChange={cambiar}
          isInvalid={Boolean(errores.dueno)}
        />
        <Form.Control.Feedback type="invalid">{errores.dueno}</Form.Control.Feedback>
      </Form.Group>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={datos.fecha}
              onChange={cambiar}
            />
          </Form.Group>
        </div>
        <div className="col-md-6 mb-3">
          <Form.Group controlId="hora">
            <Form.Label>Hora</Form.Label>
            <Form.Control
              type="time"
              name="hora"
              value={datos.hora}
              onChange={cambiar}
            />
          </Form.Group>
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-100">
        Agendar Cita
      </Button>
    </Form>
  );
}

export default FormularioCita;