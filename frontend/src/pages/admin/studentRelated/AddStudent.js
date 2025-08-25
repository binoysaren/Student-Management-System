import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Fade
} from '@mui/material';

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector(state => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');

  const adminID = currentUser._id;
  const role = "Student";
  const attendance = [];

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const changeHandler = (event) => {
    if (event.target.value === 'Select Class') {
      setClassName('Select Class');
      setSclassName('');
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === "") {
      setMessage("Please select a classname");
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate(-1);
    }
    else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    }
    else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        padding: 2
      }}
    >
      <Fade in timeout={800}>
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            backdropFilter: "blur(15px)",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
              sx={{
                color: "#222", // Dark text for title
              }}
            >
              Add Student
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{
                  sx: {
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.85)",
                    color: "#222",
                    fontWeight: 500
                  }
                }}
                InputLabelProps={{
                  style: { color: "#444", fontWeight: 500 }
                }}
              />

              {situation === "Student" && (
                <FormControl fullWidth margin="normal">
                  <InputLabel sx={{ color: "#444", fontWeight: 500 }}>Class</InputLabel>
                  <Select
                    value={className}
                    onChange={changeHandler}
                    required
                    sx={{
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.85)",
                      color: "#222",
                      fontWeight: 500
                    }}
                  >
                    <MenuItem value="Select Class">Select Class</MenuItem>
                    {sclassesList.map((classItem, index) => (
                      <MenuItem key={index} value={classItem.sclassName}>
                        {classItem.sclassName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <TextField
                label="Roll Number"
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                value={rollNum}
                onChange={(e) => setRollNum(e.target.value)}
                required
                InputProps={{
                  sx: {
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.85)",
                    color: "#222",
                    fontWeight: 500
                  }
                }}
                InputLabelProps={{
                  style: { color: "#444", fontWeight: 500 }
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  sx: {
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.85)",
                    color: "#222",
                    fontWeight: 500
                  }
                }}
                InputLabelProps={{
                  style: { color: "#444", fontWeight: 500 }
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #ff5f7e, #ff6ba1)"
                  }
                }}
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Add Student"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Fade>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddStudent;
