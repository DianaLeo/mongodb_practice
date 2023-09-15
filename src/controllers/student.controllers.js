const Student = require('../models/student.models');
const Course = require('../models/course.models');

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
        const student = await Student.findById(id).populate('courses', 'name description teachers').exec();
        if (!student) {
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
        if (!student) {
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
        const student = await Student.findById(id).exec();
        if (!student) {
            res.status(404).json('Student not found');
            return;
        }
        const courses = student.courses;
        courses.forEach(async (course) => {
            const courseId = course.code;
            await Course.findByIdAndUpdate(courseId,
                { $pull: { students: id } }
            ).exec();
        })
        await Student.findByIdAndDelete(id).exec();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        });
    }
}




//Add and remove Student to/from Course. Can be done in course.controllers.js as well

// /v1/students/:studentId/courses/:courseId
// find student id
// find course id
// validate student and course exist
// add course to student
// add student to course
// save student
// save course
const addStudentToCourse = async (req, res) => {
    const { studentId, courseId } = req.params;
    try {
        const student = await Student.findById(studentId).exec();
        const course = await Course.findById(courseId).exec();
        if (!student || !course) {
            res.status(404).json({ error: 'Student or course not found' })
            return;
        }
        // can add transaction

        //method 1 : student.courses.push(courseId);
        //method 2
        // can avoid duplicate courseID
        student.courses.addToSet(courseId);
        course.students.addToSet(studentId);

        await student.save();
        await course.save();

        //or combine add and save into one step using findbyidandupdate
        // await Student.findByIdAndUpdate(studentId,{
        //     $addToSet:{courses:courseId}
        // }).exec();
        // await Course.findByIdAndUpdate(courseId,{
        //     $addToSet:{students:studentId}
        // }).exec();

        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        })
    }
}

// /v1/students/:studentId/courses/:courseId
const removeStudentFromCourse = async (req, res) => {
    const { studentId, courseId } = req.params;
    try {
        const student = await Student.findById(studentId).exec();
        const course = await Course.findById(courseId).exec();
        if (!student || !course) {
            res.status(404).json({ error: 'Student or course not found' })
            return;
        }

        await Student.findByIdAndUpdate(studentId,
            { $pull: { courses: courseId } }
        ).exec();
        await Course.findByIdAndUpdate(courseId,
            { $pull: { students: studentId } }
        ).exec();

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        })
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    addStudents,
    updateStudentById,
    deleteStudentById,
    addStudentToCourse,
    removeStudentFromCourse
}
