import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton, Paper, CircularProgress
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);
    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) console.error(error);

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => setValue(newValue);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    // Table Column Config
    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ];
    const subjectRows = subjectsList?.map((subject) => ({
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
    }));

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];
    const studentRows = sclassStudents?.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    // Table Buttons
    const SubjectsButtonHaver = ({ row }) => (
        <>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
            >
                View
            </BlueButton>
        </>
    );

    const StudentsButtonHaver = ({ row }) => (
        <>
            <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                <PersonRemoveIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate(`/Admin/students/student/${row.id}`)}
            >
                View
            </BlueButton>
            <PurpleButton
                variant="contained"
                onClick={() => navigate(`/Admin/students/student/attendance/${row.id}`)}
            >
                Attendance
            </PurpleButton>
        </>
    );

    // Speed Dial Actions
    const subjectActions = [
        { icon: <PostAddIcon color="primary" />, name: 'Add New Subject', action: () => navigate(`/Admin/addsubject/${classID}`) },
        { icon: <DeleteIcon color="error" />, name: 'Delete All Subjects', action: () => deleteHandler(classID, "SubjectsClass") }
    ];

    const studentActions = [
        { icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student', action: () => navigate(`/Admin/class/addstudents/${classID}`) },
        { icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students', action: () => deleteHandler(classID, "StudentsClass") }
    ];

    // Section Components
    const ClassDetailsSection = () => (
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: "#f8f9fa" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Class Details
            </Typography>
            <Typography variant="h6" gutterBottom>
                Class Name: <b>{sclassDetails?.sclassName}</b>
            </Typography>
            <Typography variant="h6">Subjects: {subjectsList.length}</Typography>
            <Typography variant="h6" gutterBottom>Students: {sclassStudents.length}</Typography>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                {getresponse && (
                    <GreenButton variant="contained" onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}>
                        Add Students
                    </GreenButton>
                )}
                {response && (
                    <GreenButton variant="contained" onClick={() => navigate(`/Admin/addsubject/${classID}`)}>
                        Add Subjects
                    </GreenButton>
                )}
            </Box>
        </Paper>
    );

    const ClassSubjectsSection = () => (
        <>
            <Typography variant="h5" gutterBottom>Subjects List</Typography>
            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
            <SpeedDialTemplate actions={subjectActions} />
        </>
    );

    const ClassStudentsSection = () => (
        <>
            <Typography variant="h5" gutterBottom>Students List</Typography>
            <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
            <SpeedDialTemplate actions={studentActions} />
        </>
    );

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', position: 'sticky', top: 0, zIndex: 10 }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Details" value="1" />
                                <Tab label="Subjects" value="2" />
                                <Tab label="Students" value="3" />
                                <Tab label="Teachers" value="4" />
                            </TabList>
                        </Box>
                        <Container sx={{ py: 4 }}>
                            <TabPanel value="1"><ClassDetailsSection /></TabPanel>
                            <TabPanel value="2"><ClassSubjectsSection /></TabPanel>
                            <TabPanel value="3"><ClassStudentsSection /></TabPanel>
                            <TabPanel value="4"><Typography>Teachers Section Coming Soon...</Typography></TabPanel>
                        </Container>
                    </TabContext>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
