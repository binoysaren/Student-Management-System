
const express = require('express');
const router = express.Router();
const { createAssignment, getAllAssignments, deleteAssignment } = require('../controllers/assignmentController');


//================== For file upload ====================
const multer = require('multer');
const path = require('path');


//================= File storage setup ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/assignments/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  }
});


const upload = multer({ storage });


const { submitStudentAssignment } = require('../controllers/assignmentController');


router.post('/create', createAssignment);
router.get('/', getAllAssignments);
router.delete('/:id', deleteAssignment);
router.post('/submit', upload.single('file'), submitStudentAssignment);

module.exports = router;
