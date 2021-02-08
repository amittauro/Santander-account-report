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
