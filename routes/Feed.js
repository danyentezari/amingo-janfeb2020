const express = require('express');
const router = express.Router();
// const FeedModel = require('../models/Feed.js');

router.get(
    '/create',// http://www.myapp.com/feed/create
    (req, res)=>{
        res.send("Here are your feeds");
    }
) 


module.exports = router;