const Student = require('../models/student.models');

const getAllStudents = async (req, res) => {
    //db.students.find()
    //query chain 一系列api串联起来
    //Student.find().sort().limit().filter()
    //Query.sort() -> Query
    //builder pattern
    try {
        const students = await Student.find().exec();
        res.json(students);
    } catch (error) {
        res.status(500).json('Server error');
    }
}

const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id).exec();
        if(!student){
            res.status(404).json('Student not found');
            return;
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        });
    }
}

const addStudents = async (req, res) => {
    const { firstname, lastname, email } = req.body;
    //data validation
    const student = new Student({
        firstname, lastname, email
    });
    try {
        await student.save();
        res.json(student);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateStudentById = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;
    try {
        //findByIdAndUpdate automatically check input data
        //if there is an undefined, this field won't be updated
        const student = await Student.findByIdAndUpdate(
            id,
            { firstname, lastname, email },
            { new: true }
        ).exec();
        if(!student){
            res.status(404).json('Student not found');
            return;
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: 'Sever error',
            msg: error.message
        });
    }
}
const deleteStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id).exec();
        if(!student){
            res.status(404).json('Student not found');
            return;
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        });
    }
}


module.exports = {
    getAllStudents,
    getStudentById,
    addStudents,
    updateStudentById,
    deleteStudentById
}
