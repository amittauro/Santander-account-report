import './css/App.css'
import React from 'react'
import FileSubmit from './FileSubmit'
import TopTenExpenses from './TopTenExpenses'
import AmazonExpenses from './AmazonExpenses'
import EightyTwentyRule from './EightyTwentyRule'
import { Parser } from './Parser.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: '', isLoaded: false }

    this.handleFileSubmit = this.handleFileSubmit.bind(this)
  }

  handleFileSubmit (data) {
    this.setState({
      data: data,
      isLoaded: true
    })
  }

  render () {
    const { isLoaded, data } = this.state
    if (!isLoaded) {
      return (
        <div className="App">
          <h1>Santander Monthly Report</h1>
          <FileSubmit onFileSubmission={this.handleFileSubmit}/>
        </div>
      )
    } else {
      const sortedTransactions = new Parser(data).sortedTransactions()
      return (
        <div>
          <h1>Santander Monthly Report</h1>
          <TopTenExpenses sortedTransactions={sortedTransactions} />
          <EightyTwentyRule sortedTransactions={sortedTransactions} />
          <AmazonExpenses sortedTransactions={sortedTransactions} />
        </div>
      )
    }
  }
}

export default App
