import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Alert } from '@mui/material';
import axios from 'axios';

const UploadAssignment = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !assignmentTitle || !studentName) {
      return setMessage('❗ Please fill all fields and choose a file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentTitle', assignmentTitle);
    formData.append('studentName', studentName);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/submissions/upload`, formData);
      setMessage('✅ File uploaded successfully!');
      setFile(null);
      setAssignmentTitle('');
      setStudentName('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Upload failed. Try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload Assignment (PDF/DOC)
      </Typography>

      <form onSubmit={handleUpload}>
        <TextField
          label="Assignment Title"
          fullWidth
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Your Name"
          fullWidth
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ marginTop: '10px' }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Upload
        </Button>
      </form>

      {message && (
        <Alert severity={message.includes('✅') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default UploadAssignment;
