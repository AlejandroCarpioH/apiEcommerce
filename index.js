import express from "express";
import { router } from "./routes/productRoutes.js";
import cors from 'cors'

const app = express()
const port = 8080
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(port, () => {
    console.log("server iniciado")
})