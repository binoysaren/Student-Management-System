import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Divider, Fade } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const ShowAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/assignments`);
      setAssignments(res.data);
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
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
        <AssignmentIcon fontSize="large" /> Assignment Notices
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Empty State */}
      {assignments.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mt: 5,
            fontStyle: 'italic',
          }}
        >
          No assignments available.
        </Typography>
      ) : (
        assignments.map((assignment, index) => (
          <Fade in={true} timeout={500 + index * 200} key={assignment._id}>
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
              {/* Title */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {assignment.title}
              </Typography>

              {/* Uploaded Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Chip
                  icon={<PersonIcon />}
                  label={`Uploaded by: ${assignment.role}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">
                  {new Date(assignment.createdAt).toLocaleString()}
                </Typography>
              </Box>

              {/* Description */}
              <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.6 }}>
                {assignment.description}
              </Typography>
            </Paper>
          </Fade>
        ))
      )}
    </Box>
  );
};

export default ShowAssignments;
