import React from 'react'
import PropTypes from 'prop-types'

class EightyTwentyRule extends React.Component {
  constructor (props) {
    super(props)
    this.state = { salary: '', eightyTwentyRule: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  rent () {
    const rent = this.props.sortedTransactions.find(transaction => /rent/i.test(transaction.Description))
    return -rent.Amount
  }

  debitCardSpendNoBills () {
    const debitCardSpend = []
    this.props.sortedTransactions.forEach((transaction) => {
      if (/CARD PAYMENT TO/i.test(transaction.Description) && /E.ON/.test(transaction.Description) === false) {
        debitCardSpend.push(transaction)
      }
    })
    const debitCardAmount = debitCardSpend.map(transaction => transaction.Amount)
    return -debitCardAmount.reduce((accumulator, currentValue) => accumulator + currentValue)
  }

  handleChange (event) {
    this.setState({ salary: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    const salary = this.state.salary
    if (/\D/.test(salary)) {
      window.alert('Please enter only numbers for your salary')
    } else {
      const livingExpenses = this.debitCardSpendNoBills() + this.rent()
      const eightyTwentyRule = Math.floor(100 - ((livingExpenses / parseInt(salary)) * 100))
      this.setState({ eightyTwentyRule: `${eightyTwentyRule}%` })
    }
  }

  render () {
    return (
      <div>
      <h2>80/20 Rule</h2>
      Enter the company you work for to find out your savings against take-home salary
      <form onSubmit={this.handleSubmit}>
        <label>
          Take-home Salary (£):
          <input type="text" value={this.state.company} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h4>Savings against salary: {this.state.eightyTwentyRule}</h4>
      This calculator only looks at debit card transactions and does not take into account standing orders or direct debits or bills to E.ON
      </div>
    )
  }
}

EightyTwentyRule.propTypes = {
  sortedTransactions: PropTypes.array
}

export default EightyTwentyRule
