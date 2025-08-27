import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser?._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = Array.isArray(complainsList)
    ? complainsList.map((complain) => {
        if (!complain) {
          return {
            user: "Unknown",
            complaint: "No complaint",
            date: "Invalid Date",
            id: Math.random().toString(36).substr(2, 9), // fallback id
          };
        }

        const date = new Date(complain.date);
        const dateString =
          date.toString() !== "Invalid Date"
            ? date.toISOString().substring(0, 10)
            : "Invalid Date";

        return {
          user: complain.user && complain.user.name ? complain.user.name : "Unknown",
          complaint: complain.complaint || "No complaint",
          date: dateString,
          id: complain._id || Math.random().toString(36).substr(2, 9),
        };
      })
    : [];

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox {...label} />
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              No Complains Right Now
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {complainRows.length > 0 && (
                <TableTemplate
                  buttonHaver={ComplainButtonHaver}
                  columns={complainColumns}
                  rows={complainRows}
                />
              )}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default SeeComplains;
