// 1. Import all the necessary npm modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 2. Import routes 
const UserRoutes = require('./routes/User.js');
const FeedRoutes = require('./routes/Feed.js')

// 3. Configure express to parse BODY
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 4. Connect to our database
const dbURL = "mongodb+srv://admin01:pass123@cluster0-oikl7.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(
    dbURL,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(
   ()=>{ // Sorry, not this tim
       console.log('db is connected')
   } 
).catch(
    (e)=>console.log('catch', e)
)

/*
 * 5. Routes for our web app server
 */

app.use(
    // This is where to access the routes. 
    // For example, http://www.myapp.com/user
    '/user', 
    UserRoutes
);

app.use(
    '/feed', 
    FeedRoutes
);


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


// 6. Liste to the port
app.listen(
    3010, // connect to this port
    () => {
        console.log('you are connected');
    } // do this when you're connected
);