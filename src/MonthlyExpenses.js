import React from 'react'
import PropTypes from 'prop-types'
import './MonthlyExpenses.css'

class MonthlyExpenses extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '', monthlyExpense: null, description: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    switch (this.state.value) {
      case 'Total':
        this.setState({
          monthlyExpense: Math.ceil(this.monthlyExpense()),
          description: 'Your total monthly spend: £'

        })
        break
      case 'Under 100':
        this.setState({
          monthlyExpense: Math.ceil(this.underHundred()),
          description: 'Your monthly spend for transactions less than a hundred pounds: £'
        })
        break
      case 'Amazon':
        this.setState({
          monthlyExpense: Math.ceil(this.amazon()),
          description: 'Your monthly spend at Amazon: £'
        })
        break
      case 'Living':
        this.setState({
          monthlyExpense: Math.ceil(this.living()),
          description: 'Your monthly living expenses: £'
        })
        break
      case '20 Rule':
        this.setState({
          monthlyExpense: this.twentyRule(),
          description: 'Savings against salary: '
        })
        break
    }
  }

  living () {
    return this.underHundred() + 660
  }

  twentyRule () {
    return `${Math.floor(100 - ((this.living() / 2050) * 100))}%`
  }

  underHundred () {
    console.log(this.props.expenses)
    // const expenses = this.props.expenses.map(transaction => transaction.Amount)
    const expenses = this.withdrawals()
    const n = expenses.length; let j
    for (let i = 0; i < n; i++) {
      if (expenses[i] > -100 && j === undefined) {
        j = i
        break
      }
    }
    return this.calculateTotal(this.withdrawals().slice(j))
  }

  withdrawals () {
    const expenses = this.props.expenses.map(transaction => transaction.Amount)
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

  amazon () {
    const amazon = []
    this.props.expenses.forEach((element) => {
      if (/AMZN/.test(element.Description) || /AMAZON/i.test(element.Description)) {
        amazon.push(element.Amount)
      }
    })
    return this.calculateTotal(amazon)
  }

  monthlyExpense () {
    // const expenses = this.props.expenses.map(transaction => transaction.Amount)
    return this.calculateTotal(this.withdrawals())
  }

  calculateTotal (expenses) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return -(expenses.reduce(reducer))
  }

  render () {
    return (
      <div>
      <form role='form' className='select-expense' onSubmit={this.handleSubmit}>
        <label>
          Monthly Expense:
          <select value={this.state.value} data-testid="select" onChange={this.handleChange}>
            <option value=""></option>
            <option value="Under 100">Under 100</option>
            <option value="Total">Total</option>
            <option value="Amazon">Amazon</option>
            <option value="Living">Living</option>
            <option value="20 Rule">20 Rule</option>
          </select>
        </label>
      <input type="submit" value="Submit" />
    </form><br></br>
      {this.state.description}{this.state.monthlyExpense}
    </div>
    )
  }
}

MonthlyExpenses.propTypes = {
  expenses: PropTypes.array
}

export default MonthlyExpenses