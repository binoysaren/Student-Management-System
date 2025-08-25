import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import Popup from "../../components/Popup";
import { BlueButton } from "../../components/buttonStyles";
import { addStuff } from "../../redux/userRelated/userHandle";
import { useDispatch, useSelector } from "react-redux";

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const { status, currentUser, error } = useSelector((state) => state.user);

  const user = currentUser._id;
  const school = currentUser.school._id;
  const address = "Complain";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    user,
    date,
    complaint,
    school,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("✅ Complaint Submitted Successfully!");
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("❌ Network Error, Try Again!");
    }
  }, [status, error]);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
          p: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: "20px",
            p: 4,
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.1), 0 0 40px rgba(102,166,255,0.3)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              p: 2,
              borderRadius: "12px",
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              color: "white",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Submit Complaint
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              We value your feedback, share your concerns ✨
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Select Date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                fullWidth
                label="Write your complaint"
                variant="outlined"
                value={complaint}
                onChange={(event) => setComplaint(event.target.value)}
                required
                multiline
                minRows={4}
              />

              <BlueButton
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: "12px",
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.02)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  },
                }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  "Submit Complaint"
                )}
              </BlueButton>
            </Stack>
          </form>
        </Paper>
      </Box>

      {/* Popup */}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default StudentComplain;
