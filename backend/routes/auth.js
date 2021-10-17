const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { getByPlaceholderText } = require('@testing-library/dom');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "secret_wali_batcheet";

//ROUTE 1: create a user using: POST "/api/auth/createuser" ... No login required
router.post('/createuser', [
    //validating the input
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters long!').isLength({ min: 5 })
], async (req, res) => {

    let success = false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    //cheching if input are empty
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    //checking whether the email of the user exist already in our Database
    try {
        //checking if the email is already present or not 
        let user = await User.findOne({ email: req.body.email });

        //if the user already exists return with error and message
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists :( " });
        }

        //generating a salt for the password with the help of bcrypt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        //if user does not already exist then create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        //taking "id" from the Database
        const data = {
            user: { id: user.id }
        }

        //using that id to make a Authentication Token along with a SECRET
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        //sending the token to the user
        res.json({ success, authToken });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
}
);

//ROUTE 2: Authenticate a user : POST "/api/auth/login" ... No login required
router.post('/login', [
    //validating the input
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);

    //checking if inputs are empty or not
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() });
    }

    //deconstructing the request body sent to db taking email and password from it
    const { email, password } = req.body;

    try {
        //searching the email we got in the request from deconstructing the request body in our DB 
        //and saving the user details from the DB in "user" variable
        let user = await User.findOne({ email });

        //if user does not exist in our DB, return appropriate error message
        if (!user) {
            
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }

        //if the user with requested email exist in our DB then we will compare the passwords
        //comparing the password of in the request with the hashed password of the user in our DB
        const passwordCompare = await bcrypt.compare(password, user.password);

        //if the password does not match, return appropriate error message
        if (!passwordCompare) {
            
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }

        //taking "id" of the user to make authtoken
        const data = {
            user: { id: user.id }
        }

        //using that User id to make a Authentication Token along with a SECRET
        const authToken = jwt.sign(data, JWT_SECRET);
        //sending the token to the user
        success = true;
        username = user.name;
        useremail = user.email;
        res.json({ success, authToken, username, useremail });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

});

//ROUTE 3: get loggedin User details using: POST "/api/auth/getuser" ... login required
router.post('/getuser', fetchuser,async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

});
module.exports = router;