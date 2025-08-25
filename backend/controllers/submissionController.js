
const Submission = require('../models/Submission');


const submitAssignment = async (req, res) => {
  const { studentName, assignmentTitle } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const submission = new Submission({
    studentName,
    assignmentTitle,
    filename: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });

  await submission.save();

  res.status(201).json({ message: "Assignment submitted successfully", submission });
};


const getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find().sort({ submittedAt: -1 });
  res.status(200).json(submissions);
};


module.exports = { submitAssignment, getAllSubmissions };
