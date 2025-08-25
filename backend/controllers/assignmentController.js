
const Assignment = require('../models/Assignment');


//======================= Create a new assignment ====================
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, role, uploadedBy } = req.body;

    if (!title || !description || !role || !uploadedBy) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!['Admin', 'Teacher'].includes(role)) {
      return res.status(403).json({ error: 'Only Admin or Teacher can create assignments.' });
    }

    const assignment = new Assignment({ title, description, role, uploadedBy });
    await assignment.save();

    res.status(201).json({ message: 'Assignment created successfully.', assignment });
  } catch (error) {
    console.error('Create Assignment Error:', error.message);
    res.status(500).json({ error: 'Server error. Could not create assignment.' });
  }
};


//================  Get all assignments ===================
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Fetch Assignments Error:', error.message);
    res.status(500).json({ error: 'Server error. Could not fetch assignments.' });
  }
};


//==================  Delete a specific assignment =========================
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found.' });
    }

    res.status(200).json({ message: 'Assignment deleted successfully.' });
  } catch (error) {
    console.error('Delete Assignment Error:', error.message);
    res.status(500).json({ message: 'Server error. Could not delete assignment.' });
  }
};


//========================== Submit a specific assignment =========================
exports.submitStudentAssignment = async (req, res) => {
  try {
    const { studentId, assignmentId } = req.body;
    const filePath = req.file.path;

    // You can create a new Submission model or store inside Assignment
    res.status(200).json({ message: 'Assignment submitted successfully!', filePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
