import { BudgetContext } from '../context/budgetContext'
import { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button, TextField, InputAdornment, IconButton, Dialog, DialogContent } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShareIcon from '@mui/icons-material/Share';
import ShareMyBudget from './ShareMyBudget'




const BudgetList = () => {
  const { budgets, urlShare,setUrlShare,openShare,setOpenShare } = useContext(BudgetContext)
  const [sortedBudgets, setSortedBudgets] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredBudgets, setFilteredBudgets] = useState([])

  useEffect(() => {
    setSortedBudgets(budgets)
  }, [budgets])

  const OrderByName = () => {
    const sortedbyname = [...budgets].sort((a, b) => a.name.localeCompare(b.name))
    setSortedBudgets(sortedbyname)

  }

  const OrderByDate = () => {
    const sortedbydate = [...budgets].sort((a, b) => a.date.localeCompare(b.date))
    setSortedBudgets(sortedbydate)
  }

  const HandleReset = () => {
    setSortedBudgets(budgets)
  }

  const handleFilterByName = () => {
    console.log(searchValue)
    const filtrado = sortedBudgets.filter((budget) => budget.name.toLowerCase().includes(searchValue.toLowerCase()))
    console.log(filtrado)
    setFilteredBudgets(filtrado)
    setSortedBudgets(filtrado)
  }


  // compartir presupuesto 

  const OnShareMyBudget = (budget) => {
    console.log('Compartir presupuesto')
    const budgetData = JSON.stringify(budget)
    console.log(budgetData)
    const encodedData = encodeURIComponent(budgetData)
    console.log(encodedData)
    const url = `${window.location.origin}/presupuesto?data=${encodedData}`
    console.log(url)
    setUrlShare(url)
  }
  const ShareDialogOpen = (budget) => {
    setOpenShare(true)
    OnShareMyBudget(budget)
  }




  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box>
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            label="Cerca per nom"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleFilterByName} // Función que filtra por nombre
                      edge="end"
                      aria-label="buscar"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }} />
        </Box>
        <Box>
          <Button onClick={() => OrderByName()}>
            Ordena per nom
          </Button>
          <Button onClick={() => OrderByDate()}>
            Ordena per data
          </Button>
          <Button onClick={() => HandleReset()}>
            Reset
          </Button>
        </Box>

      </Box>
      {sortedBudgets.map((budget, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', boxShadow: 2, p: 4 }}>
          <Box flex={1}>
            <Typography fontWeight={'bold'}> {budget.name}</Typography>
            <Typography>{budget.tel}</Typography>
            <Typography>{budget.email} </Typography>
          </Box>


          {budget.selectedItems.map((item) => (
            <Box key={item.id} sx={{ marginLeft: 2, flex: 1 }}>
              <Typography>- {item.name}</Typography>
              <Typography>Páginas: {item.pages}</Typography>
              <Typography>Lenguajes: {item.languages}</Typography>
            </Box>
          ))}

          <Box flex={1}>
            <Typography fontWeight={'bold'}>{budget.sum} euros </Typography>
          </Box>
          <IconButton disableRipple
            onClick={() => ShareDialogOpen(budget)} color={'primary'}  >
            <ShareIcon fontSize={'small'} />
          </IconButton>


          <ShareMyBudget openShare={openShare} setOpenShare={setOpenShare} setUrlShare={setUrlShare} urlShare={urlShare} />


        </Box>
      ))}

    </>
  )
}

export default BudgetList 