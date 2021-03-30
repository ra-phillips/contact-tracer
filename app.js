const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/',(req,res)=>{
    res.send({message: "We are on home"});
});

//Import Routes
const clientsRoute = require('./routes/clients');
const employeesRoute = require('./routes/employees');
const employeesLogRoute = require('./routes/employeeLogs');

app.use('/clients',clientsRoute);
app.use('/employees',employeesRoute);
app.use('/employeesLog',employeesLogRoute);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

//Connect to DB 
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

