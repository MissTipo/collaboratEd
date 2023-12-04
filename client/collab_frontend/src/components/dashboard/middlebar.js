import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import photo from "../../assets/dasboardImg.png";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Accessing the user object
import { useValue } from "../../context/contextProvider";

const MiddleBar = () => {
  const { state } = useValue();
  const { currentUser } = state;
  const userName = currentUser ? currentUser.name : "Alan";

  return (
    <Box sx={{ height: "100%", paddingTop: "30px" }}>
      <Typography sx={{ justifyContent: "center", paddingBottom: "20px" }}>
        <h2>Welcome back, {userName}</h2>
      </Typography>
      <div>
        <img src={photo} alt="" style={{ width: "100%", height: "100%" }} />
      </div>
      <br></br>
      <br></br>
      <Typography>
        <h3>Recommended for you</h3>
      </Typography>
      <List sx={{ bgcolor: "gray", borderRadius: "20px" }}>
        <ListItem>
          <ListItemText>
            <Typography
              sx={{
                border: "1px solid",
                borderRadius: "20px",
                paddingLeft: "10px",
              }}
            >
              <h4 style={{ margin: "1px" }}>Mechanics - backend </h4>Cohort 7
            </Typography>
          </ListItemText>
          <ChevronRightIcon sx={{ padding: "10px", marginTop: "10px" }} />
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography
              sx={{
                border: "1px solid",
                borderRadius: "20px",
                paddingLeft: "10px",
              }}
            >
              <h4 style={{ margin: "1px" }}>Coder Slang</h4>Cohort 10
            </Typography>
          </ListItemText>
          <ChevronRightIcon sx={{ padding: "10px", marginTop: "10px" }} />
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography
              sx={{
                border: "1px solid",
                borderRadius: "20px",
                paddingLeft: "10px",
              }}
            >
              <h4 style={{ margin: "1px" }}>Bug Busters</h4>Cohort 9
            </Typography>
          </ListItemText>
          <ChevronRightIcon sx={{ padding: "10px", marginTop: "10px" }} />
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography
              sx={{
                border: "1px solid",
                borderRadius: "20px",
                marginTop: "5px",
                paddingLeft: "10px",
              }}
            >
              <h4 style={{ margin: "1px" }}>Tech Paddies</h4>All Cohorts
            </Typography>
          </ListItemText>
          <ChevronRightIcon sx={{ padding: "10px", marginTop: "10px" }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default MiddleBar;
