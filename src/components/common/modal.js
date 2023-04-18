import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

export default function ModalPopup({ open, onClose, title, children, maxWidth }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: maxWidth || 600,
          backgroundColor: '#fff',
          color: 'white',
          outline: 'none',
          height: 'auto'
        }}
      >
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
        <Grid>
          <Typography
            variant="h5"
            sx={{ color: 'rgba(0,0,0,60%)', m: '16px 16px 0px 30px', fontWeight: 900 }}
          >
            {title}
          </Typography>
          {children}
        </Grid>
      </Box>
    </Modal>
  );
}
