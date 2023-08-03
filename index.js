import express from "express";
import { router } from "./routes/productRoutes.js";
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()


const app = express()
const port = process.env.PORT || 80
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(port, () => {
    console.log("server iniciado")
})