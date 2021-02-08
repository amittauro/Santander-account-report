import PropTypes from 'prop-types'
import React from 'react'
import './Table.css'

function TopTenExpenses (props) {
  const expenses = props.expenses
  const listExpenses = expenses.map((expense, index) => {
    return (
    <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{expense.Description}</td>
        <td>{-expense.Amount}</td>
    </tr>
    )
  })

  return (
  <div>
    <table className="TopTenExpenses">
      <thead>
          <tr>
              <th>Position</th>
              <th>Description</th>
              <th>Amount (£)</th>
          </tr>
      </thead>
      <tbody>
          {listExpenses}
      </tbody>
    </table>
  </div>
  )
}

TopTenExpenses.propTypes = {
  expenses: PropTypes.array
}

export default TopTenExpenses
