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
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';
import AdminTeacherAssignmentForm from '../../components/Assignments/AdminTeacherAssignmentForm';
import UploadAssignment from './assignmentRelated/UploadAssignment';
import ShowAssignments from './assignmentRelated/ShowAssignments';
import ShowSubmissions from './assignmentRelated/ShowSubmissions';

const TeacherDashboard = () => {
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
                    background: 'linear-gradient(135deg, #11998e, #38ef7d)', // 🌿 teacher gradient
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
                        Teacher Dashboard
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
                    <TeacherSideBar />
                </List>
            </Drawer>

            <Box component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<TeacherHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                    <Route path="/Teacher/profile" element={<TeacherProfile />} />
                    <Route path="/Teacher/complain" element={<TeacherComplain />} />
                    <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                    <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                    <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/Teacher/assignments/create" element={<AdminTeacherAssignmentForm />} />
                    <Route path="/Teacher/assignments" element={<UploadAssignment />} />
                    <Route path="/Teacher/assignments/view" element={<ShowAssignments />} />
                    <Route path="/Teacher/submissions" element={<ShowSubmissions />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default TeacherDashboard;

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
