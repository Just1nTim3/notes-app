import "./App.css"
import React, {useState} from "react";

type Note = {
    id: number
    title: string
    content: string
}

//

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

    return(
        <div className="app-container">

            {/*form*/}
            <form
                className="note-form"
                onSubmit={(event) => handleAddNote(event)}>
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
                <button type="submit">
                    Add Note
                </button>
            </form>

            {/*all notes*/}
            <div className="notes-grid">
                {notes.map((note) => (
                    <div className="note-item">
                        <div className="notes-header">
                            <button>x</button>
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
