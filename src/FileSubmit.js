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
        <h3 className='title'>Upload a text file of your monthly statement and submit to view results </h3>
          <form role="form" onSubmit={this.handleSubmit}>
            <div className='form-row'>
            <input id='upload-file' type="file" name="" value={this.state.value} onChange={this.handleChange}/>
            </div>
            <div className='form-row'>
            <input id='file-submit' type="submit" name="submit" value="Submit" />
            </div>
          </form>
      </div>
    )
  }
}

FileSubmit.propTypes = {
  onFileSubmission: PropTypes.func
}

export default FileSubmit
