import React from 'react'
import { Route, Link } from 'react-router-dom'

import Form from './Form'
import See from './See'
import LogIn from './LogIn'

const App = () => {
  return (
    <>
      {/* <Route path='/' component={Form} /> */}
      <h1>Hiiiiii hello</h1>
      <Link to='/register'>
        <button>register</button>
      </Link>
      <Link to='/login'>
        <button>Log In</button>
      </Link>
      <Route exact path='/register' component={Form} />
      <Route exact path='/login' component={LogIn} />
      <See />
    </>
  )
}

export default App
