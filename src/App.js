import { ExpenseProvider } from "./context/ExpenseContent"
import ExpenseTracker from "./Pages/ExpenseTracker"

const App = () => {
  return (
    <div>
      <ExpenseProvider>
        <ExpenseTracker />
      </ExpenseProvider>
    </div>
  )
}

export default App
