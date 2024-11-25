
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material'

const Helper2 = ({ open2, setOpen2 }) => {

  const handleClose = () => {
    setOpen2(false)
  }

  return (
    <Dialog
      open={open2}
      onClose={handleClose}
     
    >
      <DialogTitle>Pàgines ajuda </DialogTitle>
      <DialogContent>
        <DialogContentText> Fer una aproximació de les pàgines que tindrà la web</DialogContentText>
      </DialogContent>

    </Dialog>
  )
}

export default Helper2