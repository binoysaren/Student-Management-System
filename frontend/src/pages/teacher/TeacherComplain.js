import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

const TeacherComplain = () => {
  const [complain, setComplain] = useState("");
  const [complains, setComplains] = useState([
    { id: 1, text: "Projector not working in classroom." },
    { id: 2, text: "Whiteboard markers are finished." },
  ]);

  const handleSubmit = () => {
    if (complain.trim() !== "") {
      setComplains([...complains, { id: complains.length + 1, text: complain }]);
      setComplain("");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        bgcolor: "#f4f6f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1976d2" }}>
        Teacher Complaints
      </Typography>

      {/* Complaint Form */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: "600px",
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Submit a Complaint
        </Typography>
        <TextField
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          placeholder="Write your complaint here..."
          value={complain}
          onChange={(e) => setComplain(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: 2, py: 1.2, fontWeight: "bold" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>

      {/* Complaints List */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: "600px",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Previous Complaints
        </Typography>
        <List>
          {complains.map((c) => (
            <React.Fragment key={c.id}>
              <Card
                elevation={1}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: "#fff",
                }}
              >
                <CardContent>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={c.text}
                      primaryTypographyProps={{
                        style: { fontSize: "16px", fontWeight: 500 },
                      }}
                    />
                  </ListItem>
                </CardContent>
              </Card>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TeacherComplain;
