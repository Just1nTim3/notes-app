import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    updatedDate: {
        type: Date
    }
},
{
    versionKey: false
})

const NotesModel = mongoose.model("Note", NoteSchema)
export default NotesModel