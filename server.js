// Import all the necessary npm modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import models for db operations
const UserModel = require('./models/User.js')
// Import routes 
const UserRoutes = require('./routes/User.js');


// Configure express to parse BODY
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to our database
const dbURL = "mongodb+srv://<username>:<password>@cluster0-oikl7.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(
    dbURL,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(
   ()=>{ // Sorry, not this tim
       console.log('response from mongoose', response)
   } 
).catch(
    (e)=>{
        console.log('no response from mongoose', e)
    }
)

/*
 * Routes for our web app server
 */

app.get(
    '/',  // http://www.example.com/
    (req, res)=>{
        res.send("<h1 style='color:blue'>Welcome Home</h1>");
    }
);


app.get(
    '*',
    (req, res)=>{
        res.send("<h1 style='color:black'>404</h1>");
    }
);


// Liste to the port
app.listen(
    3010, // connect to this port
    () => {
        console.log('you are connected');
    } // do this when you're connected
);



