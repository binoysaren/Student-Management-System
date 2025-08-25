import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled, { keyframes } from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        if (subjectID) dispatch(getSubjectDetails(subjectID, "Subject"));
        if (classID) dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <DashboardWrapper>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg,#ff9a9e,#fad0c4)">
                            <Icon src={Students} alt="Students" />
                            <Title>Class Students</Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg,#a1c4fd,#c2e9fb)">
                            <Icon src={Lessons} alt="Lessons" />
                            <Title>Total Lessons</Title>
                            <Data start={0} end={numberOfSessions} duration={5} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg,#d4fc79,#96e6a1)">
                            <Icon src={Tests} alt="Tests" />
                            <Title>Tests Taken</Title>
                            <Data start={0} end={24} duration={4} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg,#fddb92,#d1fdff)">
                            <Icon src={Time} alt="Time" />
                            <Title>Total Hours</Title>
                            <Data start={0} end={30} duration={4} suffix=" hrs" />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12}>
                        <NoticeCard>
                            <SeeNotice />
                        </NoticeCard>
                    </Grid>
                </Grid>
            </Container>
        </DashboardWrapper>
    )
};

// --- Styles ---

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  padding-top: 20px;
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const StyledCard = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 200px;
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
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0px 15px 35px rgba(0,0,0,0.25);
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 5px 0;
`;

const Data = styled(CountUp)`
  font-size: 2rem;
  font-weight: bold;
  color: rgba(0,0,0,0.8);
`;

const NoticeCard = styled(Paper)`
  padding: 20px;
  border-radius: 20px !important;
  box-shadow: 0px 6px 25px rgba(0,0,0,0.1);
`;

export default TeacherHomePage;
