import React from 'react'
import PropTypes from 'prop-types'

class EightyTwentyRule extends React.Component {
  constructor (props) {
    super(props)
    this.state = { company: '', eightyTwentyRule: '' }

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
    this.setState({ company: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    const company = this.state.company
    const regEx = new RegExp(company, 'i')
    const salary = this.props.sortedTransactions.find(transaction => (regEx).test(transaction.Description))
    const salaryAmount = salary.Amount
    const livingExpenses = this.debitCardSpendNoBills() + this.rent()
    const eightyTwentyRule = Math.floor(100 - ((livingExpenses / salaryAmount) * 100))
    this.setState({ eightyTwentyRule: `${eightyTwentyRule}%` })
  }

  render () {
    return (
      <div>
      <h2>80/20 Rule</h2>
      Enter the company you work for to find out your savings against take-home salary
      <form onSubmit={this.handleSubmit}>
        <label>
          Company:
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
