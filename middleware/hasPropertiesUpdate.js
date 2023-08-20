import schemaProduct from "./schemaProduct.js"
import { validate } from "jsonschema"

export function hasPropertiesUpdate(req, res, next) {
    // console.log(req.body)
    try {
        // console.log('entro')
        // const data = req.body

        // const model = {
        //     productName: 'string',
        //     price: 'number',
        //     stock: 'number',
        //     imgUrl: 'object'
        // }
        // const propertiesModel = Object.keys(model)
        // const values = data
        // let result = []
        // for (const key of propertiesModel) {
        //     if (Object.hasOwnProperty.call(values, key)) {
        //         result.push(typeof values[key] === model[key])
        //     }
        // }
        // const properties = result.every(v => v)

        const schema = schemaProduct(false)

        const body = req.body

        // const result = body.every(data => validate(data, schema).valid)
        const result = validate(body, schema)

        console.log(result.valid)
        result.valid ? next() : res.json({ message: "no cumple con el formato", format: schema })
    } catch (error) {
        res.send(error)
    }


}