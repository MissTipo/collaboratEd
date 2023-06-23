import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ChatIcon from '@mui/icons-material/Chat';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Hero1 from '../../../../assets/Hero1.png';
//import ChannelList from '../channelList';
import { fetchChannels } from '../../../../actions/channel';
import { useValue } from '../../../../context/contextProvider';
import { useEffect } from 'react';
import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import DeleteChannelForm from '../deleteChannelForm';
import { deleteChannel } from '../../../../actions/channel';
import VoiceChannelPage from '../channelPage';



const Item = ({ title, to, icon, selected, setSelected, onChannelRightClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleContextMenu = (event) => {
    event.preventDefault();
    onChannelRightClick(title);
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      onContextMenu={handleContextMenu}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { dispatch } = useValue();
  const [channels, setChannels] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedChannel, setSelectedChannel] = React.useState("");
  const sidebarRef = React.useRef(null);

  useEffect(() => {
    const handleContextMenu = (event) => {
      if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
        event.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);


  const handleChannelRightClick = (name) => {
    setShowForm(true);
    setSelectedChannel(name);
  };

  const handleChannelClick = (name) => {
    setSelectedChannel(name);
  };

  const handleDeleteChannel = async (channelId) => {
    try {
      await deleteChannel(channelId, dispatch);
      setShowForm(false);
      console.log("Channel deleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChannels(dispatch).then((data) => {
      if (data) {
        setChannels(data);
      }
    });
  }, [dispatch]);


  return (
    <Box
      ref={sidebarRef}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  CollaboratEd
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={Hero1}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Group Name
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Manage Team"
              to="team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Channels"
              to="channels"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {channels.map((channel) => (
              <Item
                key={channel._id}
                title={channel.name}
                to={`channels/${channel._id}`}
                icon={<TagIcon />}
                selected={selected}
                setSelected={setSelected}
                onChannelClick={() => handleChannelClick(channel.name)}
                onChannelRightClick={handleChannelRightClick}
              >
                <DeleteChannelForm
                  channelId={channel._id} channelName={channel.name}
                  onClose={() => setShowForm(false)}
                  onDelete={() => handleDeleteChannel(channel._id)}
                />
              </Item>
            ))}
            <Item
              title="Resource Library"
              to="resource"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Community"
              to="community"
              icon={<ConnectWithoutContactIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Forum"
              to="channel"
              icon={<ChatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Resource Library"
              to="resource"
              icon={<LibraryBooksIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid black",
            padding: "20px",
            backgroundColor: "white",
            zIndex: "9999",
          }}
        >
          <h2>Delete Channel: {selectedChannel}</h2>
          {/* Form content for deleting channel */}
          <DeleteChannelForm
            channelId={selectedChannel}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
      {selectedChannel && (
        <VoiceChannelPage channelName={selectedChannel} />
      )}
    </Box>
  );
};

export default Sidebar;
