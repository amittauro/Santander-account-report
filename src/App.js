import './css/App.css'
import React from 'react'
import FileSubmit from './FileSubmit'
import { Parser } from './Parser'
import TopTenExpenses from './TopTenExpenses'
import MonthlyExpenses from './MonthlyExpenses'

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
    const sortedTransactions = new Parser(data).sortedTransactions()
    if (!isLoaded) {
      return (
        <div className="App">
          <h1>Santander Monthly Report</h1>
          <FileSubmit onFileSubmission={this.handleFileSubmit}/>
        </div>
      )
    } else {
      return (
        <div>
          <TopTenExpenses sortedTransactions={sortedTransactions} />
          <MonthlyExpenses sortedTransactions={sortedTransactions} />
        </div>
      )
    }
  }
}

export default App
