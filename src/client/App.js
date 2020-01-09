import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
class App extends Component {
  constructor() {
    super()

    this.state = {
      response: false,
      endpoint: 'ws://localhost:8001/',
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('connect', data => this.setState({ response: data }))
  }

  render() {
    const { response } = this.state
    return (
      <div style={{ textAlign: 'center' }}>
        {response ? <p>message: {response}</p> : <p>Loading...</p>}
      </div>
    )
  }
}
export default App
