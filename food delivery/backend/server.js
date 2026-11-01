import "dotenv/config";
import express from "express"
import cors from "cors"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"



// app config
const app = express()
const port = 4000
const uploadsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "uploads")

// middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static(uploadsDir))

app.get("/",(req,res)=>{
    res.send("API Working")
})

const startServer = async () => {
    await connectDB()
    app.listen(port,()=>{
        console.log(`Server Started on http://localhost:${port}`)
    })
}

startServer()
