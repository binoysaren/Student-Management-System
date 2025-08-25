import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const ShowAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/assignments`);
      console.log("Assignments fetched:", res.data);
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
      <Typography variant="h5" gutterBottom>
        Assignment Notices
      </Typography>
      {assignments.length === 0 ? (
        <Typography>No assignments available yet.</Typography>
      ) : (
        assignments.map((assignment) => (
          <Paper key={assignment._id} sx={{ p: 2, mb: 2, position: 'relative' }}>
            <Typography variant="h6">{assignment.title}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Uploaded by: {assignment.role} — {new Date(assignment.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1">{assignment.description}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default ShowAssignments;
