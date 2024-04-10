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
            res.status(400).send("Body can't be empty")
        }
        await note.save()
        console.log("saving item: " + note)
        res.status(200).send(note)
    } catch (e) {
        res.status(500).send({e})
    }
})

app.post("/api/notes/:id", async (req, res) => {
    try {
        console.log("updating note")
        const id = req.params.id

        console.log("id: " + id)
        console.log("body: " + JSON.stringify(req.body))

        if (id === undefined) {
            console.log("invalid id")
            res.status(400).send("Invalid id")
            return
        }

        const note = await NotesModel.findByIdAndUpdate(req.params.id, req.body)

        if (note) {
            console.log("old note: " + note)
            note.title = req.body.title
            note.content = req.body.content
            console.log("new note: " + note)

            console.log("Saving note")
            await note.save()
            console.log("saved note")
            return res.status(200).send(note)
        } else {
            res.status(404).send("Not found")
        }
    } catch (e) {
        res.status(500).send({e})
    }
})

//TODO: fix delete method
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const note = await NotesModel.findByIdAndDelete(req.params.id)
        if (!note) {
            return res.status(400).send("Not found")
        }
        console.log("Item deleted: " + note)
        res.status(200).send("ok")
    } catch (e) {
        res.status(500).send({e})
    }
})

app.listen(5000, () => {
    console.log("server running on localhost: 5000")
})
