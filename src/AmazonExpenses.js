import React from 'react'
import PropTypes from 'prop-types'

function AmazonExpenses (props) {
  let amazonAmount = 0
  props.sortedTransactions.forEach((element) => {
    if (/AMZN/.test(element.Description) || /AMAZON/i.test(element.Description)) {
      amazonAmount += element.Amount
    }
  })

  return (
    <div>
      <h4>Amazon Expenses</h4>
      This month you spent £{-amazonAmount} at Amazon
    </div>
  )
}

AmazonExpenses.propTypes = {
  sortedTransactions: PropTypes.array
}

export default AmazonExpenses
