import "./App.css"
import {useState} from "react";

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
        },
        {
            id: 3,
            title: "title3",
            content: "content3"
        },
        {
            id: 4,
            title: "title4",
            content: "content4"
        },
        {
            id: 5,
            title: "title5",
            content: "content5"
        }
    ])
    return(
        <div className="app-container">
            <form className="note-form">
                <input placeholder="title" required>
                </input>
                <textarea placeholder="title" rows={10} required>
                </textarea>
                <button type="submit">
                    Add Note
                </button>
            </form>
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
