import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Paper, Avatar, Typography, Box, Divider } from '@mui/material';
import { School, Class, Book } from '@mui/icons-material';

const StudentProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.sclassName;
    const studentSchool = currentUser.school;

    return (
        <ProfileWrapper>
            <ProfileCard elevation={5}>
                <AvatarWrapper>
                    <AvatarStyled>
                        {currentUser.name?.charAt(0).toUpperCase()}
                    </AvatarStyled>
                </AvatarWrapper>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
                    {currentUser.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#777', mb: 2 }}>
                    Student
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <InfoSection>
                    <Label>Email</Label>
                    <Value>{currentUser.email}</Value>
                </InfoSection>

                <InfoSection>
                    <Label>Roll Number</Label>
                    <Value>{currentUser.rollNum}</Value>
                </InfoSection>

                <InfoSection>
                    <Label>Class</Label>
                    <Value>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Class fontSize="small" />
                            {sclassName.sclassName}
                        </Box>
                    </Value>
                </InfoSection>

                <InfoSection>
                    <Label>School</Label>
                    <Value>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <School fontSize="small" />
                            {studentSchool.schoolName}
                        </Box>
                    </Value>
                </InfoSection>
            </ProfileCard>
        </ProfileWrapper>
    );
};

export default StudentProfile;

// Outer wrapper with soft gradient background
const ProfileWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f6f9, #e8edf3);
  padding: 20px;
`;

// Card styling
const ProfileCard = styled(Paper)`
  padding: 30px 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  border-radius: 20px !important;
  background: #ffffff !important;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.08) !important;
`;

// Avatar container
const AvatarWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

// Avatar with gradient
const AvatarStyled = styled(Avatar)`
  && {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    font-size: 40px;
    font-weight: bold;
    color: white;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
  }
`;

// Info section layout
const InfoSection = styled(Box)`
  text-align: left;
  margin-bottom: 15px;
`;

// Label
const Label = styled(Typography)`
  && {
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
  }
`;

// Value
const Value = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }
`;