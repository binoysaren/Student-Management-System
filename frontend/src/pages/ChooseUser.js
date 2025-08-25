import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "abc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "admin@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    }
    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "101";
        const studentName = "Ashis Shaw";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    }
    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "teacher@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    }
    else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <PageWrapper>
      <GlassCard>
        <Title>Welcome</Title>
        <Subtitle>Select your role to continue</Subtitle>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard color="#4f8ef7" onClick={() => navigateHandler("Admin")}>
              <IconWrapper>
                <AccountCircle />
              </IconWrapper>
              <RoleTitle>Admin</RoleTitle>
              <RoleDesc>Manage the platform, users, and data.</RoleDesc>
            </RoleCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RoleCard color="#28c76f" onClick={() => navigateHandler("Teacher")}>
              <IconWrapper>
                <Group />
              </IconWrapper>
              <RoleTitle>Teacher</RoleTitle>
              <RoleDesc>Create courses, assignments, and track students.</RoleDesc>
            </RoleCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RoleCard color="#ff9f43" onClick={() => navigateHandler("Student")}>
              <IconWrapper>
                <School />
              </IconWrapper>
              <RoleTitle>Student</RoleTitle>
              <RoleDesc>Access learning materials and submit assignments.</RoleDesc>
            </RoleCard>
          </Grid>
        </Grid>
      </GlassCard>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageWrapper>
  );
};

export default ChooseUser;

/* Animations */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* Background Wrapper */
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top left, #3a6186, #89253e);
  padding: 2rem;
`;

/* Glassmorphic Card */
const GlassCard = styled(Container)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 950px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  animation: ${fadeIn} 0.6s ease;
  text-align: center;
  color: white;
`;

/* Titles */
const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #ddd;
  margin-bottom: 2rem;
`;

/* Role Cards */
const RoleCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 2rem 1.5rem;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.color};
  border: 1px solid transparent;
  min-height: 230px;   /* Ensures equal height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${props => props.color}22;
    box-shadow: 0 0 15px ${props => props.color}66;
    border-color: ${props => props.color}88;
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 40px;
  margin-bottom: 1rem;

  svg {
    font-size: 48px;
  }
`;

const RoleTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const RoleDesc = styled.p`
  font-size: 0.9rem;
  color: #ccc;
`;
