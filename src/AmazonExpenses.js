import React from 'react'
import PropTypes from 'prop-types'
import './css/Amazon.css'

function AmazonExpenses (props) {
  let amazonAmount = 0
  props.sortedTransactions.forEach((element) => {
    if (/AMZN/.test(element.Description) || /AMAZON/i.test(element.Description)) {
      amazonAmount += element.Amount
    }
  })

  return (
    <div className='amazon'>
      <h3>Amazon Expenses</h3>
      This month you spent £{-amazonAmount} at Amazon
    </div>
  )
}

AmazonExpenses.propTypes = {
  sortedTransactions: PropTypes.array
}

export default AmazonExpenses
