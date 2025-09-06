const Note = ({ note, tImportance }) => {
  const label = note.important ? 'Make not Important' : 'Make Important'
  return (
    <li className="note">
      {note.content}
      <button onClick={tImportance}>{label}</button>
      </li>
  )
}

export default Note;
