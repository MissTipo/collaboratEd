import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/Dashboard';
import Community from './pages/communityPage';
import HowItWorksPage from './pages/HowItWorks';
import GroupPage from './pages/GroupPage';
import Team from './components/GroupPage/scenes/team';
import Contacts from './components/GroupPage/scenes/contacts';
import Form from './components/GroupPage/scenes/form';
import Calendar from './components/GroupPage/scenes/calendar';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/how" element={<HowItWorksPage/>} />
          <Route path="/dashboard" element={<GroupPage/>} >
            <Route path="" element={<Dashboard/>} />
            <Route path="team" element={<Team/>} />
            <Route path="calendar" element={<Calendar/>} />
            <Route path="form" element={<Form/>} />
            <Route path="contacts" element={<Contacts/>} />
            <Route path='community' element={<Community/>} />
          </Route>
        </Routes>
      </Router>
    </>
)}

export default App