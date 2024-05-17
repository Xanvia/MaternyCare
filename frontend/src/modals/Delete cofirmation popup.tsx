import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertDialogModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
        sx={{
            borderColor: '#F580AB',
            color: '#F580AB',
            '&:hover': {
              borderColor: '#F9B8D0',
              color: '#F9B8D0',
            },
          }}
      >
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
        <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: '#666666',
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color:'#333333' }}>
            <WarningRoundedIcon />
            Are you sure?
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: '#666666' }}>
            Are you sure you want to delete this item? This action cannot be undone
          </DialogContent>
          <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: '#666666' }}>            
          <Button variant="outlined"
  sx={{
    borderColor: '#F580AB',
    color: '#000000',
    '&:hover': {
      borderColor: '#F9B8D0',
    },
    padding: { xs: '8px 16px', md: '12px 70px' }, // Adjust padding for different screen sizes
    fontSize: '1rem',
  }} onClick={() => setOpen(false)}>
  Cancel
</Button>
<Button variant="solid"
  sx={{
    backgroundColor: '#F580AB',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#F9B8D0',
    },
    padding: { xs: '8px 16px', md: '12px 70px' }, // Adjust padding for different screen sizes
    fontSize: '1rem',
  }} onClick={() => setOpen(false)}>
  Delete
</Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}