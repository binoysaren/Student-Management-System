import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { styled as muiStyled } from '@mui/system';
import { LightPurpleButton } from '../components/buttonStyles';

// Deep Purple Button (only for this page)
const DeepPurpleButton = muiStyled(Button)({
  background: "linear-gradient(135deg, #4a148c, #6a1b9a)", // deep purple
  color: "#fff",
  fontWeight: "600",
  textTransform: "none",
  padding: "12px 24px",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #311b92, #4a148c)", // darker hover
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(74, 20, 140, 0.4)",
  },
});

const TypingText = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <StyledTypingText>
      {displayedText}
      {currentIndex < text.length ? <Cursor>|</Cursor> : null}
    </StyledTypingText>
  );
};

const features = [
  { icon: "🔐", title: "Role-Based Login", description: "Secure login portals for Admin, Teacher, and Student with JWT and Google Sign-In support." },
  { icon: "🧑‍🏫", title: "Teacher & Student Management", description: "Add, edit, or delete students and teachers. Assign teachers to specific classes and subjects." },
  { icon: "📚", title: "Subject & Class Assignment", description: "Create classes and subjects, and automatically associate them with students and teachers." },
  { icon: "📂", title: "Smart Assignment Module", description: "Upload assignments (PDF/DOC) and track student submissions efficiently." },
  { icon: "📊", title: "Attendance Tracking", description: "View subject-wise attendance using interactive tables and charts." },
  { icon: "📢", title: "Notices & Complaints", description: "Admins publish notices; students raise complaints – streamlining school communication." },
];

const Homepage = () => {
  const descriptionText = "A web-based platform for teachers and students to efficiently manage attendance and share class notes. Teachers can mark attendance, upload notes, and track assignments, while students can access records, check attendance status, and download study materials. The system also supports reminders and notifications to keep everyone updated.";

  return (
    <>
      <BackgroundWrapper>
        <AnimatedBackground />
        <StyledContainer>
          <Grid container spacing={0} justifyContent="center" alignItems="center" style={{ height: '100vh', position: 'relative', zIndex: 2 }}>
            <Grid item xs={12} md={8}>
              <StyledPaper style={{ textAlign: "center" }}>
                <StyledTitle>
                  Welcome to <br /> School Management <br /> System
                </StyledTitle>

                <TypingText text={descriptionText} />

                <StyledBox>
                  <StyledLink to="/choose">
                    {/* replaced LightPurpleButton with DeepPurpleButton */}
                    <DeepPurpleButton variant="contained" fullWidth>
                      Get Started
                    </DeepPurpleButton>
                  </StyledLink>
                  <StyledTextSmall>
                    Choose your role to proceed:{' '}
                    <Link to="/choose" style={{ color: "#4a1d96", fontWeight: 'bold' }}>
                      Admin | Teacher | Student
                    </Link>
                  </StyledTextSmall>
                </StyledBox>
              </StyledPaper>
            </Grid>
          </Grid>
        </StyledContainer>
      </BackgroundWrapper>

      <FeatureBackground>
        <FeatureSection>
          <StyledFeaturesTitle>✨ Key Features</StyledFeaturesTitle>
          <Grid container spacing={3} justifyContent="center" sx={{ px: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureBox>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureBox>
              </Grid>
            ))}
          </Grid>
        </FeatureSection>
      </FeatureBackground>
    </>
  );
};

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #6a11cb, #2575fc, #ff758c, #ff7eb3);
  background-size: 300% 300%;
  animation: ${gradientShift} 18s ease infinite;
  &::before, &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background-repeat: no-repeat;
    opacity: 0.25;
    animation: floatShapes 25s linear infinite;
  }
  &::before {
    background-image:
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%);
  }
  &::after {
    background-image:
      radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 30% 80%, rgba(255,255,255,0.15) 0%, transparent 60%);
    animation-delay: -12s;
  }
  @keyframes floatShapes {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }
`;

const StyledContainer = styled(Container)`
  position: relative;
  padding: 0;
  max-width: 100% !important;
  background: transparent;
`;

const StyledPaper = styled.div`
  padding: 40px 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeUp} 1.2s ease-in-out;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const StyledTypingText = styled.p`
  margin: 30px 0;
  line-height: 1.6;
  text-align: center;
  font-size: 1.05rem;
  color: #333;
  min-height: 120px;
`;

const Cursor = styled.span`
  animation: blink 0.7s infinite;
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const StyledTextSmall = styled.p`
  font-size: 0.95rem;
  color: #555;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const FeatureBackground = styled.div`
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const FeatureSection = styled(Box)`
  padding: 80px 24px;
  position: relative;
  z-index: 2;
`;

const StyledFeaturesTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FeatureBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  animation: ${fadeUp} 0.8s ease forwards;
  transition: all 0.4s ease;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  &:hover {
    transform: translateY(-8px) scale(1.03);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
`;

export default Homepage;
