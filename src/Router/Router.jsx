import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BlogDeatailed, CreateBlog, Home, Login, Signup, ViewBlog } from '../Pages'
import ProtectedRoute from './ProtectedRoute'
import BlogDetailed from '../Pages/BlogDeatailed/BlogDeatailed'

const Router = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={
        <Home/> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
     <Route path="/blog/:id" element={<BlogDetailed />} />

        <Route path='/all-blogs' element={  <ProtectedRoute>   <ViewBlog/> </ProtectedRoute> }/>
        <Route path='/create' element={ <ProtectedRoute> <CreateBlog/> </ProtectedRoute> }/>
     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default Router
