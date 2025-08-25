import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Assignment, Person, CalendarToday } from "@mui/icons-material";

const ShowAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/assignments`
        );
        const teacherAssignments = res.data.filter(
          (assignment) => assignment.role === "Teacher"
        );
        setAssignments(teacherAssignments);
      } catch (err) {
        console.error("Failed to fetch teacher assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        📘 Teacher Assignments
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : assignments.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          No assignments found.
        </Typography>
      ) : (
        assignments.map((assignment) => (
          <Card
            key={assignment._id}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { boxShadow: 8, transform: "scale(1.01)" },
            }}
          >
            <CardContent>
              {/* Title */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Assignment color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {assignment.title}
                </Typography>
              </Box>

              {/* Description */}
              <Typography variant="body2" color="text.secondary" mb={2}>
                {assignment.description}
              </Typography>

              <Divider sx={{ my: 1 }} />

              {/* Footer: Uploaded By + Date */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Person fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {assignment.uploadedBy} ({assignment.role})
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(assignment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              {/* Optional Subject Tag */}
              {assignment.subject && (
                <Chip
                  label={assignment.subject?.name || "Unknown Subject"}
                  color="secondary"
                  size="small"
                  sx={{ mt: 2 }}
                />
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ShowAssignments;
