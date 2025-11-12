import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  onClose,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="error"
          variant="contained"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

