import React from 'react'
import { Route, Link } from 'react-router-dom'

import Form from './Form'
import See from './See'
import LogIn from './LogIn'

const App = () => {
  const logOut = event => {
    localStorage.removeItem('token')
  }
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
      <Link to='/'>
        <button>Home</button>
      </Link>
      <button onClick={logOut} >Log Out</button>
      <Route exact path='/register' component={Form} />
      <Route exact path='/login' component={LogIn} />
      <See />
    </>
  )
}

export default App
