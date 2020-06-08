import React from 'react'

import { logIn } from '../api'

class Form extends React.Component {
  state = {
    name: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    console.log(this.state)
    logIn(this.state.password, this.state.name)
  }

  render () {
    return (
      <>
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
      </>
    )
  }
}

export default Form
