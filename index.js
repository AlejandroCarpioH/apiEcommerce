import express from "express";
import { router } from "./routes/productRoutes.js";
import cors from 'cors'
// import validateJson from "./middleware/validateJson.js";
import dotenv from 'dotenv'
import validateJson from "./middleware/validateJson.js";
dotenv.config()

const app = express()
const port = process.env.PORT || 80
// function validateJson(req, res, next) {
//     console.log(req)
//     try {
//         console.log(JSON.parse(req.body))
//         next()
//     } catch (error) {
//         res.status(400).send("error en el formato del json")
//     }
// }

app.use(cors())
// app.use(express.text())
// app.use(validateJson)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(validateJson);

app.use('/', router)

app.listen(port, () => {
    console.log("server iniciado")
})