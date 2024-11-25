
import { useState, useContext } from 'react'
import { BudgetContext } from '../context/budgetContext'
import { Alert, Dialog, DialogContent, DialogActions, IconButton, TextField } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'

const ShareMyBudget = () => {
  const { urlShare,openShare,setOpenShare } = useContext(BudgetContext)
  const [succesAlert, setSuccesAlert] = useState(false)
  const handleClose = () => {
    setOpenShare(false)
   
  }

  const CopyBudgetLink = () => {
    navigator.clipboard.writeText(urlShare)
    setSuccesAlert(true)
    setTimeout(() => {
      setSuccesAlert(false)
    }, 2000)
  

  }


  return (
    <>
      <Dialog
        open={openShare}
        onClose={handleClose}
      // maxWidth="md"

      >
        <DialogContent>
          {succesAlert &&
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
             Link copiat amb èxit
            </Alert>
          }
          <TextField
            value={urlShare}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            maxWidth="md"
          > </TextField>

          <DialogActions>
            <IconButton onClick={CopyBudgetLink}>
              <ContentCopyIcon ></ContentCopyIcon>
            </IconButton>


          </DialogActions>




        </DialogContent>
      </Dialog>


    </>

  )


}
export default ShareMyBudget