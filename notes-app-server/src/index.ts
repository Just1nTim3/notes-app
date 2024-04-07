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

app.get("/api/notes/getAll", async (req, res) => {
    try {
        const notes = await NotesModel.find({})
        console.log(notes)
        res.send(notes)
    } catch (e) {
        res.status(500).send({e})
    }
})

app.listen(5000, () => {
    console.log("server running on localhost: 5000")
})
