import React from 'react'

import { getData } from '../api'

class See extends React.Component {
  state={ stuff: '' }
  handleClick = event => {
    getData(this.state.password, this.state.name)
      .then(console.log)
  }
  render () {
    return (
    <>
    <button type='button' onClick={this.handleClick} >See them</button>
    </>
    )
  }
}

export default See
