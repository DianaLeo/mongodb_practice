const { Schema, model } = require('mongoose');

module.exports = model('Course', new Schema({
    _id: {
        alias: 'code',
        type:String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "Course description",
    }
},
    { timestamps: true, }
));