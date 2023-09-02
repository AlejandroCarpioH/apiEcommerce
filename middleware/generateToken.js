import mongodb from '../service/mongodb.js'
import jwt from 'jsonwebtoken'
export default async function generateToken(req, res, next) {


    const { username, password } = req.body


    if (username === undefined || password === undefined) {
        res.json({ message: "se necesita usuario y contraseña", format: { username: "string", password: "string" } })
        return
    }
    const client = await mongodb()

    const db = client.db("users")
    const collection = db.collection("user")
    const response = await collection.findOne({ username: username })

    if (!response) {
        res.send("usuario no valido")
        return
    }
    const { password: pass } = response
    if (password != pass) {
        res.send("usuario no valido")
        return
    }

    const secret = process.env.SECRET_KEY
    const date = new Date()
    date.setHours(date.getHours() + 12)

    const opcionesDeFormato = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    const formatDate = date.toLocaleDateString("es-ES", opcionesDeFormato)
    const token = jwt.sign({ formatDate }, secret, { expiresIn: "12h" })

    res.json(
        {
            token: token,
            expired: formatDate
        }
    )

}