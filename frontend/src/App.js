import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google'; // ADD THIS IMPORT
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';
import GoogleCallback from './pages/GoogleCallback';

// Get Google Client ID from environment variables
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <GoogleOAuthProvider clientId={googleClientId}> {/* WRAP WITH PROVIDER */}
      <Router>
        {currentRole === null &&
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

            <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
            <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
            <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

            <Route path="/Adminregister" element={<AdminRegisterPage />} />
            <Route path="/google-callback" element={<GoogleCallback />} />

            <Route path='*' element={<Navigate to="/" />} />
          </Routes>}

        {currentRole === "Admin" &&
          <>
            <AdminDashboard />
          </>
        }

        {currentRole === "Student" &&
          <>
            <StudentDashboard />
          </>
        }

        {currentRole === "Teacher" &&
          <>
            <TeacherDashboard />
          </>
        }
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App