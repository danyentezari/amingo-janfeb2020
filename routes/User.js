const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');
const secret = 'theSecret100!'; // process.env.SECRET

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

router.post(
    '/login', // http://www.myapp.com/user/login
    (req, res)=>{
        const formdata = {
            email: req.body.email,
            password: req.body.password
        }

        // Step 1. Check to see if email exists
        UserModel
        .find({ email:  formdata.email})
        .then((isMatch)=>{
            // Step 2. If exists, check password
            if(isMatch.length>0) {
                // Step 3. Compare their password with database
                bcrypt
                .compare(formdata.password, isMatch[0].password)
                .then(
                    (passwordMatch)=>{
                        if(passwordMatch) {
                            // Step 4. Generate JWT
                            const payload = {
                                id: isMatch[0].id,
                                email: isMatch[0].email
                            }

                            jwt.sign(
                                payload,
                                secret,
                                (err, theJWT)=>{
                                    // Step 5. Send it to the client (frontend)
                                    res.json({token: theJWT})
                                }
                            )

                        } else {
                            res.send('Please check email & password')
                        }
                    }
                )
            }
            // Step 2.b If use doesn't exist, exit
            else {
                res.send('Please check email & password')
            }
        })
    }
)

module.exports = router;