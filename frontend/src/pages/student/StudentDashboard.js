import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAssignmentSubmit from '../../components/Assignments/StudentAssignmentSubmit';
import ShowAssignments from './assignmentRelated/ShowAssignments';
import UploadAssignment from './assignmentRelated/UploadAssignment';

const StudentDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', background: '#f4f6f8' }}>
            <CssBaseline />
            <AppBar 
                open={open} 
                position="absolute" 
                sx={{
                    background: 'linear-gradient(135deg, #ff6a00, #ee0979)', // 🔥 student gradient
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            letterSpacing: 0.5
                        }}
                    >
                        Student Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    ...styles.drawerStyled,
                    ...(open ? styles.drawerOpen : styles.drawerClosed),
                }}
            >
                <Toolbar sx={styles.toolBarStyled}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <StudentSideBar />
                </List>
            </Drawer>

            <Box component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />
                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/Student/ShowAssignments" element={<ShowAssignments />} />
                    <Route path="/Student/assignments/upload" element={<StudentAssignmentSubmit />} />
                    <Route path="/Student/uploadassignment" element={<UploadAssignment />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default StudentDashboard;

const styles = {
    boxStyled: {
        backgroundColor: '#f9fafc',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: '20px',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        transition: 'all 0.3s ease-in-out',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        borderRight: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    drawerOpen: {
        width: 240,
    },
    drawerClosed: {
        width: 70,
    }
};
