import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/GroupDash/scenes/global/topbar';
import Sidebar from '../components/GroupDash/scenes/global/groupSidebar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../theme';
import { useValue } from '../context/contextProvider';


function GroupDashboardPage() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { channels } = useValue();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Topbar setIsSidebar={setIsSidebar} />
          <div className="sidebar-and-content" style={{ display: 'flex' }}>
            <Sidebar isSidebar={isSidebar} />
            <main className="content" style={{ width: '100%' }}>
              <Outlet />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default GroupDashboardPage;
