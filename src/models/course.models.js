const { Schema, model } = require('mongoose');

module.exports = model('Course', new Schema({
    _id: {
        alias: 'code',
        type:String,
        required: true,
        uppercase:true,
        //unique:true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "Course description",
    },
    students:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Student',
        }
    ],
    teachers:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Teacher',
        }
    ]
},
    { timestamps: true, }
));