const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');


//======================= Create a new class ==============================
const sclassCreate = async (req, res) => {
  try {
    const { sclassName, adminID } = req.body;

    const existingSclass = await Sclass.findOne({ sclassName, school: adminID });

    if (existingSclass) {
      return res.status(400).json({ message: 'Class name already exists.' });
    }

    const newClass = new Sclass({ sclassName, school: adminID });
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create class', error: err.message });
  }
};


//===================  List all classes for a school ==========================
const sclassList = async (req, res) => {
  try {
    const sclasses = await Sclass.find({ school: req.params.id });
    if (sclasses.length > 0) {
      res.json(sclasses);
    } else {
      res.status(404).json({ message: 'No classes found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching class list', error: err.message });
  }
};


//=======================  Get class details by ID ========================
const getSclassDetail = async (req, res) => {
  try {
    const sclass = await Sclass.findById(req.params.id).populate("school", "schoolName");
    if (!sclass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(sclass);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching class details', error: err.message });
  }
};


//=====================  Get all students of a class ==========================
const getSclassStudents = async (req, res) => {
  try {
    const students = await Student.find({ sclassName: req.params.id });
    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found in this class' });
    }

    const cleanedStudents = students.map((student) => ({
      ...student._doc,
      password: undefined
    }));

    res.json(cleanedStudents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
};


//==========================  Delete a specific class and its associated data =======================
const deleteSclass = async (req, res) => {
  try {
    const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await Student.deleteMany({ sclassName: req.params.id });
    await Subject.deleteMany({ sclassName: req.params.id });
    await Teacher.deleteMany({ teachSclass: req.params.id });

    res.json({ message: 'Class and associated records deleted successfully', deletedClass });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete class', error: error.message });
  }
};


//======================== Delete all classes for a school and associated data =========================
const deleteSclasses = async (req, res) => {
  try {
    const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
    if (deletedClasses.deletedCount === 0) {
      return res.status(404).json({ message: 'No classes found to delete' });
    }

    await Student.deleteMany({ school: req.params.id });
    await Subject.deleteMany({ school: req.params.id });
    await Teacher.deleteMany({ school: req.params.id });

    res.json({ message: 'All classes and associated records deleted successfully', deletedCount: deletedClasses.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete classes', error: error.message });
  }
};


module.exports = {
  sclassCreate,
  sclassList,
  getSclassDetail,
  getSclassStudents,
  deleteSclass,
  deleteSclasses
};
