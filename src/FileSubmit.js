import React from 'react'
import { Parser } from './Parser'
import TopTenExpenses from './TopTenExpenses'
import MonthlyExpenses from './MonthlyExpenses'
import './css/File.css'

class FileSubmit extends React.Component {
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
    // const reader = new FileReader()
    // new Blob(file).text().then((text) => {
    //   console.log(text)
    //   this.setState({
    //     data: text,
    //     isLoaded: true
    //   })
    // })
    // this.loadText(file)
    //   .then((text) => {
    //     this.setState({
    //       data: text,
    //       isLoaded: true
    //     })
    //   })
    // const reader = new FileReader()
    // const currentThis = this
    // reader.onload = function (e) {
    //   currentThis.setState({
    //     data: e.target.result,
    //     isLoaded: true
    //   })
    // }
    // reader.readAsText(file)

  // loadText(file) {
  //   return new Promise(function(resolve, reject) {
  //     let reader = new FileReader()
  //     reader.readAsText(file)
  //     reader.onload = () => resolve(text);
  //     reader.onerror = () => reject(new Error('Text load error'));
  //   });
  // }

  render () {
    const { isLoaded, data } = this.state
    if (isLoaded) {
      const expenses = new Parser(data).sortedTransactions()
      return (
        <div>
          <TopTenExpenses expenses={expenses} />
          <MonthlyExpenses expenses={expenses} />
        </div>
      )
    } else {
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
}

export default FileSubmit
