// src/pages/assignmentRelated/ShowSubmissions.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Chip,
  Fade
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const ShowSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/submissions/all`);
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions", err);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <AssignmentTurnedInIcon fontSize="large" /> Assignment Submissions
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Empty State */}
      {submissions.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mt: 5,
            fontStyle: 'italic',
          }}
        >
          No submissions yet.
        </Typography>
      ) : (
        submissions.map((submission, index) => (
          <Fade in={true} timeout={500 + index * 200} key={submission._id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Assignment Title */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {submission.assignmentTitle}
              </Typography>

              {/* Student Name */}
              <Chip
                icon={<PersonIcon />}
                label={`Submitted by: ${submission.studentName}`}
                color="primary"
                variant="outlined"
                sx={{ mb: 1, mr: 1 }}
              />

              {/* Submission Time */}
              <Chip
                icon={<AccessTimeIcon />}
                label={
                  submission.submittedAt
                    ? new Date(submission.submittedAt).toLocaleString()
                    : 'N/A'
                }
                color="secondary"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              {/* File Button */}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<FilePresentIcon />}
                  href={`${process.env.REACT_APP_BASE_URL}/uploads/${submission.filePath.split('/').pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  View Submitted File
                </Button>
              </Box>
            </Paper>
          </Fade>
        ))
      )}
    </Box>
  );
};

export default ShowSubmissions;
