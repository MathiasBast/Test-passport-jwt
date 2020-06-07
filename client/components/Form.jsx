import React from 'react'

class Form extends React.Component {
  state = {
    name: '',
    password: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
      <>
        <Form>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="text" name="password" onChange={this.handleChange} />
          </label>
        </Form>
      </>
    )
  }
}

export default Form
