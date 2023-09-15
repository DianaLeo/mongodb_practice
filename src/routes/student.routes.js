const {
    getAllStudents,
    getStudentById,
    addStudents,
    updateStudentById,
    deleteStudentById
} = require('../controllers/student.controllers');
const {Router} = require('express');

const studentRouter = Router();

studentRouter.get('/',getAllStudents);
studentRouter.get('/:id',getStudentById);
studentRouter.post('/',addStudents);
studentRouter.put('/:id',updateStudentById);
studentRouter.delete('/:id',deleteStudentById);

module.exports = studentRouter;