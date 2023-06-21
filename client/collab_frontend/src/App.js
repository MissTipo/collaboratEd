import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/Dashboard';
import CommunityPage from './pages/communityPage';
import HowItWorksPage from './pages/HowItWorks';
import GroupPage from './pages/GroupPage';
import Team from './components/GroupPage/scenes/team';
import Contacts from './components/GroupPage/scenes/contacts';
import Form from './components/GroupPage/scenes/form';
import Calendar from './components/GroupPage/scenes/calendar';
import GroupDashboard from './pages/groupDashboard';
import Channel from './components/GroupDash/scenes/channels';
// import Resource from './components/GroupPage/scenes/resource';
import GDashboard from './components/GroupDash/scenes/dashboard';
// import Demo from './pages/com';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/community" element={<CommunityPage/>} />
          <Route path="/how" element={<HowItWorksPage/>} />
          <Route path="/dashboard" element={<GroupPage/>} >
            <Route path="" element={<Dashboard/>} />
            <Route path="team" element={<Team/>} />
            <Route path="calendar" element={<Calendar/>} />
            <Route path="form" element={<Form/>} />
            <Route path="contacts" element={<Contacts/>} />
            <Route path='community' element={<CommunityPage/>} />
          </Route>
          <Route path="/groupDashboard" element={<GroupDashboard/>} >
            <Route path="" element={<GDashboard/>} />
            <Route path="team" element={<Team/>} />
            <Route path="calendar" element={<Calendar/>} />
            <Route path="form" element={<Form/>} />
            <Route path="contacts" element={<Contacts/>} />
            <Route path='community' element={<CommunityPage/>} />
            <Route path='channel' element={<Channel/>} />
            {/* <Route path='resource' element={<ResourceLibrary/>} /> */}
          </Route>
          {/* <Route path='demo' element={<Demo/>} /> */}
        </Routes>
      </Router>
    </>
)}

export default App