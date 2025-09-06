import { useState, useEffect } from 'react';
import Note from './components/Note'
import './index.css'

import noteService from './services/notes'
import Notification from './components/Notification';
import Footer from './components/Footer';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Pull data from server
  useEffect(() => {
    noteService.getAll().then(res => {
      setNotes(res);
    })
  }, []);

  // console.log("Render: ", notes.length, 'notes')

  const addNote = (event) => {
    // Prevent page from reloading
    event.preventDefault()

    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObj).then(res => {
      setNotes(notes.concat(res));
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote: note))
    }).catch(e => {
      e
      setErrorMsg(`Note ${note.content} was already removed from server`)

      setTimeout(() => {
        setErrorMsg(null)
      }, 5000);
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMsg} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(el => 
          <Note key={el.id} note={el} tImportance={() => toggleImportance(el.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save Note</button>
      </form>

      <Footer />
    </div>
  )
}

export default App;