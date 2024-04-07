import "./App.css"
import React, {useEffect, useState} from "react";

type Note = {
    id: number
    title: string
    content: string
}


const App = () => {
    //this mocks API call and displays notes on ui
    const [notes, setNotes] = useState<Note[]>([])

    //state variables
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    //
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/notes/all")

                const notes: Note[] = await response.json()
                setNotes(notes)
            } catch (e) {
                console.log(e)
            }
        }

        fetchNotes()
        //without [] it runs constantly. [] assures it runs only once
    }, [])

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note)
        setTitle(note.title)
        setContent(note.content)
    }

    //FIXME: update crashes app
    const handleUpdateNote = async (event: React.FormEvent) => {
        event.preventDefault()

        if(!selectedNote) {
            return
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/notes/${selectedNote.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        content
                    })
                })
            const updatedNote = await response.json()

            const updatedNotesList = notes.map((note) =>
                note.id === selectedNote.id ? updatedNote : note
            )

            setNotes(updatedNotesList)
            setTitle("")
            setContent("")
            setSelectedNote(null)
        } catch (e) {
            console.log(e)
        }


    }

    const handleCancel = () => {
        setTitle("")
        setContent("")
        setSelectedNote(null)
    }

    const handleAddNote = async (
        event: React.FormEvent
    ) => {
        event.preventDefault()
        console.log("title: ", title)
        console.log("content: ", content)

        try {
            const response = await fetch(
                "http://localhost:5000/api/notes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        content
                    })
                })
            const newNote = await response.json()
            //we call setNotes function, passing new note and existing notes
            setNotes([newNote, ...notes])
            //we clear title and content so after submit form gets cleared
            setTitle("")
            setContent("")
        } catch (e) {
            console.log(e)
        }




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
