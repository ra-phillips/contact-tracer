const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

//Static file declaration
app.use(express.static(path.join(__dirname, './client/build')));


//Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

//production mode
if(process.env.NODE_ENV === 'production') { 
     app.use(express.static(path.join(__dirname, './client/build')));  
     app.get('*', (req, res) => {    
         res.sendfile(path.join(__dirname = './client/build/index.html'));  
        }
    )
}

//build mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

// app.get('/',(req,res)=>{
//     res.send({message: "We are on home"});
// });


//Import Routes
// const clientsRoute = require('./routes/clients');
// const employeesRoute = require('./routes/employees');
// const employeesLogRoute = require('./routes/employeeLogs');

// app.use('/clients',clientsRoute);
// app.use('/employees',employeesRoute);
// app.use('/employeesLog',employeesLogRoute);


//Connect to DB jY1brHxgg3zbOgNk
mongoose.connect('mongodb+srv://RPhillips:'
    + process.env.MONGO_ATLAS_PW + 
    '@contact-tracer-cluster1.k94fe.mongodb.net/ContactDB?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    () => console.log("MongoDB database connection established successfully")
);

//start server
app.listen(port, (req, res) => {  
    console.log( `server listening on port: ${port}`);
})

