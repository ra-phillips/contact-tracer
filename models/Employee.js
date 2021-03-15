const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    FirstName:{
        type: String,
        required: [true, 'Your first name is required'],
        trim: true,
        minlength: [2, 'First name must contain more than one character!']
    },
    Surname:{
        type: String, 
        required: [true, 'Your Surname is required'],
        trim: true,
        minlength: [2, 'Surname must contain more than one character!']
    },
    Position:{
        type: String
    },
    Email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    Phone:{
        type: String,
    },
    Status:{
        type: String,
    }
});

module.exports = mongoose.model('Employees', EmployeeSchema);