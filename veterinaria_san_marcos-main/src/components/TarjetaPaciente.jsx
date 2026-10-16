import { Card, Button, Badge } from "react-bootstrap";

function TarjetaPaciente({ paciente, onVerFicha }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="h5 mb-0">{paciente.nombre}</Card.Title>
          <Badge bg={paciente.vacunasAlDia ? "success" : "warning"}>
            {paciente.vacunasAlDia ? "Vacunas al día" : "Vacunación Pendiente"}
          </Badge>
        </div>
        <Card.Text className="text-muted small mb-2">
          Especie: {paciente.especie} | Raza: {paciente.raza}
        </Card.Text>
        <Card.Text>
          <strong>Dueño/a:</strong> {paciente.dueno}
        </Card.Text>
        <Button 
          variant="outline-primary" 
          className="mt-auto w-100"
          onClick={() => onVerFicha(paciente.id)}
        >
          Ver Ficha Médica
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaPaciente;