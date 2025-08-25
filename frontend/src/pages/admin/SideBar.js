import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Styled button with hover effects
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: "8px",
  margin: "4px 8px",
  padding: "10px 16px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    transform: "scale(1.02)",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
  }
}));

// Icon container for better alignment & animation
const IconWrapper = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "40px",
  display: "flex",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const SideBar = () => {
  const location = useLocation();

  const navItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "Classes", icon: <ClassOutlinedIcon />, link: "/Admin/classes" },
    { text: "Subjects", icon: <AssignmentIcon />, link: "/Admin/subjects" },
    { text: "Teachers", icon: <SupervisorAccountOutlinedIcon />, link: "/Admin/teachers" },
    { text: "Students", icon: <PersonOutlineIcon />, link: "/Admin/students" },
    { text: "Notices", icon: <AnnouncementOutlinedIcon />, link: "/Admin/notices" },
    { text: "Complains", icon: <ReportIcon />, link: "/Admin/complains" },
    { text: "Create Assignment", icon: <AssignmentIcon />, link: "/Admin/assignments/create" },
    { text: "View Assignments", icon: <AssignmentIcon />, link: "/Admin/assignments" },
    { text: "View Submissions", icon: <UploadFileIcon />, link: "/Admin/submissions" },
  ];

  const userItems = [
    { text: "Profile", icon: <AccountCircleOutlinedIcon />, link: "/Admin/profile" },
    { text: "Logout", icon: <ExitToAppIcon />, link: "/logout" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Main Navigation */}
      {navItems.map((item, index) => (
        <Tooltip title={item.text} placement="right" key={index}>
          <StyledListItemButton
            component={Link}
            to={item.link}
            sx={{
              backgroundColor: isActive(item.link) ? "rgba(103, 58, 183, 0.1)" : "transparent",
            }}
          >
            <IconWrapper sx={{ color: isActive(item.link) ? "primary.main" : "inherit" }}>
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
            component={Link}
            to={item.link}
            sx={{
              backgroundColor: isActive(item.link) ? "rgba(103, 58, 183, 0.1)" : "transparent",
            }}
          >
            <IconWrapper sx={{ color: isActive(item.link) ? "primary.main" : "inherit" }}>
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

export default SideBar;
