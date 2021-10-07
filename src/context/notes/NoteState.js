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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzViZDVhNWNkNmQyYWNjMTJjM2U5In0sImlhdCI6MTYzMjg1MzQ5Nn0.Eue03K5bbiyqfif3FjGhDePtajN4bmV0akpjKyRfN7Q"
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }

  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzViZDVhNWNkNmQyYWNjMTJjM2U5In0sImlhdCI6MTYzMjg1MzQ5Nn0.Eue03K5bbiyqfif3FjGhDePtajN4bmV0akpjKyRfN7Q"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    
    //logic to edit in client
    const note = {
      "_id": "615371651c57360dc88fdb20a85",
      "user": "61535bd5a5cd6d2acc12cd3e9",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-28T19:47:49.528Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = async (id) => {
    //todo: api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzViZDVhNWNkNmQyYWNjMTJjM2U5In0sImlhdCI6MTYzMjg1MzQ5Nn0.Eue03K5bbiyqfif3FjGhDePtajN4bmV0akpjKyRfN7Q"
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("deleting the note with its id" + id);

    //deleting it from the notes array
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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MzViZDVhNWNkNmQyYWNjMTJjM2U5In0sImlhdCI6MTYzMjg1MzQ5Nn0.Eue03K5bbiyqfif3FjGhDePtajN4bmV0akpjKyRfN7Q"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

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