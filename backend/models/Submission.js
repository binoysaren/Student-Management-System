const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  assignmentTitle: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
