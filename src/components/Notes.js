import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useHistory } from 'react-router';

const Notes = (props) => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            // eslint-disable-next-line
        }
        else {
            history.push("/login")
        }
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);


    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });



    const updateNote = (currentNote) => {
        //to open the modal
        ref.current.click();

        //to fill the modal form fields with the notes values before we can edit it
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }


    //function called when the Save button is clicked
    const updateButtonClick = (e) => {
        //sending it the NoteState context and execute ite editNote function
        editNote(note.id, note.etitle, note.edescription, note.etag);

        //to close the modal
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
    }

    const onChange = (e) => {
        //to take the input from the input fields and set the value in the note 
        setNote({ ...note, [e.target.name]: e.target.value })
    }




    return (
        <div>
            <div className="my-3">
                <AddNote showAlert={props.showAlert} />
            </div>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"> A </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                style={{ color: "black" }}>
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content" style={{ color: "white", backgroundColor: "#334257", borderRadius: "20px" }}>
                        <div className="modal-header">
                            <h4 className="modal-title m-auto" id="exampleModalLabel" > Update Note </h4>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3" >
                                    <label htmlFor="etitle" className="form-label mx-2 h5" >Title</label>
                                    <input type="text" className="form-control forminput"
                                        id="etitle" name="etitle"
                                        value={note.etitle} onChange={onChange}
                                        minLength={5} required
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label mx-2 h5">Description</label>
                                    <textarea className="form-control forminput" rows="2"
                                        id="edesc" name="edescription"
                                        value={note.edescription} onChange={onChange}
                                        minLength={5} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label mx-2 h5">Tag</label>
                                    <input type="text" className="form-control forminput"
                                        id="etag" name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                        minLength={5} required
                                    />
                                </div>


                                {/* BUTTON on update page  */}
                                <div className="row mx-1">

                                    {/* update button  */}
                                    <button type="button" className="d-flex btn-grad justify-content-center  my-3 py-1"
                                        onClick={updateButtonClick}
                                        disabled={note.etitle.length < 5 || note.edescription.length < 5}>
                                        <b> Update </b>
                                    </button>

                                    {/* close button  */}
                                    <button type="button" className="d-flex btn-grad justify-content-center my-1 py-1 " data-bs-dismiss="modal"
                                        ref={refClose} >
                                        <b> Close </b>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row my-3 ">
                <h2 className="mx-2 row justify-content-center bluecolor" >Your Notes</h2>
                <div className="mx-2 my-3 row justify-content-center  fontwork">
                    {notes.length === 0 && 'No Notes to display...'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </div>
    )
}

export default Notes
