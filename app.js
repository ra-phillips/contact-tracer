const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv/config');

const clientsRoute = require('./routes/clients');
const employeesRoute = require('./routes/employees');
const employeesLogRoute = require('./routes/employeeLogs');

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Connect to DB 
mongoose.connect('mongodb+srv://RPhillips:'
    + process.env.MONGO_ATLAS_PW + 
    '@contact-tracer-cluster1.k94fe.mongodb.net/ContactDB?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    () => console.log("MongoDB database connection established successfully")
);

//Import Routes
app.use('/clients',clientsRoute);
app.use('/employees',employeesRoute);
app.use('/employeesLog',employeesLogRoute);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static( 'client/build'));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//start server
app.listen(port, (req, res) => {  
    console.log( `server listening on port: ${port}`);
})

