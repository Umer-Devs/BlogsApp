import React from 'react'
import Router from './Router/Router'
import  { MyBlogProvider  } from './CreateContext/Contextapi'

const App = () => {
  return (
   <>
   <MyBlogProvider >
  <Router/>
  </MyBlogProvider >
   </>
  )
}

export default App
