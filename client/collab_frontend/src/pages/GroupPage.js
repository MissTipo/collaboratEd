import React from 'react';
import {  Outlet } from 'react-router-dom';
import Topbar from '../components/GroupPage/scenes/global/topbar';
import Sidebar from '../components/GroupPage/scenes/global/sidebar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../theme';


function GroupPage() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = React.useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Topbar setIsSidebar={setIsSidebar} />
          <div className="sidebar-and-content" style={{display:'flex'}}>
            <Sidebar isSidebar={isSidebar} />
            <main className="content" style={{width:'100%'}}>
              <Outlet />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default GroupPage;
