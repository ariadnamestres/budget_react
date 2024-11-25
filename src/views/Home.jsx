
import { Link} from 'react-router-dom'
import { Typography, Container } from '@mui/material'

const Home = () => {
  return(
    <Container>
      <Typography variant= 'h5'> Welcome Home </Typography>
      <Typography variant= 'caption'> Click the link below to go to the Budget page</Typography>
      <br></br>
      <Link to='/budget'>Go to Budget</Link>

    </Container>
  )
}

export default Home 