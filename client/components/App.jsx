import React from 'react'
import { Route } from 'react-router-dom'

import Form from './Form'

const App = () => {
  return (
    <>
      <Route path='/' component={Form} />
    </>
  )
}

export default App
