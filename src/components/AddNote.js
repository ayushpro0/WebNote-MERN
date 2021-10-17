import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    // using the context to access the notes
    const context = useContext(noteContext);
    const { addNote } = context;

    //made a note state to show in frontend
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    //function called when the Save button is clicked
    const saveButtonClick = (e) => {
        //to prevent the reloading of the page when the it is clicked
        e.preventDefault();

        //adding the note in the backend DB
        addNote(note.title, note.description, note.tag);

        //to clear the fields of the form after saving it
        setNote({ title: "", description: "", tag: "" });

        props.showAlert("Added Successfully", "success")
    }

    const onChange = (e) => {
        //to take the input from the input fields and set the value in the note 
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="row justify-content-center ">



            <form className="mb-3 my-3 " style={{ width: "60%" }}>

                <h2 className="mb-5 row justify-content-center bluecolor" >Create a Note</h2>


                <div className="row mb-3" >
                    <label htmlFor="title" className="col-sm-2 col-form-label fontsize"> Title </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control forminput" id="title" name="title"
                            value={note.title}
                            onChange={onChange}
                            placeholder="enter the title"
                            minLength={5}
                            required />
                    </div>
                </div>


                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-2 col-form-label fontsize"> Description </label>
                    <div className="col-sm-10">
                        <textarea className="form-control forminput" id="desc" name="description" rows="2"
                            onChange={onChange}
                            value={note.description}
                            placeholder="enter the description"
                            minLength={5}
                            required/>
                    </div>
                </div>


                <div className="row mb-3 mx-2 justify-content-center">
                    <button className="d-flex btn-grad justify-content-center  my-3 py-1" type="submit"
                        onClick={saveButtonClick}
                        disabled={note.title.length < 5 || note.description.length < 5}
                        style={{ width: "30%" }}>
                        <b> Save </b>
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddNote
