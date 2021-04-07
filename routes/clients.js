const express = require('express');
const Client = require('../models/Client');
const router = express.Router();

//Get All clients
router.get('/', async (req,res)=>{
    try{
        const clients = await Client.find().sort({ date: -1 });
        res.status(200).json(clients);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});


//Submit a client
router.post('/', async (req,res)=>{
    console.log(req.body);

    const client = new Client({
		FirstName: req.body.FirstName,
		Surname: req.body.Surname,
		Phone: req.body.Phone,
		Temperature: req.body.Temperature,
        Travelled: req.body.Travelled,
        NotTravelled: req.body.NotTravelled
	});
    try{
        const savedClient = await client.save();
        res.status(200).json(savedClient);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
});

//Get Specific Client
router.get('/:clientId', async (req,res)=>{
    
    try{
        const client = await Client.findById(req.params.clientId);
        res.status(200).json(client);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Delete a Specific Client
router.delete('/:clientId', async (req,res)=>{
    
    try{
        const removedClient = await Client.remove({_id: req.params.clientId});
        res.status(200).json(removedClient);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//Delete a Specific Client
router.patch('/:clientId', async (req,res)=>{
    
    try{
        // extracting client id from url parameters
        const id = req.params.clientId;

        //creating a map from the passed array
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }

        //updating the found client with the new map
        const updatedClient = await Client.updateOne({_id: id}, { $set: updateOps})
        res.status(200).json(updatedClient);
    }
    catch(err){
        res.status(500).json({message: err});
    }

});

module.exports = router;