import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "default" });

    const updateNote = (currenNote) => {
        ref.current.click();
        setNote({ id: currenNote._id, etitle: currenNote.title, edescription: currenNote.description, etag: currenNote.tag });
    }


    //function called when the Save button is clicked
    const updateButtonClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    const onChange = (e) => {
        //to take the input from the input fields and set the value in the note 
        setNote({ ...note, [e.target.name]: e.target.value })
    }




    return (
        <div>
            <div className="my-3">
                <AddNote />
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
                                    <input type="text" className="form-control"
                                        id="etitle" name="etitle"
                                        value={note.etitle} onChange={onChange}
                                        style={{ borderRadius: "20px", backgroundColor: "#e7e7e7", border: "none", }}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label mx-2 h5">Description</label>
                                    <input type="text" className="form-control"
                                        id="edesc" name="edescription"
                                        value={note.edescription} onChange={onChange}
                                        style={{ borderRadius: "20px", backgroundColor: "#e7e7e7", border: "none", }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label mx-2 h5">Tag</label>
                                    <input type="text" className="form-control"
                                        id="etag" name="etag"
                                        value={note.etag} onChange={onChange}
                                        style={{ borderRadius: "20px", backgroundColor: "#e7e7e7", border: "none", }}
                                    />
                                </div>


                                {/* BUTTON on update page  */}
                                <div className="row mx-1">

                                    {/* update button  */}
                                    <button type="button" className="d-flex btn-grad justify-content-center  my-3 py-1"
                                        onClick={updateButtonClick} >
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
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
