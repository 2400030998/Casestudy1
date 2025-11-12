import { Grid } from "@mui/material";
import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({ appointments, onCancel, onUpdate }) {
  return (
    <Grid container spacing={2}>
      {appointments.map((a) => (
        <Grid item xs={12} sm={6} md={4} key={a.id}>
          <AppointmentCard appointment={a} onCancel={onCancel} onUpdate={onUpdate} />
        </Grid>
      ))}
    </Grid>
  );
}

