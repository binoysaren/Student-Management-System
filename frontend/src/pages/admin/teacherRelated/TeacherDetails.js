import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import { School, Book, Person } from '@mui/icons-material';

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };

  return (
    <Container sx={{ mt: 5 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{
            maxWidth: 600,
            mx: 'auto',
            borderRadius: 3,
            boxShadow: '0px 6px 20px rgba(0,0,0,0.15)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
              Teacher Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box display="flex" alignItems="center" mb={2}>
              <Person sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">
                Name: <span style={{ fontWeight: 500 }}>{teacherDetails?.name}</span>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <School sx={{ mr: 2, color: 'secondary.main' }} />
              <Typography variant="h6">
                Class: <span style={{ fontWeight: 500 }}>{teacherDetails?.teachSclass?.sclassName}</span>
              </Typography>
            </Box>

            {isSubjectNamePresent ? (
              <Box
                sx={{
                  bgcolor: '#f5f5f5',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 'inset 0px 2px 6px rgba(0,0,0,0.05)',
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <Book sx={{ mr: 2, color: 'success.main' }} />
                  <Typography variant="h6">
                    Subject: <span style={{ fontWeight: 500 }}>{teacherDetails?.teachSubject?.subName}</span>
                  </Typography>
                </Box>
                <Typography variant="h6">
                  Sessions: <span style={{ fontWeight: 500 }}>{teacherDetails?.teachSubject?.sessions}</span>
                </Typography>
              </Box>
            ) : (
              <Box textAlign="center" mt={3}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #1976d2, #2196f3)',
                    borderRadius: 2,
                    px: 4,
                    py: 1,
                    fontWeight: 'bold',
                    boxShadow: '0px 4px 12px rgba(25,118,210,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                  onClick={handleAddSubject}
                >
                  + Add Subject
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default TeacherDetails;
