import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  Divider,
  Fade
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import ClassIcon from "@mui/icons-material/Class";

const AddClass = () => {
  const [sclassName, setSclassName] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, tempDetails } = useSelector(
    (state) => state.user
  );

  const adminID = currentUser?._id;
  const address = "Sclass";
  const fields = { sclassName: sclassName.trim(), adminID };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!sclassName.trim()) {
      setMessage("Class name cannot be empty.");
      setShowPopup(true);
      return;
    }

    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added" && tempDetails) {
      navigate(`/Admin/classes/class/${tempDetails._id}`);
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed") {
      setMessage(response || "Failed to create class.");
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error" || error) {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, tempDetails, response, error, dispatch, navigate]);

  return (
    <>
      <StyledContainer>
        <Fade in timeout={500}>
          <StyledBox>
            <Stack sx={{ alignItems: "center", mb: 2 }}>
              <img
                src={Classroom}
                alt="Classroom"
                style={{ width: "70%", borderRadius: "8px" }}
              />
            </Stack>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 2
              }}
            >
              <ClassIcon /> Create a New Class
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  label="Class Name"
                  variant="outlined"
                  value={sclassName}
                  onChange={(event) => setSclassName(event.target.value)}
                  required
                  fullWidth
                  inputProps={{ maxLength: 50 }}
                  helperText={`${sclassName.length}/50`}
                />

                <BlueButton
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={loader}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    py: 1.2,
                    fontSize: "1rem"
                  }}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create Class"
                  )}
                </BlueButton>

                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold"
                  }}
                >
                  Go Back
                </Button>
              </Stack>
            </form>
          </StyledBox>
        </Fade>
      </StyledContainer>

      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddClass;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #eef2f3 0%, #dfe9f3 100%);
  min-height: 100vh;
  padding: 1rem;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  width: 100%;
  padding: 40px 3rem;
  background-color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;
