import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    // using the context to access the notes
    const context = useContext(noteContext);
    const { addNote } = context;

    //made a note state to add in DB
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    //function called when the Save button is clicked
    const saveButtonClick = (e) => {
        //to prevent the reloading of the page when the it is clicked
        e.preventDefault();

        //adding the note in the frontend to show in the NoteItem component
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        //to take the input from the input fields and set the value in the note 
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="d-flex justify-content-center ">
            <div className="container my-3">

                <h2 className="mb-3 row justify-content-center bluecolor" >Create a Note</h2>

                <form >
                    <div className="mb-3" >
                        <label htmlFor="title" className="form-label mx-2 h6"> Title </label>
                        <input type="text" className="form-control forminput" id="title" name="title"
                            onChange={onChange}
                            placeholder="enter the title" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label mx-2 h6"> Description </label>
                        <input type="text" className="form-control forminput" id="desc" name="description"
                            onChange={onChange}
                            placeholder="enter the description"

                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label mx-2 h6"> Tag </label>
                        <input type="text" className="form-control forminput" id="tag" name="tag"
                            onChange={onChange}
                            placeholder="enter the tag"
                        />
                    </div>

                    <button className="d-flex justify-content-center btn-grad" type="submit" onClick={saveButtonClick}
                        style={{ padding: "6px 40px", fontSize: "17px" }}>
                        <b>Save </b>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
