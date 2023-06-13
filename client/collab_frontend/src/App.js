import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/Dashboard';
import Community from './pages/communityPage';
import HowItWorksPage from './pages/HowItWorks';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/how" element={<HowItWorksPage/>} />
        </Routes>
      </Router>
    </>
)}

export default App