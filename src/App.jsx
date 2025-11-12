import { useState } from "react";
import { Container, Divider, Typography, Snackbar } from "@mui/material";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, { id: Date.now(), ...newAppointment }]);
    setSnackOpen(true);
  };

  const handleCancel = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdate = (updated) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Appointment Booking
      </Typography>
      <AppointmentForm onSubmit={handleAddAppointment} />
      <Divider sx={{ my: 4 }} />
      <AppointmentList
        appointments={appointments}
        onCancel={handleCancel}
        onUpdate={handleUpdate}
      />
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="Appointment booked"
      />
    </Container>
  );
}
