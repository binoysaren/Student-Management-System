import React, { useEffect, useState } from "react";
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
import { CloudUpload } from "@mui/icons-material";

const StudentAssignmentSubmit = () => {
  const [assignments, setAssignments] = useState([]);
  const [assignmentId, setAssignmentId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assignments")
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("⚠️ Please upload a document");

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("studentId", studentId);
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/submissions/upload",
        formData
      );
      alert("✅ Assignment submitted successfully!");
      setAssignmentId("");
      setStudentId("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit assignment.");
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
        background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
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
            <CloudUpload color="secondary" fontSize="large" />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#6a1b9a" }}
            >
              📤 Submit Assignment
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Assignment Dropdown */}
            <TextField
              label="Select Assignment"
              select
              fullWidth
              margin="normal"
              value={assignmentId}
              onChange={(e) => setAssignmentId(e.target.value)}
              required
            >
              <MenuItem value="">-- Choose Assignment --</MenuItem>
              {assignments.map((a) => (
                <MenuItem key={a._id} value={a._id}>
                  {a.title}
                </MenuItem>
              ))}
            </TextField>

            {/* Student ID */}
            <TextField
              label="Your Student ID"
              fullWidth
              margin="normal"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />

            {/* File Upload */}
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                borderColor: "#9c27b0",
                color: "#6a1b9a",
                fontWeight: "bold",
                "&:hover": { borderColor: "#6a1b9a", background: "#f3e5f5" },
              }}
            >
              {file ? file.name : "Upload File (.pdf, .doc, .docx)"}
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

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
                    "linear-gradient(135deg, #8e24aa, #ab47bc)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #6a1b9a, #8e24aa)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={26} sx={{ color: "white" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentAssignmentSubmit;
