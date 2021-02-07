function Parser(rawData) {
  this.rawData = rawData

  this.processStatement = () => {
    let transactions = []
    let i = 0
    let n = this.dataArray().length - 1
    while (i < n) {
      let transaction = this.dataArray().slice(i, i + 4)
      transactions.push(this.processSingleTransaction(transaction))
      i += 4
    }
    return transactions
  }

  this.processSingleTransaction = (transaction) => {
    let singleTransaction = {}
    transaction.forEach((element) => {
      let pairs = element.split(':')
      if (pairs[0] === "Description") {
        let place = pairs[1]
        pairs[1] = place.substring(0, place.indexOf(','))
      } else if(pairs[0] === "Amount") {
        pairs[1] = parseFloat(pairs[1])
      }
      singleTransaction[pairs[0]] = pairs[1]
    })
    return singleTransaction
  }

  this.dataArray = () => {
    return this.removeWhitespacesFromArray().slice(2)
  }

  this.removeWhitespacesFromArray = () => {
    let arrayWithoutWhitespaces = []
    this.statementArray().forEach((element) => {
      if (/\S/.test(element)) {
        arrayWithoutWhitespaces.push(element)
      }
    })
    return arrayWithoutWhitespaces
  }

  this.statementArray = () => {
    return this.parseData().split(/\n+/)
  }

  this.parseData = () => {
    return this.rawData
    .replace(/�/g, '')
    .replace(/CARD PAYMENT TO /g, '')
  }

}

export default Parser
