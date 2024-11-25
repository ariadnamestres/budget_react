
import { Box, Button, IconButton, Checkbox, Typography, FormControlLabel, Container, TextField, Switch } from '@mui/material'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BudgetContext } from '../context/budgetContext'
import BudgetList from '../components/BudgetList'
import InfoIcon from '@mui/icons-material/Info'
import Helper from '../components/Helper'
import Helper2 from '../components/Helper2'

const Budget = () => {
  const navigate = useNavigate()
  const {
     budgets,
      setBudgets, 
      checkedItems,
      setCheckedItems,
      pagesPerItem,
      setPagesPerItem,
      langsPerItem,
      setLangsPerItem,
    } = useContext(BudgetContext)


  //user States
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')


  // mui components state
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  //switch state ( preu anual- preu mensual)
  const [checked, setChecked] = useState(false)


  const handleChange = (event, id) => {
    setCheckedItems(
      {
        ...checkedItems,
        [id]: event.target.checked
      }
    )

  }

  const AddingPages = (id) => {
    setPagesPerItem(
      {
        ...pagesPerItem,
        [id]: (pagesPerItem[id] || 0) + 1
      }
    )

  }

  const RemovingPages = (id) => {
    setPagesPerItem((prevPages) => {
      return {
        ...prevPages,
        [id]: prevPages[id] > 0 ? prevPages[id] - 1 : 0
      }
    })
  }

  const AddingLangs = (id) => {
    setLangsPerItem((prevLangs) => {
      return {
        ...prevLangs,
        [id]: (prevLangs[id] || 0) + 1
      }
    })
  }

  const RemovingLangs = (id) => {
    setLangsPerItem((prevLangs) => {
      return {
        ...prevLangs,
        [id]: prevLangs[id] > 0 ? prevLangs[id] - 1 : 0
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const selectedItems =
      items
        .filter((item) => checkedItems[item.id])
        .map((item) => {
          return (
            {
              id: item.id,
              name: item.name,
              pages: pagesPerItem[item.id] || 0,
              languages: langsPerItem[item.id] || 0,

            })
        })

    const newBudget =
    {
      name,
      tel,
      email,
      sum,
      data: new Date(),
      selectedItems
    }
    console.log(newBudget)
    setBudgets([...budgets, newBudget])
  }

  const items =
    [{
      id: 1,
      name: 'Seo',
      description: 'Programacio de web responsive',
      price: 300,
    },
    {
      id: 2,
      name: 'Ads',
      description: 'Programacio de web responsive',
      price: 400,
    },
    {

      id: 3,
      name: 'Web',
      description: 'Programacio de web responsive',
      price: 500,
    }
    ]

  const sum = items
    .filter((item) => checkedItems[item.id]) // Filtrar els items que estan checked, osea que son true
    .reduce((acc, item) => {
      const pages = pagesPerItem[item.id] || 0
      const langs = langsPerItem[item.id] || 0
      const extracost = (pages + langs) * 30
      return acc + item.price + extracost
    }, 0)



  //modal help
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickOpen2 = () => {
    setOpen2(true)
  }

  //switch

  const handleChangeToAnual = () => {
    setChecked(!checked)

  }



  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='outlined' onClick={() => navigate('/')} sx={{ mb: 2 }}>Home</Button>
        </Box>
        <Box>
          <Typography variant='motion'>Preu mensual</Typography>
          <Switch
            checked={checked}
            onChange={handleChangeToAnual}
          />
          <Typography variant='motion'>Preu anual</Typography>
        </Box>
      </Box>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5, height: '150px', boxShadow: 2, marginBottom: 5, padding: 4 }} >

          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={'bold'}>{item.name}</Typography>
            <Typography>{item.description}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {checked && <Typography fontWeight={'bold'} color={'#4caf50'}>20% descompte</Typography>}

            {checked ? <Typography>{item.price * (0.8)}</Typography> : <Typography>{item.price}</Typography>}
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControlLabel control={
              <Checkbox
                checked={checkedItems[item.id] || false}
                onChange={(event) => handleChange(event, item.id)} />
            } label="Afegir" />
            {checkedItems[item.id] &&

              <Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant='caption'> Núm Pàgines</Typography>
                  <Button variant='text' onClick={() => RemovingPages(item.id)}>-</Button>
                  <Typography>{pagesPerItem[item.id] || 0}</Typography>
                  <Button variant='text' onClick={() => AddingPages(item.id)}>+</Button>
                  <IconButton onClick={() => handleClickOpen2()} color={'primary'}> <InfoIcon fontSize={'small'} /></IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant='caption' >LLlenguatges</Typography>
                  <Button variant='text' onClick={() => RemovingLangs(item.id)}>-</Button>
                  <Typography>{langsPerItem[item.id]}</Typography>
                  <Button onClick={() => AddingLangs(item.id)} variant='text'>+</Button>
                  <IconButton onClick={() => handleClickOpen()} color={'primary'} disableRipple
                    disableTouchRipple
                    disableFocusRipple
                    sx={{
                      '&:hover': { backgroundColor: 'transparent' },
                      '& .MuiSvgIcon-root': { fontSize: 20 }, // Tamaño más pequeño
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    }}> <InfoIcon fontSize={'small'} /></IconButton>
                </Box>


              </Box>
            }
          </Box>
          {open &&
            <Helper open={open} setOpen={setOpen} />

          }
          {open2 &&
            <Helper2 open2={open2} setOpen2={setOpen2} />

          }



        </Box>


      ))}


      <Box component='form' onSubmit={handleSubmit}  >
        <Box sx={{ mb: 5 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Preu pressupostat: {sum} euros </Typography>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }}>Demanar pressupost </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline', gap: 2, p: 2, m: 5, boxShadow: 3 }}>
          <TextField
            label='Nom'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label='Telèfon'
            required
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <TextField
            label='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant='contained'
            color='secondary'
            type='submit'
          >
            Sol·licitar</Button>
        </Box>
      </Box>

      {budgets &&
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant='h5'>Pressupostos en curs </Typography>
          <BudgetList />
        </Box>
      }


    </Container>
  )
}

export default Budget

