const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require('../models/User.js')

router.post(
    '/register', // http://www.myapp.com/user/register
    (req, res)=>{

        const formdata = {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'email': req.body.email,
            'password': req.body.password, // myPass213, for example.
            'occupation': req.body.occupation
        }

        const theUserModel = new UserModel(formdata);

        // Step 1. Generate a salt
        bcrypt.genSalt(
            (err, salt)=>{
                // Step 2. Generate the hashed password
                bcrypt.hash(
                    formdata.password, //password
                    salt, //generated salt
                    (err, hashedPassword)=>{

                        // Step 3. Replace the password value in formdata
                        theUserModel.password = hashedPassword; //myPass123 is now $2b$10$H5IXXYWXx

                        // Step 4. Save to database
                        theUserModel.save();
                        res.send("User registration complete")

                    }// how we handle the new hased password
                )
            }
        )
    }
)

module.exports = router;