const express = require('express');
const router = express.Router();

const UserModel = require('../models/User.js')

router.post(
    '/register', // http://www.myapp.com/user/register
    (req, res)=>{

        const formdata = {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'email': req.body.email,
            'password': req.body.password,
            'occupation': req.body.occupation
        }

        const theUserModel = new UserModel(formdata);
        theUserModel.save();

        res.send("User registration complete")
    }
)

module.exports = router;