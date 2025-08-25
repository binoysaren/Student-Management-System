import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject
} from '../../components/attendanceCalculator';

import CustomBarChart from '../../components/CustomBarChart';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const ViewStdAttendance = () => {
  const dispatch = useDispatch();
  const [openStates, setOpenStates] = useState({});
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [selectedSection, setSelectedSection] = useState('table');

  const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  if (response) console.log(response);
  else if (error) console.log(error);

  const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

  const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
    return {
      subject: subName,
      attendancePercentage: subjectAttendancePercentage,
      totalClasses: sessions,
      attendedClasses: present
    };
  });

  const handleOpen = (subId) => {
    setOpenStates((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: "#4a148c" }}>
        📘 Attendance Records
      </Typography>

      <Card sx={{ p: 2, boxShadow: 5, borderRadius: 3, background: "linear-gradient(135deg,#ede7f6,#f3e5f5)" }}>
        <CardContent>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Present</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell>Percentage</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
              const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
              return (
                <TableBody key={index}>
                  <StyledTableRow>
                    <StyledTableCell>{subName}</StyledTableCell>
                    <StyledTableCell>{present}</StyledTableCell>
                    <StyledTableCell>{sessions}</StyledTableCell>
                    <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ borderRadius: 3, textTransform: "none" }}
                        onClick={() => handleOpen(subId)}
                      >
                        {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>

                  {/* Expandable details */}
                  <StyledTableRow>
                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Attendance Details
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              {allData.map((data, idx) => {
                                const date = new Date(data.date);
                                const dateString =
                                  date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                return (
                                  <StyledTableRow key={idx}>
                                    <StyledTableCell>{dateString}</StyledTableCell>
                                    <StyledTableCell align="right">{data.status}</StyledTableCell>
                                  </StyledTableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              );
            })}
          </Table>
        </CardContent>
      </Card>

      {/* Overall attendance summary */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={overallAttendancePercentage}
            size={100}
            thickness={5}
            sx={{ color: overallAttendancePercentage >= 75 ? "#4caf50" : "#f44336" }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            {overallAttendancePercentage.toFixed(1)}%
          </Box>
        </Box>
      </Box>
    </motion.div>
  );

  const renderChartSection = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: "#2e7d32" }}>
        📊 Attendance Chart
      </Typography>
      <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
    </motion.div>
  );

  return (
    <>
      {loading ? (
        <Typography align="center" sx={{ mt: 5, fontWeight: 600, color: "#6a1b9a" }}>
          Loading...
        </Typography>
      ) : (
        <Box sx={{ pb: 8, background: "linear-gradient(180deg,#f3e5f5,#ede7f6)", minHeight: "100vh", px: 2 }}>
          {subjectAttendance && subjectAttendance.length > 0 ? (
            <>
              {selectedSection === 'table' && renderTableSection()}
              {selectedSection === 'chart' && renderChartSection()}

              {/* Floating bottom navigation */}
              <Paper
                sx={{
                  position: 'fixed',
                  bottom: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: 3,
                  width: "90%",
                  maxWidth: 480,
                  boxShadow: 5,
                  background: "linear-gradient(90deg,#ba68c8,#9575cd)"
                }}
                elevation={6}
              >
                <BottomNavigation
                  value={selectedSection}
                  onChange={handleSectionChange}
                  showLabels
                  sx={{ borderRadius: 3 }}
                >
                  <BottomNavigationAction
                    label="Table"
                    value="table"
                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                  />
                  <BottomNavigationAction
                    label="Chart"
                    value="chart"
                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                  />
                </BottomNavigation>
              </Paper>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginTop: "3rem" }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#d32f2f" }}>
                Currently You Have No Attendance Details 📌
              </Typography>
            </motion.div>
          )}
        </Box>
      )}
    </>
  );
};

export default ViewStdAttendance;
