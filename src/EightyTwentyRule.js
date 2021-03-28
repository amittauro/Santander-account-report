import React from 'react'
import PropTypes from 'prop-types'
import './css/EightyTwentyRule.css'

class EightyTwentyRule extends React.Component {
  constructor (props) {
    super(props)
    this.state = { company: '', eightyTwentyRule: '', livingExpenses: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  rent () {
    const rent = this.props.transactions.find(transaction => /rent/i.test(transaction.Description))
    return -rent.Amount
  }

  debitCardSpendNoBills () {
    const debitCardSpend = []
    this.props.transactions.forEach((transaction) => {
      if (/CARD PAYMENT TO/i.test(transaction.Description) && /E.ON/.test(transaction.Description) === false) {
        debitCardSpend.push(transaction)
      } else if (/EE LIMITED/.test(transaction.Description)) {
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
    const salary = this.props.transactions.find(transaction => (regEx).test(transaction.Description))
    if (salary === undefined || salary.Amount < 0) {
      window.alert('company doesnt exist as an employer please try again')
    } else {
      const salaryAmount = salary.Amount
      const livingExpenses = this.debitCardSpendNoBills() + this.rent()
      this.setState({ livingExpenses: `£${Math.round(livingExpenses)}` })
      const eightyTwentyRule = Math.floor(100 - ((livingExpenses / salaryAmount) * 100))
      this.setState({ eightyTwentyRule: `${eightyTwentyRule}%` })
    }
  }

  render () {
    return (
      <div>
      <h2>80/20 Rule</h2>
      Enter the company you work for below and find out how much of your take-home salary you saved this month.
      <form onSubmit={this.handleSubmit}>
        <div className='form-row'>
        <label className='company'>
          Company:
          <input type="text" value={this.state.company} onChange={this.handleChange} />
        </label>
        </div>
        <div className='form-row'>
        <input type="submit" value="Submit" />
        </div>
      </form>
      <p className='savings'>Living Expenses: {this.state.livingExpenses}</p>
      <p className='savings'>Savings against salary: {this.state.eightyTwentyRule}</p>
      <p className='disclaimer'>*This calculator only looks at debit card transactions and does not take into account standing orders or direct debits or bills to E.ON.</p>
      </div>
    )
  }
}

EightyTwentyRule.propTypes = {
  transactions: PropTypes.array
}

export default EightyTwentyRule
