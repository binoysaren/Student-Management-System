const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Assignment title is required'],
            trim: true,
            maxlength: 100
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: 2000
        },
        role: {
            type: String,
            enum: ['Admin', 'Teacher'],
            required: [true, 'Uploader role is required']
        },
        uploadedBy: {
            type: String,
            required: [true, 'Uploader name or ID is required'],
            trim: true
        }
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields automatically
    }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
