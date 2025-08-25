import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { AssignmentTurnedIn } from "@mui/icons-material";
import axios from "axios";

const UploadAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.userInfo); // Get logged-in user info

  const handleUpload = async () => {
    if (!title || !description) {
      return alert("Please fill in all fields.");
    }

    if (!user || !user._id || !user.role) {
      return alert("User information missing. Cannot upload.");
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/assignments`, {
        title,
        description,
        role: user.role, // "Admin" or "Teacher"
        uploadedBy: user._id, // backend expects an identifier
      });

      alert("✅ Assignment uploaded successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, px: 2 }}>
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 5,
          transition: "0.3s",
          "&:hover": { boxShadow: 8 },
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <AssignmentTurnedIn color="primary" fontSize="large" />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Upload Assignment
            </Typography>
          </Box>

          <TextField
            label="Assignment Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Box textAlign="right" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={loading}
              sx={{ px: 4, py: 1.2, borderRadius: 2, fontWeight: "bold" }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Submit Assignment"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadAssignment;
