import React from 'react'
import './css/File.css'
import PropTypes from 'prop-types'

class FileSubmit extends React.Component {
  constructor (props) {
    super(props)
    this.state = { file: null, value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      file: event.target.files[0],
      value: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const file = this.state.file
    const reader = new FileReader()
    const currentThis = this
    reader.onload = function (e) {
      currentThis.props.onFileSubmission(e.target.result)
    }
    reader.readAsText(file)
  }

  render () {
    return (
      <div>
        <h2>Upload a text file of your monthly transactions and submit to view results </h2>
          <form role="form" onSubmit={this.handleSubmit}>
            <input id="file" type="file" name="" value={this.state.value} onChange={this.handleChange}/><br></br>
            <input type="submit" name="submit" value="submit" />
          </form>
      </div>
    )
  }
}

FileSubmit.propTypes = {
  onFileSubmission: PropTypes.func
}

export default FileSubmit
