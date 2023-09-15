const { Schema, model } = require('mongoose');

module.exports = model('Teacher', new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    courses:[
        {
            type:String,
            ref: 'Course',
        }
    ]
}, {
    timestamps: true
}));