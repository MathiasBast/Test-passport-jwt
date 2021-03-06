import React from 'react'

import { getData } from '../api'

class See extends React.Component {
  state={ stuff: [] }
  handleClick = event => {
    getData(this.state.password, this.state.name)
      .then(res => {
        this.setState({
          stuff: res.users
        })
      })
  }
  render () {
    return (
    <>
      <button type='button' onClick={this.handleClick} >See them</button>

        {this.state.stuff.map(item => {
          return <>
            <p>{item.name}</p>
          </>
        })}

      <button type='button' onClick={() => this.setState({ stuff: [] })} >Clear</button>
    </>
    )
  }
}

export default See
