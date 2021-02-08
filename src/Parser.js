import AccountReport from './AccountReport'
import PropTypes from 'prop-types'
import React from 'react'

class Parser extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: this.props.rawData }
  }

  processStatement () {
    const transactions = []
    let i = 0
    const n = this.dataArray().length - 1
    while (i < n) {
      const transaction = this.dataArray().slice(i, i + 4)
      transactions.push(this.processSingleTransaction(transaction))
      i += 4
    }
    return transactions
  }

  processSingleTransaction (transaction) {
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

  dataArray () {
    return this.removeWhitespacesFromArray().slice(2)
  }

  removeWhitespacesFromArray () {
    const arrayWithoutWhitespaces = []
    this.statementArray().forEach((element) => {
      if (/\S/.test(element)) {
        arrayWithoutWhitespaces.push(element)
      }
    })
    return arrayWithoutWhitespaces
  }

  statementArray () {
    return this.parseData().split(/\n+/)
  }

  parseData () {
    return this.state.data
      .replace(/�/g, '')
      .replace(/CARD PAYMENT TO /g, '')
  }

  render () {
    return (
      <div>
        <AccountReport transactions={this.processStatement()} />
      </div>
    )
  }
}

Parser.propTypes = {
  rawData: PropTypes.string
}

export default Parser
