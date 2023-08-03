import mongodb from "../service/mongodb.js"

export default function hasOwnProperties(req, res, next) {
    /* valores minimos que debe tener el json recivido */
    // nameProduct
    // price
    // stock
    // imgUrl
    const properties = ["nameProduct", "price", "stock", "imgUrl"]
    const data = req.body

    const result = data.every(product => properties.every(property => product.hasOwnProperty(property)))
    const productType = data.every(value => {
        return (
            typeof value.nameProduct === 'string' &&
            typeof value.price === 'number' &&
            typeof value.stock === 'number' &&
            typeof value.imgUrl === 'string'
        )
    })

    result && productType ? next() : res.json([
        {
            message: "formato incorrecto y o tipos incorrectos",
            formato:
            {
                nameProduct: "String",
                price: "number",
                stock: "number",
                imgUrl: "string"
            }
        }
    ])

    const checkIfProductExists = () => {
        mongodb()
            .then(client => {
                const db = client.db("ecommerce")
                const collections = db.collection("products")
                collections.find({ nameProduct: "" }).toArray()
                    .then(product => {
                        res.send("Existe")
                    })
                    .catch(error => {
                        res.send("no existe")

                    })
            })
    }


}