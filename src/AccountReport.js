import TopTenExpenses from './TopTenExpenses'
import MonthlyExpenses from './MonthlyExpenses'
import React from 'react'
import PropTypes from 'prop-types'

class AccountReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = { transactions: this.props.transactions }
  }

  render () {
    return (
      <div>
        <TopTenExpenses expenses={this.showTopTenExpenses()} />
        <MonthlyExpenses expenses={this.sortedTransactions()} />
      </div>
    )
  }

  showTopTenExpenses () {
    return this.sortedTransactions().slice(0, 10)
  }

  withdrawals () {
    const expenses = this.sortedTransactions().map(transaction => transaction.Amount)
    const n = expenses.length
    let index
    for (let i = 0; i < n; i++) {
      if (expenses[i] > 0) {
        index = i
        break
      }
    }
    return expenses.slice(0, index)
  }

  sortedTransactions () {
    return this.state.transactions.sort(function (a, b) {
      return a.Amount - b.Amount
    })
  }
}

AccountReport.propTypes = {
  transactions: PropTypes.array
}

export default AccountReport
