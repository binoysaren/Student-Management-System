import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableHead, 
  Typography,
  Box,
  CircularProgress,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import { styled } from '@mui/material/styles';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SchoolIcon from '@mui/icons-material/School';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

// Styled components (purely visual enhancements)
const AnimatedContainer = styled(Container)({
  padding: '24px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  marginBottom: '32px',
  transition: 'all 0.3s ease',
});

const SubjectCard = styled(Paper)({
  padding: '16px',
  margin: '8px 0',
  backgroundColor: '#e3f2fd',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    backgroundColor: '#bbdefb',
  },
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks === []) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <Grow in={true} timeout={500}>
              <AnimatedContainer maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom style={{ 
                  color: '#1976d2',
                  fontWeight: '600',
                  marginBottom: '24px'
                }}>
                  Subject Marks
                </Typography>
                <Table style={{ minWidth: 650 }}>
                    <TableHead>
                        <StyledTableRow style={{ backgroundColor: '#1976d2' }}>
                            <StyledTableCell style={{ fontWeight: 'bold', color: 'white' }}>Subject</StyledTableCell>
                            <StyledTableCell style={{ fontWeight: 'bold', color: 'white' }}>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <Slide key={index} direction="up" in={true} timeout={(index + 1) * 100}>
                                  <StyledTableRow style={{ 
                                    '&:nth-of-type(odd)': {
                                      backgroundColor: '#f5f5f5',
                                    },
                                    '&:hover': {
                                      backgroundColor: '#e0e0e0',
                                    }
                                  }}>
                                      <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                      <StyledTableCell style={{ 
                                        fontWeight: 'bold',
                                        color: result.marksObtained >= 50 ? '#2e7d32' : '#d32f2f'
                                      }}>
                                        {result.marksObtained}
                                      </StyledTableCell>
                                  </StyledTableRow>
                                </Slide>
                            );
                        })}
                    </TableBody>
                </Table>
              </AnimatedContainer>
            </Grow>
        );
    };

    const renderChartSection = () => {
        return (
          <Fade in={true} timeout={500}>
            <AnimatedContainer maxWidth="lg">
              <Typography variant="h4" align="center" gutterBottom style={{ 
                color: '#1976d2',
                fontWeight: '600',
                marginBottom: '24px'
              }}>
                Performance Overview
              </Typography>
              <Box style={{ 
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
              </Box>
            </AnimatedContainer>
          </Fade>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <Grow in={true} timeout={500}>
              <AnimatedContainer maxWidth="sm">
                <Box style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  gap: '8px'
                }}>
                  <SchoolIcon style={{ 
                    fontSize: '40px',
                    color: '#1976d2'
                  }} />
                  <Typography variant="h4" align="center" gutterBottom style={{ 
                    color: '#1976d2',
                    fontWeight: '600'
                  }}>
                    Class Details
                  </Typography>
                </Box>
                
                <SubjectCard elevation={3}>
                  <Typography variant="h5" gutterBottom>
                    You are currently in Class {sclassDetails && sclassDetails.sclassName}
                  </Typography>
                </SubjectCard>
                
                <Typography variant="h6" gutterBottom style={{ 
                  marginTop: '16px',
                  marginBottom: '8px',
                  color: '#616161'
                }}>
                  And these are your subjects:
                </Typography>
                
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <Fade key={index} in={true} timeout={(index + 1) * 150}>
                          <SubjectCard elevation={2}>
                            <Typography variant="subtitle1" style={{ fontWeight: '500' }}>
                              {subject.subName} ({subject.subCode})
                            </Typography>
                          </SubjectCard>
                        </Fade>
                    ))}
              </AnimatedContainer>
            </Grow>
        );
    };

    return (
        <>
            {loading ? (
                <LoadingContainer>
                  <CircularProgress size={60} thickness={5} style={{ color: '#1976d2' }} />
                </LoadingContainer>
            ) : (
                <Box style={{ paddingBottom: '56px' }}>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ? (
                            <>
                                {selectedSection === 'table' && renderTableSection()}
                                {selectedSection === 'chart' && renderChartSection()}

                                <Paper style={{ 
                                  position: 'fixed', 
                                  bottom: 0, 
                                  left: 0, 
                                  right: 0,
                                  borderTopLeftRadius: '12px',
                                  borderTopRightRadius: '12px',
                                  overflow: 'hidden'
                                }} elevation={3}>
                                    <BottomNavigation 
                                      value={selectedSection} 
                                      onChange={handleSectionChange} 
                                      showLabels
                                      style={{
                                        backgroundColor: '#1976d2',
                                      }}
                                    >
                                        <BottomNavigationAction
                                            label="Table View"
                                            value="table"
                                            icon={selectedSection === 'table' ? 
                                              <TableChartIcon style={{ fontSize: 30 }} /> : 
                                              <TableChartOutlinedIcon style={{ fontSize: 30 }} />}
                                            style={{ 
                                              color: selectedSection === 'table' ? '#bbdefb' : 'white',
                                              minWidth: 'auto',
                                              padding: '6px 12px'
                                            }}
                                        />
                                        <BottomNavigationAction
                                            label="Chart View"
                                            value="chart"
                                            icon={selectedSection === 'chart' ? 
                                              <InsertChartIcon style={{ fontSize: 30 }} /> : 
                                              <InsertChartOutlinedIcon style={{ fontSize: 30 }} />}
                                            style={{ 
                                              color: selectedSection === 'chart' ? '#bbdefb' : 'white',
                                              minWidth: 'auto',
                                              padding: '6px 12px'
                                            }}
                                        />
                                    </BottomNavigation>
                                </Paper>
                            </>
                        ) : (
                            <>{renderClassDetailsSection()}</>
                        )
                    }
                </Box>
            )}
        </>
    );
};

export default StudentSubjects;