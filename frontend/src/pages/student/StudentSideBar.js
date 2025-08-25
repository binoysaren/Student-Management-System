import * as React from 'react';
import { Divider, ListItemText, ListSubheader, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Styled button with hover effects
const StyledListItemButton = styled("div")(({ theme }) => ({
  borderRadius: "8px",
  margin: "4px 8px",
  padding: "10px 16px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    transform: "scale(1.02)",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
  }
}));

// Icon container
const IconWrapper = styled("div")(({ theme }) => ({
  minWidth: "40px",
  display: "flex",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StudentSideBar = () => {
  const location = useLocation();

  const navItems = [
    { text: "Home", icon: <HomeIcon />, link: "/Student/dashboard" },
    { text: "Subjects", icon: <AssignmentIcon />, link: "/Student/subjects" },
    { text: "Attendance", icon: <ClassOutlinedIcon />, link: "/Student/attendance" },
    { text: "Complain", icon: <AnnouncementOutlinedIcon />, link: "/Student/complain" },
    { text: "View Assignments", icon: <AssignmentIcon />, link: "/Student/ShowAssignments" },
    { text: "Upload Assignment", icon: <UploadFileIcon />, link: "/Student/uploadassignment" },
  ];

  const userItems = [
    { text: "Profile", icon: <AccountCircleOutlinedIcon />, link: "/Student/profile" },
    { text: "Logout", icon: <ExitToAppIcon />, link: "/logout" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Navigation */}
      {navItems.map((item, index) => (
        <Tooltip title={item.text} placement="right" key={index}>
          <StyledListItemButton
            as={Link}
            to={item.link}
            style={{
              backgroundColor: isActive(item.link) ? "rgba(103, 58, 183, 0.1)" : "transparent",
            }}
          >
            <IconWrapper style={{ color: isActive(item.link) ? "#673ab7" : "inherit" }}>
              {item.icon}
            </IconWrapper>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.link) ? "bold" : "normal",
              }}
            />
          </StyledListItemButton>
        </Tooltip>
      ))}

      <Divider sx={{ my: 1 }} />

      {/* User Section */}
      <ListSubheader component="div" inset sx={{ fontWeight: "bold", color: "primary.main" }}>
        User
      </ListSubheader>
      {userItems.map((item, index) => (
        <Tooltip title={item.text} placement="right" key={index}>
          <StyledListItemButton
            as={Link}
            to={item.link}
            style={{
              backgroundColor: isActive(item.link) ? "rgba(103, 58, 183, 0.1)" : "transparent",
            }}
          >
            <IconWrapper style={{ color: isActive(item.link) ? "#673ab7" : "inherit" }}>
              {item.icon}
            </IconWrapper>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActive(item.link) ? "bold" : "normal",
              }}
            />
          </StyledListItemButton>
        </Tooltip>
      ))}
    </>
  );
};

export default StudentSideBar;
