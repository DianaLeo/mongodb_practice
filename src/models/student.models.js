const { Schema, model } = require('mongoose');

//data format
const studentSchema = new Schema({
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
    }//strictly no comma at the last one
}, {
    timestamps: true
}
)

//collection students
const Student = model('Student', studentSchema);

module.exports = Student;