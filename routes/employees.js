const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

//Get All Employees
router.get('/', async (req,res)=>{
    try{
        const employees = await Employee.find().sort({ date: -1 });
        res.status(200).json(employees);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Submit a Employee
router.post('/', async (req,res)=>{
    console.log(req.body);

    const employee = new Employee({
		FirstName: req.body.FirstName,
		Surname: req.body.Surname,
		Phone: req.body.Phone
	});
    try{
        const savedEmployee = await employee.save();
        res.status(200).json(savedEmployee);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
});

//Get Specific Employee
router.get('/:employeeId', async (req,res)=>{
    
    try{
        const employee = await Employee.findById(req.params.employeeId);
        res.status(200).json(employee);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Delete a Specific Employee
router.delete('/:employeeId', async (req,res)=>{
    
    try{
        const removedEmployee = await Employee.remove({_id: req.params.employeeId});
        res.status(200).json(removedEmployee);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Delete a Specific Employee
router.patch('/:employeeId', async (req,res)=>{
    
    try{
        // extracting Employee id from url parameters
        const id = req.params.employeeId;

        //creating a map from the passed array
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }

        //updating the found Employee with the new map
        const updatedEmployee = await Employee.updateOne({_id: id}, { $set: updateOps})
        res.status(200).json(updatedEmployee);
    }
    catch(err){
        res.status(500).json({message: err});
    }

});

module.exports = router;