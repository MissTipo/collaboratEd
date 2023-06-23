import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/Dashboard';
import Community from './pages/communityPage';
import HowItWorksPage from './pages/HowItWorks';
import GroupPage from './pages/GroupPage';
import Team from './components/GroupPage/scenes/team';
//import Contacts from './components/GroupPage/scenes/contacts';
import Form from './components/GroupPage/scenes/form';
import Calendar from './components/GroupPage/scenes/calendar';
import GroupDashboard from './pages/groupDashboard';
import Channel from './components/GroupDash/scenes/channels';
// import Resource from './components/GroupPage/scenes/resource';
import GDashboard from './components/GroupDash/scenes/dashboard';
import ChannelForm from './components/GroupDash/scenes/channelForm'
import ResourceLibrary from './components/GroupDash/scenes/resourceLibraryForm';
import VoiceChannelPage from './components/GroupDash/scenes/channelPage';
import GroupForm from './components/GroupPage/scenes/groupForm'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/community" element={<Community />} />
          <Route path="/how" element={<HowItWorksPage />} />
          <Route path="/dashboard" element={<GroupPage />} >
            <Route path="" element={<Dashboard />} />
            <Route path="team" element={<Team />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="form" element={<Form />} />
            <Route path="groups" element={<GroupForm />} />
            <Route path='community' element={<Community />} />
          </Route>
          <Route path="/groupDashboard" element={<GroupDashboard />} >
            <Route path="" element={<GDashboard />} />
            <Route path="team" element={<Team />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="resource" element={<ResourceLibrary />} />
            <Route path="channels" element={<ChannelForm />} />
            <Route path="channels/:channelId" element={<VoiceChannelPage />} />
            <Route path='community' element={<Community />} />
            <Route path='channel' element={<Channel />} />
            {/* <Route path='resource' element={<ResourceLibrary/>} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
