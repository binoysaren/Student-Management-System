// src/pages/assignmentRelated/ShowSubmissions.js

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Person, CalendarToday, Description } from "@mui/icons-material";

const ShowSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/submissions/all`
        );
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        📥 Assignment Submissions
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : submissions.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          No submissions yet.
        </Typography>
      ) : (
        submissions.map((submission) => (
          <Card
            key={submission._id}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { boxShadow: 8, transform: "scale(1.01)" },
            }}
          >
            <CardContent>
              {/* Assignment Title */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Description color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {submission.assignmentTitle}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Submitted By */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Person fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {submission.studentName}
                </Typography>
              </Box>

              {/* Submitted At */}
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CalendarToday fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {submission.submittedAt
                    ? new Date(submission.submittedAt).toLocaleString()
                    : "N/A"}
                </Typography>
              </Box>

              {/* View File Button */}
              <Button
                variant="contained"
                color="secondary"
                size="small"
                href={`${process.env.REACT_APP_BASE_URL}/uploads/${submission.filePath.split("/").pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: 2, fontWeight: "bold" }}
              >
                View File
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ShowSubmissions;
