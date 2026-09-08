import { useState, useEffect } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/expenses')
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error('Error fetching expenses:', err))
  }, [])

  return (
    <div>
      <h1>Expense Tracker</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category_id}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App