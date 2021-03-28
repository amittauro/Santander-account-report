export function Parser (rawData) {
  this._rawData = rawData

  this.processStartDate = () => {
    const startDate = new Date(this._processDate()[0])
    const options = { month: 'long', year: 'numeric' }
    return startDate.toLocaleString('default', options)
  }

  this.processEndDate = () => {
    const endDate = new Date(this._processDate()[0])
    const options = { month: 'long', year: 'numeric' }
    return endDate.toLocaleString('default', options)
  }

  this._processDate = () => {
    let date = this._statementArray()[0]
    const separator = date.indexOf(':')
    date = date.slice(separator + 1)
    const dates = date.split('to')
    return dates.map((date) => {
      return date.split('/').reverse().join('-')
    })
  }

  this.processStatement = () => {
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
    // getkeyvaluefrompairstring
    transaction.forEach((element) => {
      const pairs = element.split(':')
      if (pairs[0] === 'Description') {
        // const place = pairs[1]
        // pairs[1] = place.substring(0, place.indexOf(','))
      } else if (pairs[0] === 'Amount') {
        pairs[1] = parseFloat(pairs[1])
      }
      singleTransaction[pairs[0]] = pairs[1]
    })
    // clean up object
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
