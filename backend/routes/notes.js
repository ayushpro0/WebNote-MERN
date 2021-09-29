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
        res.json({ "Success": "Note Created!", savedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

//ROUTE 3: update an existing Note using: PUT "api/notes/updatenote" ..login required
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        //deconstructino the request to get the title, description, tag
        const { title, description, tag } = req.body;
        try {
            //create a newNote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //find the note to be updated
            let note = await Note.findById(req.params.id);

            //if note with param id does not exist
            if (!note) {
                return res.status(404).send("Not Found!");
            }

            //allow updation only if user owns this Note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            //if the note of the user exist after searching it with the id of the note
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ "Success": "Note Updated!", note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occured");
        }
    })


//ROUTE 4: delete a Note using: DELETE "api/notes/deletenote" ..login required
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {
            //find the note to be deleted and delete it
            let note = await Note.findById(req.params.id);

            //if note with param id does not exist
            if (!note) {
                return res.status(404).send("not found!");
            }

            //allow deletion only if user owns this Note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed");
            }

            //if the note of the user exist after searching it with the id of the note
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Note Deleted", note: note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occured");
        }
    })





module.exports = router;