import schemaProduct from "../models/schemaProduct.js"
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

        let schema = schemaProduct(true)
        schema = { ...schema, additionalProperties: false }

        if (!req.body[0]) {
            res.send('enviar un array de objetos')
            return
        }

        const { body } = req
        const result = body.every(data => validate(data, schema, { allowUnknownAttributes: false }).valid)

        // const result = validate(body, schema, { allowUnknownAttributes: false })

        result ? next() : res.json(
            {
                message: "formato incorrecto y o tipos incorrectos",
                minimunFormatAndType:
                {
                    productName: "string",
                    price: "number",
                    stock: "number",
                    description: "string",
                    category: "string",
                    imgUrl: { "small": "string", "medium": "string", "large": "string" }
                }
            }
        )
    } catch (error) {
        res.json(error)
    }



}