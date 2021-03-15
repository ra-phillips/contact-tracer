const mongoose = require('mongoose');

const EmployeeLogSchema = mongoose.Schema({
    FirstName:{
        type: String,
        required: [true, 'Your first name is required'],
        trim: true,
    },
    Surname:{
        type: String, 
        required: [true, 'Your Surname is required'],
        trim: true,
    },
    Phone:{
        type: String,
        required: [true, 'Your phone number is required']
    },
    Temperature:{
        type: Number
    },
    Travelled:{
        type: Boolean,
        default: false
    },
    NotTravelled:{
        type: Boolean,
        default: false
    },
    Date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('EmployeesLog', EmployeeLogSchema);