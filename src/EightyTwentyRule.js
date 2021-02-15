import React from 'react'
import PropTypes from 'prop-types'

class EightyTwentyRule extends React.Component {
  constructor (props) {
    super(props)
    this.state = { salary: '', rent: '', maxExpenseValue: '', eightyTwentyRule: '' }

    this.handleSalary = this.handleSalary.bind(this)
    this.handleRent = this.handleRent.bind(this)
    this.handleMaxExpenseValue = this.handleMaxExpenseValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSalary (event) {
    this.setState({ salary: event.target.value })
  }

  handleRent (event) {
    this.setState({ rent: event.target.value })
  }

  handleMaxExpenseValue (event) {
    this.setState({ maxExpenseValue: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    const { salary, rent, maxExpenseValue } = this.state
    if (/\D/.test(salary) || /\D/.test(rent) || /\D/.test(maxExpenseValue)) {
      window.alert('Please enter only numbers into the input fields')
    } else {
      const livingExpensesWithRent = this.livingExpenses(parseInt(maxExpenseValue)) + parseInt(rent)
      const eightyTwentyRule = Math.floor(100 - ((livingExpensesWithRent / parseInt(salary)) * 100))
      this.setState({ eightyTwentyRule: `${eightyTwentyRule}%` })
    }
  }

  livingExpenses (maxExpenseValue) {
    const sortedTransactionAmounts = this.props.sortedTransactions.map(transaction => transaction.Amount)
    const indexTransactionBelowHundred = sortedTransactionAmounts.findIndex(amount => amount > -maxExpenseValue)
    const firstPositiveTransaction = sortedTransactionAmounts.findIndex(amount => amount > 0)
    const livingExpenses = sortedTransactionAmounts.slice(indexTransactionBelowHundred, firstPositiveTransaction)
    return -livingExpenses.reduce((accumulator, currentValue) => accumulator + currentValue)
  }

  render () {
    return (
      <div>
      <h2>80/20 Rule</h2>
      Fill in the below to find out if you have achieved the 80/20 budget rule:<br></br>
    <form onSubmit={this.handleSubmit}>
        <label>
          Monthly take home Salary (£):
          <input type="text" value={this.state.salary} onChange={this.handleSalary} /><br></br>
        </label>
        <label>
          Monthly Rent (£):
          <input type="text" value={this.state.rent} onChange={this.handleRent} /><br></br>
        </label>
        <label>
          Maximum cost of living expenses:
          <input type="text" value={this.state.maxExpenseValue} onChange={this.handleMaxExpenseValue} />
        </label>
        <input type="submit" value="Submit" />
      </form><br></br>
      The calculator looks at transactions between a certain range.
      This is to avoid lump sum investments that are not part of daily expenses.
      A good starting point for maximum cost of living expenses is 100.
      <h3>Savings against salary: {this.state.eightyTwentyRule}</h3>
      </div>
    )
  }
}

EightyTwentyRule.propTypes = {
  sortedTransactions: PropTypes.array
}

export default EightyTwentyRule
