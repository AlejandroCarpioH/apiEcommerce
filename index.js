import express from "express";
import { router } from "./routes/productRoutes.js";
import cors from 'cors'
import dotenv from 'dotenv'
import validateJson from "./middleware/validateJson.js";
import hasToken from "./middleware/hasToken.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 80

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(validateJson);

app.use('/', router)

app.listen(port, () => {
    console.log("server iniciado")
})