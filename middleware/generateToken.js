import { getUser } from '../controller/productController.js'
import jwt from 'jsonwebtoken'
export default function generateToken(req, res, next) {


    const { username, password } = req.body


    if (username === undefined || password === undefined) {
        res.json({ message: "se necesita usuario y contraseña", format: { username: "string", password: "string" } })
        return
    }

    try {

        (async () => {
            const result = await getUser({ username, password })
            if (!result) {
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
                timeZone: 'America/Santiago'
            };
            const formatDate = date.toLocaleDateString("es-ES", opcionesDeFormato)
            const token = jwt.sign({ formatDate }, secret, { expiresIn: "12h" })

            res.json(
                {
                    token: token,
                    expired: formatDate
                }
            )

        })()

    } catch (error) {
        res.send(`error en la consulta ${error}`)
    }


}