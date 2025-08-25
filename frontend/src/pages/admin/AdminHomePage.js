import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled, { keyframes } from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    return (
        <DashboardWrapper>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg, #ff9a9e, #fad0c4)">
                            <Icon src={Students} alt="Students" />
                            <Title>Total Students</Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg, #a1c4fd, #c2e9fb)">
                            <Icon src={Classes} alt="Classes" />
                            <Title>Total Classes</Title>
                            <Data start={0} end={numberOfClasses} duration={2.5} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg, #d4fc79, #96e6a1)">
                            <Icon src={Teachers} alt="Teachers" />
                            <Title>Total Teachers</Title>
                            <Data start={0} end={numberOfTeachers} duration={2.5} />
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StyledCard gradient="linear-gradient(135deg, #fddb92, #d1fdff)">
                            <Icon src={Fees} alt="Fees" />
                            <Title>Fees Collection</Title>
                            <Data start={0} end={10000} duration={2.5} prefix="₹" />
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
    );
};

// Background for the page
const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
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

export default AdminHomePage;
