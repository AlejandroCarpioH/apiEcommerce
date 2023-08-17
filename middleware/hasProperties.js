import mongodb from "../service/mongodb.js"

export default function hasOwnProperties(req, res, next) {
    /* valores minimos que debe tener el json recivido */
    // productName
    // price
    // stock
    // imgUrl
    const properties = ["productName", "price", "stock", "imgUrl"]
    const data = req.body

    const result = data.every(product => properties.every(property => product.hasOwnProperty(property)))
    const productType = data.every(value => {
        // const values = { nombre: "asdad" }

        // console.log(Object.keys(values).length)

        return (
            typeof value.productName === 'string' &&
            typeof value.price === 'number' &&
            typeof value.stock === 'number' &&
            (
                typeof value.imgUrl === 'object' &&
                Object.keys(value).length > 0
            )
        )
    })

    result && productType ? next() : res.json([
        {
            message: "formato incorrecto y o tipos incorrectos",
            minimunFormatAndType:
            {
                productName: "string",
                price: "number",
                stock: "number",
                imgUrl: []
            }
        }
    ])

    const checkIfProductExists = () => {
        mongodb()
            .then(client => {
                const db = client.db("ecommerce")
                const collections = db.collection("products")
                collections.find({ productName: "" }).toArray()
                    .then(product => {
                        res.send("Existe")
                    })
                    .catch(error => {
                        res.send("no existe")

                    })
            })
    }


}