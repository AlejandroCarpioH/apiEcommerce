import mongodb from "../service/mongodb.js"
import schemaProduct from "./schemaProduct.js"
import { validate } from "jsonschema"

export default function hasOwnProperties(req, res, next) {
    /* valores minimos que debe tener el json recivido */
    // productName
    // price
    // stock
    // imgUrl
    // const properties = ["productName", "price", "stock", "imgUrl"]
    // const data = req.body

    // const result = data.every(product => properties.every(property => product.hasOwnProperty(property)))
    // const productType = data.every(value => {
    //     // const values = { nombre: "asdad" }

    //     // console.log(Object.keys(values).length)

    //     return (
    //         typeof value.productName === 'string' &&
    //         typeof value.price === 'number' &&
    //         typeof value.stock === 'number' &&
    //         (
    //             typeof value.imgUrl === 'object' &&
    //             Object.keys(value).length > 0
    //         )
    //     )
    // })
    try {

        const schema = schemaProduct()
        // console.log(typeof req.body)


        if (!req.body[0]) {
            res.send('enviar un array de objetos')
            return
        }

        const { body } = req
        const result = body.every(data => validate(data, schema).valid)

        result ? next() : res.json(
            {
                message: "formato incorrecto y o tipos incorrectos",
                minimunFormatAndType:
                {
                    productName: "string",
                    price: "number",
                    stock: "number",
                    imgUrl: { "small": "string", "medium": "string", "large": "string" }
                }
            }
        )
    } catch (error) {
        res.json(error)
    }

}