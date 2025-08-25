import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { AssignmentTurnedIn } from "@mui/icons-material";

const AdminTeacherAssignmentForm = () => {
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    uploadedBy: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/assignments/create",
        assignment
      );
      alert("✅ Assignment created successfully!");
      setAssignment({ title: "", description: "", uploadedBy: "", role: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 650,
          borderRadius: 4,
          p: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          transition: "0.3s",
          "&:hover": { boxShadow: "0 12px 32px rgba(0,0,0,0.2)" },
        }}
      >
        <CardContent>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <AssignmentTurnedIn color="primary" fontSize="large" />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              📘 Create Assignment
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Assignment Title"
              name="title"
              fullWidth
              margin="normal"
              value={assignment.title}
              onChange={handleChange}
              required
              sx={{ borderRadius: 2 }}
            />

            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={5}
              value={assignment.description}
              onChange={handleChange}
              required
              sx={{ borderRadius: 2 }}
            />

            <TextField
              label="Your Name"
              name="uploadedBy"
              fullWidth
              margin="normal"
              value={assignment.uploadedBy}
              onChange={handleChange}
              required
              sx={{ borderRadius: 2 }}
            />

            <TextField
              label="Role"
              name="role"
              select
              fullWidth
              margin="normal"
              value={assignment.role}
              onChange={handleChange}
              required
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </TextField>

            {/* Submit Button */}
            <Box textAlign="center" mt={4}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(135deg, #1976d2, #42a5f5)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1565c0, #1e88e5)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={26} sx={{ color: "white" }} />
                ) : (
                  "Submit Assignment"
                )}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminTeacherAssignmentForm;
