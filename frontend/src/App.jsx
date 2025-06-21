import React from 'react'
import './App.css'
import Login from "./pages/Login.jsx"
import { BrowserRouter as Router, Routes, Route ,Navigate, BrowserRouter} from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Home from "./pages/Home.jsx"
import Register from './pages/Register.jsx'
import NotFound from "./pages/NotFound.jsx" 

function Logout() {
  localStorage.clear()
  return <Navigate to  = '/login'/>
}

function RegisterandLogout() {
  localStorage.clear()
  return <Register />
}


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route 
          path = "/" 
          element = {<ProtectedRoute><Home /></ProtectedRoute>  }></Route>
        <Route path="/login" element = {<Login />} />
        <Route path="/register" element = {<RegisterandLogout />} />
        <Route path="*" element = {<NotFound />} />
        <Route path = "/logout" element = {<Logout />} />
        {/* <Route path="/home" element = {<Home />} /> */}
      </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
