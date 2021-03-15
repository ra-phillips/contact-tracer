const express = require('express');
const EmployeeLog = require('../models/EmployeeLog');
const router = express.Router();

//Get All Employees
router.get('/', async (req,res)=>{
    try{
        const employeesLog = await EmployeeLog.find().sort({ date: -1 });
        res.status(200).json(employeesLog);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Submit a Employee
router.post('/', async (req,res)=>{
    console.log(req.body);

    const employeeLog = new EmployeeLog({
		FirstName: req.body.FirstName,
		Surname: req.body.Surname,
		Phone: req.body.Phone,
        Temperature: req.body.Temperature,
        Travelled: req.body.Travelled,
        NotTravelled: req.body.NotTravelled
	});
    try{
        const savedEmployeeLog = await employeeLog.save();
        res.status(200).json(savedEmployeeLog);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
});

//Get Specific Employee
router.get('/:employeeLogId', async (req,res)=>{
    
    try{
        const employeeLog = await EmployeeLog.findById(req.params.employeeLogId);
        res.status(200).json(employeeLog);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Delete a Specific Employee
router.delete('/:employeeLogId', async (req,res)=>{
    
    try{
        const removedEmployeeLog = await EmployeeLog.remove({_id: req.params.employeeLogId});
        res.status(200).json(removedEmployeeLog);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Delete a Specific Employee
router.patch('/:employeeLogId', async (req,res)=>{
    
    try{
        // extracting Employee id from url parameters
        const id = req.params.employeeLogId;

        //creating a map from the passed array
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }

        //updating the found Employee with the new map
        const updatedEmployeeLog = await EmployeeLog.updateOne({_id: id}, { $set: updateOps})
        res.status(200).json(updatedEmployeeLog);
    }
    catch(err){
        res.status(500).json({message: err});
    }

});

module.exports = router;