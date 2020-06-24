import React from 'react'
import { Route, Link } from 'react-router-dom'

import Form from './Form'
import See from './See'

const App = () => {
  return (
    <>
      {/* <Route path='/' component={Form} /> */}
      <h1>Hiiiiii hello</h1>
      <Link to='/register'>
        <button>register</button>
      </Link>
      <Route exact path='/register' component={Form} />
      <See />
    </>
  )
}

export default App
