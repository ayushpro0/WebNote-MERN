import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    // using the context to access the notes
    const context = useContext(noteContext);
    
    const { deleteNote } = context;

    const { note, updateNote } = props;
    
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{borderRadius: "20px", backgroundColor: "#6D8299", border: "none", color: "white", }}>
                <div className="card-body" >
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text" style={{ color: '#dfdfdf', fontFamily: 'Work Sans'}}>{note.description}</p>

                    {/* edit icon  */}
                    <i className="fas fa-pen mx-2 btn-grad" style={{ padding: "5px 20px"}}
                    onClick={ () => { updateNote(note) }}></i>

                    {/* delete icon  */}
                    <i className="fas fa-trash mx-2 btn-grad" style={{ padding: "5px 22px"}}
                    onClick={ () => { deleteNote(note._id); props.showAlert("Note Deleted", "success") }} ></i>

                </div>
            </div>

        </div>
    )
}

export default NoteItem
