import { Box, Typography } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import SignUp from './sign-up/SignUp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Box bgcolor="blue" width="100vw" height="100vh" />}
        >
          <Route index element={<Typography>HOME</Typography>} />
          <Route path="/batata" element={<Typography>BATA</Typography>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="cadastre-se" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
