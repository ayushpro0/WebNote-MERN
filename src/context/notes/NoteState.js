import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //GET ALL NOTES
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //ADD A NOTE
  const addNote = async (title, description) => {
    //API Call to add the note in DB
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description})
    });

    // frontend note 
    getNotes();
  }

  //Delete a Note
  const deleteNote = async (id) => {
    //todo: api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line
    const json = await response.json();

    //deleting the note from the notes array
    const notes_after_deletion = notes.filter((note) => { return note._id !== id });
    setNotes(notes_after_deletion);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call for Backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    // eslint-disable-next-line
    const json = await response.json();

    let updatedNotes = JSON.parse(JSON.stringify(notes));

    //logic to edit in Frontend
    for (let index = 0; index < updatedNotes.length; index++) {
      const element = updatedNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(updatedNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;