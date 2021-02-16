export function Parser (rawData) {
  this._rawData = rawData

  this.sortedTransactions = () => {
    return this._processStatement().sort(function (a, b) {
      return a.Amount - b.Amount
    })
  }

  this._processStatement = () => {
    const transactions = []
    let i = 0
    const n = this._dataArray().length - 1
    while (i < n) {
      const transaction = this._dataArray().slice(i, i + 4)
      transactions.push(this._processSingleTransaction(transaction))
      i += 4
    }
    return transactions
  }

  this._processSingleTransaction = (transaction) => {
    const singleTransaction = {}
    transaction.forEach((element) => {
      const pairs = element.split(':')
      if (pairs[0] === 'Description') {
        const place = pairs[1]
        pairs[1] = place.substring(0, place.indexOf(','))
      } else if (pairs[0] === 'Amount') {
        pairs[1] = parseFloat(pairs[1])
      }
      singleTransaction[pairs[0]] = pairs[1]
    })
    return singleTransaction
  }

  this._dataArray = () => {
    return this._removeWhitespacesFromArray().slice(2)
  }

  this._removeWhitespacesFromArray = () => {
    const arrayWithoutWhitespaces = []
    this._statementArray().forEach((element) => {
      if (/\S/.test(element)) {
        arrayWithoutWhitespaces.push(element)
      }
    })
    return arrayWithoutWhitespaces
  }

  this._statementArray = () => {
    return this._parseData().split(/\n+/)
  }

  this._parseData = () => {
    return this._rawData.replace(/�/g, '')
  }
}
