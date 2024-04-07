import mongoose from "mongoose";
import dotenv from "dotenv";


export function connectToDb() {
    dotenv.config()
    const url: string = process.env.DATABASE_URL as string

    try {
        mongoose.connect(url)
            .then(() => console.log("Connected to MongoDB"))
            .catch((e) => console.log(e))
    } catch (err) {
        // @ts-ignore
        console.log("Error when connecting: " + err.message)
    }

    const dbConnection = mongoose.connection

    dbConnection.once("open", (_) => {
        console.log("Connected to db")
    })

    dbConnection.on("error", (err) => {
        console.log("connection error " + err.message)
    })

    return
}

