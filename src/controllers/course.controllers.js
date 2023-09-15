const Course = require('../models/course.models');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().exec();
        res.json(courses);
    } catch (error) {
        res.status(500).json('Server error');
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id).exec();
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        })
    }
};

const addCourse = async (req, res) => {
    const {_id,name,description} = req.body;
    const course = new Course({_id,name,description});
    if (!_id || !name){
        res.status(400).json({error:'Bad request'});
        return;
    }
    try {
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        })
    }
};

const updateCourseById = async (req, res) => {
    const { id } = req.params;
    const {name,description} = req.body;
    try {
        const course = await Course.findByIdAndUpdate(
            id,
            {name,description},
            {new:true}
            ).exec();
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        })
    }
};

const deleteCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete(id).exec();
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
            msg: error.message
        })
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourseById,
    deleteCourseById
}