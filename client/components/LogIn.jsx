import React from 'react'

import { LogIn } from '../api'

class Form extends React.Component {
  state = {
    name: '',
    password: '',
    message: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    LogIn(this.state.password, this.state.name)
      .then(res => {
        this.setState({ message: res })
      })
  }

  render () {
    return (
      <>
      <h1>Log In</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="text" name="password" onChange={this.handleChange} />
          </label>
          <button type='button' onClick={this.handleSubmit} >Submit</button>
        </form>
        {this.state.message}
        <br />
      </>
    )
  }
}

export default Form
