
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material'

const Helper = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Llenguatge ajuda </DialogTitle>
      <DialogContent>
        <DialogContentText>  Afegeix els llenguatges que tindrà el teu projecte, si no ho saps no et preocupis, ho valorarem conjuntament </DialogContentText>
      </DialogContent>

    </Dialog>
  )
}

export default Helper