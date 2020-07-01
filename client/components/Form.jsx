import React from 'react'

import { addData } from '../api'
import { Redirect } from 'react-router-dom'

class Form extends React.Component {
  state = {
    name: '',
    password: '',
    message: '',
    redirect: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    addData(this.state.password, this.state.name)
      .then(res => {
        this.setState({ message: res })
      })
      .then(() => {
        if (this.state.message === 'user created') {
          console.log('doneee')
        }
      })
  }

  componentWillMount = event => {
    localStorage.getItem('token')
    if (localStorage.getItem('token')) {
      this.setState({
        redirect: true
      })
    }
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
        {this.state.message}
        <br />
        {this.state.redirect && <Redirect to='/' />}
      </>
    )
  }
}

export default Form
