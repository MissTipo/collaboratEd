// Desc: This is the root component of the application
//       It is the first component to be rendered
//       It is the parent component of all other components
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
)}

export default App
