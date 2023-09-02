import jwt from 'jsonwebtoken'

export default function hasToken(req, res, next) {

    if (!req.headers['authorization']) {
        res.send("sin autorizacion")
        return
    }

    const [bearer, token] = req.headers['authorization'].split(' ');

    if (bearer != "Bearer") {
        res.send("formato incorrecto")
        return
    }


    const secret = process.env.SECRET_KEY

    jwt.verify(token, secret, (error, decode) => {
        if (error) {

            const { message, expiredAt } = error

            const opcionesDeFormato = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            };

            const date = new Date(expiredAt)
            const formatDate = date.toLocaleDateString("es-ES", opcionesDeFormato)

            return res.json({ message, expired: formatDate })
        }
        next()
        // res.json(decode)
    })


}