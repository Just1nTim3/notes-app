import express from "express"
import cors from "cors"
import {connectToDb} from "./config/db";
import NotesModel from "./model/Note"


const app = express()

app.use(express.json())
app.use(cors())

connectToDb()

app.get("/api/notes/test", async (req, res) => {
    res.json({message: "test"})
})

app.get("/api/notes/all", async (req, res) => {
    try {
        const notes = await NotesModel.find({})
        console.log(notes)
        res.status(200).send(notes)
    } catch (e) {
        res.status(500).send({e})
    }
})

app.get("/api/notes/:id", async (req, res) => {
    try {
        const note = await NotesModel.findOne({_id: req.params.id})
        console.log(note)
        res.status(200).send(note)
    } catch (e) {
        res.status(500).send({e})
    }
})


app.post("/api/notes", async (req, res) => {
    try {
        const note = new NotesModel(req.body)
        if (!note) {
            res.status(500).send("Body can't be empty")
        }
        await note.save()
        console.log("saving item: " + note)
        res.status(200).send(note)
    } catch (e) {
        res.status(500).send({e})
    }
})

app.patch("/api/notes/:id", async (req, res) => {
    try {
        const note = await NotesModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200)
    } catch (e) {
        res.status(500).send({e})
    }
})

//TODO: fix delete method
app.delete("api/notes/:id", async (req, res) => {
    try {
        const note = await NotesModel.findByIdAndDelete(req.params.id)
        if(!note){
            return res.status(400).send("Not found")
        }
        console.log("Item deleted: " + note)
        res.status(204).send()
    } catch (e) {
        res.status(500).send({e})
    }
})

app.listen(5000, () => {
    console.log("server running on localhost: 5000")
})
