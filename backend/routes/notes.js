const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


//ROUTE 1: get all the Notes using: GET "api/notes/fetchallnotes" ...login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        //fetching all the notes for a specific user
        const notes = await Note.find({ user: req.user.id });

        //seding all notes of the user to the user
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

//ROUTE 2: add a new Note using: POST "api/notes/addnote" ..login required
router.post('/addnote', fetchuser, [
    //restrictions for the inputs in resquest body
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be alteast 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {
    try {
        //deconstructing the request
        const { title, description, tag } = req.body;

        //if there are errors, return bad request and the errors
        const errors = validationResult(req);
        //cheching if input are empty
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //creating a new note for the user
        const note = new Note({ title, description, tag, user: req.user.id });

        //saving the note in DB
        const savedNote = await note.save();

        //sending the savedNote in response to user
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})





module.exports = router;