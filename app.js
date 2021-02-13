const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Import Routes
const clientsRoute = require('./routes/clients');
const employeesRoute = require('./routes/employees');
const employeesLogRoute = require('./routes/employeeLogs');

app.get('/',(req,res)=>{
    res.send('We are on home');
});

app.use('/clients',clientsRoute);
app.use('/employees',employeesRoute);
app.use('/employeesLog',employeesLogRoute);


//Connect to DB jY1brHxgg3zbOgNk
mongoose.connect('mongodb+srv://RPhillips:'
    + process.env.MONGO_ATLAS_PW + 
    '@contact-tracer-cluster1.k94fe.mongodb.net/ContactDB?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    () => console.log("MongoDB database connection established successfully")
);

//Start Server
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})