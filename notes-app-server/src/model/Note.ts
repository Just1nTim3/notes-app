import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    }
},
{
    versionKey: false
})

const NotesModel = mongoose.model("Note", NoteSchema)
export default NotesModel