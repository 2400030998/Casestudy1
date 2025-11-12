import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { Edit, Cancel } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import EditDialog from "./EditDialog";

export default function AppointmentCard({ appointment, onCancel, onUpdate }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader title={appointment.doctor} subheader={appointment.department} />
        <CardContent>
          <Typography variant="subtitle1">
            {dayjs(appointment.date).format("DD MMM YYYY")} at{" "}
            {dayjs(appointment.time).format("HH:mm")}
          </Typography>
          <Typography variant="body2">
            {appointment.patientName} ({appointment.phone})
          </Typography>
          <Chip
            label={appointment.visitType}
            color={appointment.visitType === "New" ? "primary" : "secondary"}
            size="small"
            sx={{ mt: 1, mr: 1 }}
          />
          <Chip label="Booked" color="success" size="small" sx={{ mt: 1 }} />
        </CardContent>
        <CardActions>
          <IconButton color="primary" onClick={() => setEditOpen(true)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => setConfirmOpen(true)}>
            <Cancel />
          </IconButton>
        </CardActions>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => onCancel(appointment.id)}
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment?"
      />

      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        appointment={appointment}
        onSave={onUpdate}
      />
    </>
  );
}

