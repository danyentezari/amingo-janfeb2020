app.post(
    '/user',
    (req, res)=>{

        const formdata = {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'email': req.body.email,
            'password': req.body.password,
            'occupation': req.body.occupation
        }

        const theUserModel = new UserModel(formdata);
        theUserModel.find();

        res.send("User registration complete")
    }
)