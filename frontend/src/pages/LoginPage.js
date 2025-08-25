import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Grid, Box, Typography, Paper,
  TextField, CssBaseline, IconButton, InputAdornment,
  CircularProgress, Backdrop, Divider
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../components/GoogleLogo'; // ✅ custom colorful logo

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;
      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      dispatch(loginUser({ rollNum, studentName, password }, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;
      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      dispatch(loginUser({ email, password }, role));
    }
    setLoader(true);
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  // Google OAuth Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        console.log('Google login successful:', tokenResponse);
        setTimeout(() => {
          setGoogleLoading(false);
          navigate(`/${role.toLowerCase()}/dashboard`);
        }, 1500);
      } catch (error) {
        console.error('Google login error:', error);
        setMessage("Google login failed. Please try again.");
        setShowPopup(true);
        setGoogleLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      setMessage("Google login failed. Please try again.");
      setShowPopup(true);
    },
  });

  useEffect(() => {
    if (status === 'success' || currentUser) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={10}
          sx={{
            borderRadius: 4,
            padding: 5,
            maxWidth: 420,
            background: "white",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)"
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                color: "#2c2143",
                fontWeight: "bold",
                letterSpacing: "0.5px"
              }}
            >
              {role} Login
            </Typography>
            <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
              Welcome back! Please enter your details
            </Typography>

            {/* Google Sign-In Button */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => googleLogin()}
              startIcon={googleLoading ? <CircularProgress size={16} /> : <GoogleLogo size={20} />}
              disabled={googleLoading}
              sx={{
                mb: 3,
                py: 1.3,
                borderRadius: 2,
                backgroundColor: googleLoading ? 'rgba(0, 0, 0, 0.04)' : '#fff',
                color: '#555',
                borderColor: '#ddd',
                fontWeight: 600,
                textTransform: "none",
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                  borderColor: '#ccc'
                }
              }}
            >
              {googleLoading ? (
                'Signing in with Google...'
              ) : (
                <span style={{ color: "#4285F4", fontWeight: "bold" }}>
                  Sign in with Google
                </span>
              )}
            </Button>

            <Divider sx={{ width: '100%', mb: 3 }}>OR</Divider>

            {/* Login Form */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
              {role === "Student" ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="rollNumber"
                    label="Roll Number"
                    name="rollNumber"
                    type="number"
                    error={rollNumberError}
                    helperText={rollNumberError && 'Roll Number is required'}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="studentName"
                    label="Name"
                    name="studentName"
                    error={studentNameError}
                    helperText={studentNameError && 'Name is required'}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  error={emailError}
                  helperText={emailError && 'Email is required'}
                  onChange={handleInputChange}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
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

              <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
                <StyledLink to="/forgot-password">Forgot password?</StyledLink>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  borderRadius: 2,
                  fontSize: "1rem",
                  background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  '&:hover': {
                    background: "linear-gradient(to right, #5a0fbf, #1f65e0)"
                  }
                }}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>

              {role === "Admin" && (
                <Grid container justifyContent="center" sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Don&apos;t have an account?
                  </Typography>
                  <StyledLink to="/Adminregister" style={{ marginLeft: 5 }}>
                    Sign up
                  </StyledLink>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Loading Backdrop */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={googleLoading}>
        <CircularProgress color="primary" />
        &nbsp;Signing in with Google...
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #2575fc;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;
