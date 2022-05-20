import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import SignUp from './sign-up/SignUp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<SignUp />} />
        {/* <Route path="/" element={appwrap}>
          <Route index element={home} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}
