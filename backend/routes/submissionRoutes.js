
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { submitAssignment, getAllSubmissions } = require('../controllers/submissionController');

router.post('/upload', upload.single('file'), submitAssignment);
router.get('/all', getAllSubmissions);

module.exports = router;

