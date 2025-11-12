import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Grid,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

const doctors = [
  { name: "Dr. Rao", dept: "Cardiology" },
  { name: "Dr. Meera", dept: "Dermatology" },
  { name: "Dr. Arjun", dept: "Pediatrics" },
];

export default function EditDialog({ open, onClose, appointment, onSave }) {
  const [form, setForm] = useState(appointment || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(appointment || {});
  }, [appointment]);

  const validate = () => {
    const e = {};
    if (!form.patientName) e.patientName = "Required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter 10-digit phone";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.doctor) e.doctor = "Select doctor";
    if (!form.department) e.department = "Required";
    if (!form.date || dayjs(form.date).isBefore(dayjs(), "day"))
      e.date = "Select future date";
    if (!form.time) e.time = "Select time";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({ ...form });
      onClose();
    }
  };

  if (!form) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Appointment</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Patient Name"
              fullWidth
              value={form.patientName || ""}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              error={!!errors.patientName}
              helperText={errors.patientName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              fullWidth
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Doctor"
              fullWidth
              value={form.doctor || ""}
              onChange={(e) => {
                const doc = doctors.find((d) => d.name === e.target.value);
                setForm({ ...form, doctor: e.target.value, department: doc?.dept });
              }}
              error={!!errors.doctor}
              helperText={errors.doctor}
            >
              {doctors.map((d) => (
                <MenuItem key={d.name} value={d.name}>
                  {d.name} – {d.dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              fullWidth
              value={form.department || ""}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              error={!!errors.department}
              helperText={errors.department}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <DatePicker
              label="Appointment Date"
              value={form.date ? dayjs(form.date) : null}
              onChange={(val) => setForm({ ...form, date: val })}
              slotProps={{
                textField: { fullWidth: true, error: !!errors.date, helperText: errors.date },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TimePicker
              label="Appointment Time"
              value={form.time ? dayjs(form.time) : null}
              onChange={(val) => setForm({ ...form, time: val })}
              slotProps={{
                textField: { fullWidth: true, error: !!errors.time, helperText: errors.time },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel>Visit Type</FormLabel>
            <RadioGroup
              row
              value={form.visitType || "New"}
              onChange={(e) => setForm({ ...form, visitType: e.target.value })}
            >
              <FormControlLabel value="New" control={<Radio />} label="New" />
              <FormControlLabel value="Follow-up" control={<Radio />} label="Follow-up" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Symptoms / Notes"
              fullWidth
              multiline
              rows={2}
              value={form.notes || ""}
              inputProps={{ maxLength: 200 }}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
