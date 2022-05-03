import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login/Login'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={appwrap}>
          <Route index element={home} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}
