import "./App.css"
import React, {useState} from "react";

type Note = {
    id: number
    title: string
    content: string
}


const App = () => {
    //this mocks API call and displays notes on ui
    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            title: "title1",
            content: "content1"
        },
        {
            id: 2,
            title: "title2",
            content: "content2"
        }
    ])

    //state variables
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const handleNoteClick = (note: Note) => {
        setSelectedNote(note)
        setTitle(note.title)
        setContent(note.content)
    }

    const handleUpdateNote = (event: React.FormEvent) => {
        event.preventDefault()

        if(!selectedNote) {
            return
        }

        const updatedNote: Note = {
            id: selectedNote.id,
            title: title,
            content: content
        }

        const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
        )

        setNotes(updatedNotesList)
        setTitle("")
        setContent("")
        setSelectedNote(null)
    }

    const handleCancel = () => {
        setTitle("")
        setContent("")
        setSelectedNote(null)
    }

    const handleAddNote = (
        event: React.FormEvent
    ) => {
        event.preventDefault()
        console.log("title: ", title)
        console.log("content: ", content)

        //we create new note when someone clicks submit
        const newNote: Note = {
            id: notes.length + 1,
            title: title,
            content: content
        }

        //we call setNotes function, passing new note and existing notes
        setNotes([newNote, ...notes])
        //we clear title and content so after submit form gets cleared
        setTitle("")
        setContent("")

    }

    const deleteNote = (event: React.MouseEvent, noteId: number) => {
        //required when we have nested onClick events
        event.stopPropagation()

        const updateNotes = notes.filter((note) => note.id != noteId)

        setNotes(updateNotes)
    }

    return(
        <div className="app-container">

            {/*form*/}
            <form
                className="note-form"
                onSubmit={(event) =>
                    selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
                <input
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)}
                    placeholder="title"
                    required>
                </input>
                <textarea
                    value={content}
                    onChange={(event)=>
                        setContent(event.target.value)}
                    placeholder="content"
                    rows={10}
                    required>
                </textarea>

                {selectedNote ? (
                    <div className="edit-buttons">
                        <button type="submit">Save</button>
                        <button onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                ) : (
                <button type="submit">
                    Add Note
                </button>
                )}
            </form>

            {/*all notes*/}
            <div className="notes-grid">
                {notes.map((note) => (
                    <div className="note-item"
                        onClick={() => handleNoteClick(note)}
                    >
                        <div className="notes-header">
                            <button onClick={(event) => deleteNote(event, note.id)}>x</button>
                        </div>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                ))}
                {/*<div className="note-item">
                    <div className="notes-header">
                        <button>
                            x
                        </button>
                        <h2>Note Title</h2>
                        <p>Note Content</p>
                    </div>
                </div>*/}
            </div>
        </div>
    )
}

export default App
