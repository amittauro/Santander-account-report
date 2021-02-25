import './css/App.css'
import React from 'react'
import FileSubmit from './FileSubmit'
import TopTenExpenses from './TopTenExpenses'
import AmazonExpenses from './AmazonExpenses'
import EightyTwentyRule from './EightyTwentyRule'
import Date from './Date'
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
      const parser = new Parser(data)
      const transactions = parser.processStatement()
      const startDate = parser.processStartDate()
      const endDate = parser.processEndDate()
      return (
        <div>
          <h1>Santander Monthly Report</h1>
          <Date startDate={startDate} endDate={endDate} />
          <TopTenExpenses transactions={transactions} />
          <EightyTwentyRule transactions={transactions} />
          <AmazonExpenses transactions={transactions} />
        </div>
      )
    }
  }
}

export default App
