import { useEffect, useState } from 'react';
import {
  IconButton, Box, Menu, MenuItem, ListItemIcon,
  Tooltip, Typography, Paper, CircularProgress
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.error(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
      })
      .catch((err) => {
        setMessage("Failed to delete. Please try again.");
        setShowPopup(true);
        console.error(err);
      });
  };

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  const sclassRows = Array.isArray(sclassesList) && sclassesList.length > 0
    ? sclassesList.map((sclass) => ({
      name: sclass.sclassName,
      id: sclass._id,
    }))
    : [];

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <Tooltip title="Delete Class" arrow>
          <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary">
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Class Details" arrow>
          <BlueButton variant="contained" onClick={() => navigate("/Admin/classes/class/" + row.id)}>
            View
          </BlueButton>
        </Tooltip>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <>
        <Tooltip title="More Actions" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Typography variant="body2" sx={{ mr: 1 }}>Add</Typography>
            <SpeedDialIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 4,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action) => (
            <MenuItem key={action.name} onClick={action.action}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <PageWrapper>
      <Header>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Manage Classes
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Add, view, and organize school classes
        </Typography>
      </Header>

      {loading ? (
        <LoaderContainer>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 1 }}>Loading classes...</Typography>
        </LoaderContainer>
      ) : (
        <>
          {getresponse ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </GreenButton>
            </Box>
          ) : (
            <>
              {sclassRows.length > 0 && (
                <StyledPaper elevation={3}>
                  <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                </StyledPaper>
              )}
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageWrapper>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.15))',
    mt: 1.5,
    borderRadius: 2,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
};

const PageWrapper = styled.div`
  padding: 24px;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  border-radius: 12px;
  background: white;
`;

