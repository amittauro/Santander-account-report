function AccountReport(transactions) {
  this.transactions = transactions

  this.showTopTenExpenses = () => {
    return this.sortedTransactions().slice(0, 10);
  }

  this.sortedTransactions = () => {
    return this.transactions.sort(function (a, b) {
      return a.Amount - b.Amount;
    })
  }

  this.monthlyExpenditure = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return -(this.withdrawals().reduce(reducer))
  }

  this.livingExpenses = () => {
    let total = this.expensesUnderHundred() + 660
    return `${Math.ceil((total/2050)*100)}%`
  }

  this.amazonExpenses = () => {
    let amazon = []
    this.sortedTransactions().forEach((element) => {
      if (/AMZN/.test(element.Description) || /AMAZON/i.test(element.Description)) {
        amazon.push(element.Amount)
      }
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return -(amazon.reduce(reducer))
  }

  this.expensesUnderHundred = () => {
    let expenses = this.sortedTransactions().map(transaction => transaction.Amount)
    let n = expenses.length
    let index
    let j
    for (let i = 0; i < n; i++) {
      if (expenses[i] > 0) {
        index = i
        break
      } else if (expenses[i] > -100 && j === undefined) {
        j = i
      }
    }
    let withdrawals = expenses.slice(j, index)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return -(withdrawals.reduce(reducer))
  }

  this.withdrawals = () => {
    let expenses = this.sortedTransactions().map(transaction => transaction.Amount)
    let n = expenses.length
    let index
    for (let i = 0; i < n; i++) {
      if (expenses[i] > 0) {
        index = i
        break
      }
    }
    return expenses.slice(0, index)
  }

}

export default AccountReport
