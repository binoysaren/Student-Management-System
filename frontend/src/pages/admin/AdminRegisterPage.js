import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../redux/userRelated/userHandle"; // ✅ corrected path
import styled from "styled-components";
import Popup from "../../components/Popup"; // ✅ corrected path

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const role = "Admin";

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role, schoolName };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "adminName") setAdminNameError(false);
    if (name === "schoolName") setSchoolNameError(false);
  };

  useEffect(() => {
    if (status === "success" || (currentUser !== null && currentRole === "Admin")) {
      navigate("/Admin/dashboard");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          p: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            maxWidth: 450,
            width: "100%",
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.95)",
            textAlign: "center",
          }}
        >
          {/* Heading */}
          <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold", color: "#2c2143" }}>
            Admin Register
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
            Create your school admin account to get started 🚀
          </Typography>

          {/* Form */}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="adminName"
              label="Your Name"
              name="adminName"
              autoComplete="name"
              autoFocus
              error={adminNameError}
              helperText={adminNameError && "Name is required"}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="schoolName"
              label="School Name"
              name="schoolName"
              autoComplete="off"
              error={schoolNameError}
              helperText={schoolNameError && "School name is required"}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailError}
              helperText={emailError && "Email is required"}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError && "Password is required"}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setToggle(!toggle)}>
                      {toggle ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Grid
              container
              sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 2 }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>

            {/* Register Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 2,
                background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              }}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>

            {/* Guest / Login Links */}
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2, py: 1.2, borderRadius: 2, fontWeight: "bold" }}
            >
              Continue as Guest
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account? <StyledLink to="/Adminlogin">Log in</StyledLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4a47a3;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
