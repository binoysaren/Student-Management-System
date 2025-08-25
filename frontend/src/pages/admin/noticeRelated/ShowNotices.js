import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper,
    Box,
    IconButton,
    Typography,
    CircularProgress,
    Stack
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) console.log(error);

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        });
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList?.length > 0
        ? noticesList.map((notice) => {
            const date = new Date(notice.date);
            const dateString = date.toString() !== "Invalid Date"
                ? date.toISOString().substring(0, 10)
                : "Invalid Date";
            return {
                title: notice.title,
                details: notice.details,
                date: dateString,
                id: notice._id,
            };
        })
        : [];

    const NoticeButtonHaver = ({ row }) => (
        <IconButton
            onClick={() => deleteHandler(row.id, "Notice")}
            sx={{
                '&:hover': {
                    backgroundColor: '#ffe5e5',
                }
            }}
        >
            <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
    );

    const actions = [
        {
            icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices")
        }
    ];

    return (
        <Box sx={{ p: 3, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
            {loading ? (
                <Stack alignItems="center" justifyContent="center" sx={{ height: '60vh' }}>
                    <CircularProgress size={50} />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Loading Notices...
                    </Typography>
                </Stack>
            ) : (
                <Paper
                    sx={{
                        p: 3,
                        maxWidth: 1200,
                        margin: 'auto',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold" color="primary">
                            📢 School Notices
                        </Typography>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addnotice")}
                            startIcon={<NoteAddIcon />}
                        >
                            Add Notice
                        </GreenButton>
                    </Box>

                    {Array.isArray(noticesList) && noticesList.length > 0 ? (
                        <TableTemplate
                            buttonHaver={NoticeButtonHaver}
                            columns={noticeColumns}
                            rows={noticeRows}
                        />
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                color: 'text.secondary',
                                py: 5
                            }}
                        >
                            No notices available yet.
                        </Typography>
                    )}

                    <SpeedDialTemplate actions={actions} />
                </Paper>
            )}
        </Box>
    );
};

export default ShowNotices;
