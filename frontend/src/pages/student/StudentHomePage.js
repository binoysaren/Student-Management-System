import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled, { keyframes } from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList?.length || 0;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <DashboardWrapper>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg, #ffecd2, #fcb69f)">
                            <Icon src={Subject} alt="Subjects" />
                            <Title>Total Subjects</Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg, #cfd9df, #e2ebf0)">
                            <Icon src={Assignment} alt="Assignments" />
                            <Title>Total Assignments</Title>
                            <Data start={0} end={15} duration={4} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StyledCard gradient="linear-gradient(135deg, #a1c4fd, #c2e9fb)">
                            {
                                response ? (
                                    <Typography variant="h6">No Attendance Found</Typography>
                                ) : loading ? (
                                    <Typography variant="h6">Loading...</Typography>
                                ) : subjectAttendance?.length > 0 ? (
                                    <CustomPieChart data={chartData} />
                                ) : (
                                    <Typography variant="h6">No Attendance Found</Typography>
                                )
                            }
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: "20px", boxShadow: "0px 6px 25px rgba(0,0,0,0.1)" }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </DashboardWrapper>
    )
}

// Background for the page
const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  padding-top: 20px;
`;

// Card entry animation
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

// Glassmorphism styled card
const StyledCard = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px !important;
  background: ${({ gradient }) => gradient};
  backdrop-filter: blur(10px);
  color: #333;
  box-shadow: 0px 8px 25px rgba(0,0,0,0.15);
  animation: ${fadeInUp} 0.6s ease forwards;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 15px 35px rgba(0,0,0,0.25);
  }
`;

// Icons inside cards
const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
`;

// Title text
const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 5px 0;
`;

// Animated counter
const Data = styled(CountUp)`
  font-size: 2rem;
  font-weight: bold;
  color: rgba(0,0,0,0.8);
`;

export default StudentHomePage
