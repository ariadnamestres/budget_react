import {Routes, Route} from 'react-router-dom';
import { BudgetProvider } from './context/budgetProvider';
import './App.css'
import Home from './views/Home'
import Budget from './views/Budget'


function App() {


  return (
    <>
    <BudgetProvider>
     <Routes>
      <Route path="/" element = {<Home/>} />
      
      <Route path= "budget" element= {<Budget/>}/>
     
     </Routes>
     </BudgetProvider>
  
    </>
  )
}

export default App
