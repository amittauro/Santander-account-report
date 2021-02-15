import PropTypes from 'prop-types'
import React from 'react'
import './css/Table.css'

function TopTenExpenses (props) {
  const topTenExpenses = props.sortedTransactions.slice(0, 10)
  const listExpenses = topTenExpenses.map((expense, index) => {
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
    <h1>Your Top Ten Expenses</h1>
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
  sortedTransactions: PropTypes.array
}

export default TopTenExpenses
