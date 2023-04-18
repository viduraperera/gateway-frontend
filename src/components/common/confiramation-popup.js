import { Box, Button, Grid, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

export default function ConfirmationPopup({ open, onClose, title, onProceed }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: 500,
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              disableRipple
              sx={{
                color: 'error.main',
                '& .MuiSvgIcon-root': {
                  fontSize: '5rem',
                  color: 'red'
                }
              }}
            >
              <ErrorOutlineOutlinedIcon sx={{ color: 'red' }} fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="subtitle1"
            sx={{ color: 'rgba(0,0,0,60%)', m: '16px 16px 0px 30px', fontWeight: 900 }}
          >
            Are you sure you want to delete ?
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="subtitle1"
            sx={{ color: 'rgba(0,0,0,60%)', m: '16px 16px 0px 30px', fontWeight: 900 }}
          >
            This process cannot be changed
          </Typography>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, p: 3 }}>
          <Button sx={{ width: '150px' }} onClick={onProceed}>
            YES
          </Button>
          <Button sx={{ width: '150px' }} onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
