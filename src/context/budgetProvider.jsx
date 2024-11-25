import { BudgetContext } from './budgetContext';
import { useState } from 'react';
export const BudgetProvider= ({children}) => {
  const [budgets,setBudgets]=useState([])
  const [checkedItems, setCheckedItems] = useState({})
  const [pagesPerItem, setPagesPerItem] = useState({})
  const [langsPerItem, setLangsPerItem] = useState({})
  const [urlShare, setUrlShare] = useState('')
  const [openShare, setOpenShare] = useState(false)

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
  return(
    <BudgetContext.Provider value={{
      budgets,
      setBudgets,
      checkedItems,
      setCheckedItems,
      pagesPerItem,
      setPagesPerItem,
      langsPerItem,
      setLangsPerItem,
      urlShare,
      setUrlShare, 
      openShare,
      setOpenShare,
      OnShareMyBudget
      }}>
      {children}
    </BudgetContext.Provider>
  )
}