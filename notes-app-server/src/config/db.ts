import mongoose from "mongoose";
import dotenv from "dotenv";


export function connectToDb() {
    dotenv.config()
    const url = process.env.DATABASE_URL as string

    try {
        mongoose.connect(url)
            .then(() => console.log("Connected to MongoDB"))
            .catch((e) => console.log(e))

        const dbConnection = mongoose.connection

        dbConnection.once("open", (_) => {
            console.log("Connected to db")
        })

        dbConnection.on("error", (err) => {
            console.log("connection error " + err.message)
        })

        return
    } catch (e) {
        console.log("Error when connecting: " + e)
    }
}

