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
    Phone:{
        type: String,
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
          },
          required: [true, 'Your phone number is required']
    }
});

module.exports = mongoose.model('Employees', EmployeeSchema);