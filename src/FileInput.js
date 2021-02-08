import React from 'react'
import Parser from './Parser'
import './File.css'

class FileInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: '', isLoaded: false, file: null, value: '' }

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
      currentThis.setState({
        data: e.target.result,
        isLoaded: true
      })
    }
    reader.readAsText(file)
  }

  render () {
    const { isLoaded, data } = this.state
    if (isLoaded) {
      return (
        <Parser rawData={data} />
      )
    } else {
      return (
      <div>
      <h2>Upload a text file of your monthly transactions and submit to view results </h2>
        <form role="form" onSubmit={this.handleSubmit}>
          <input id="file" type="file" name="" value={this.state.value} onChange={this.handleChange}/><br></br>
          <input type="submit" name="" value="submit" />
        </form>
      </div>
      )
    }
  }
}

export default FileInput
