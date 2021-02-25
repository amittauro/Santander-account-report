import React from 'react'
import PropTypes from 'prop-types'

function Date (props) {
  let result = ''
  if (props.startDate === props.endDate) {
    result = props.startDate
  } else {
    result = 'Time period is over a month, please submit a monthly statement'
  }

  return (
    <div className='date'>
      <h3>{result}</h3>
    </div>
  )
}

Date.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default Date
