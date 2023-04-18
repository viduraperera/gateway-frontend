import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from "@material-ui/icons/Close"

function DialogModal({ open, onClose, children, title }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <IconButton
        sx={{
          position: 'absolute',
          marginLeft: 10,
          top: 10,
          right: 10,
          color: 'white',
          width: '1.5rem',
          height: '1.5rem'
        }}
        onClick={onClose}
        variant="text"
      >
        <CloseIcon sx={{ color: 'black' }} />
      </IconButton>
      <Box sx={{ height: '90vh' }}>
        <Typography
          variant="h5"
          sx={{ color: 'rgba(0,0,0,60%)', m: '16px 16px 0px 30px', fontWeight: 900 }}
        >
          {title}
        </Typography>

        {children}
      </Box>
    </Dialog>
  );
}

export default DialogModal;
