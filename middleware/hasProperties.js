import mongodb from "../service/mongodb.js"

export default function hasOwnProperties(req, res, next) {

    // nameProduct
    // price
    // stock
    // imgUrl
    const properties = ["nameProduct", "price", "stock", "imgUrl"]
    const data = req.body


    const result = data.every(product => properties.every(property => product.hasOwnProperty(property)))

    // console.log("asdsd")
    // data.map(product => {
    //     values.map(value => {

    //     })

    //     // if (!v.hasOwnProperty("nameProduct") || !v.hasOwnProperty("stocl") || !v.hasOwnProperty("price") || !v.hasOwnProperty("imgUrl")) {
    //     //     value = false
    //     // }
    //     // value = v.hasOwnProperty("nameProduct")
    // })
    result ? next() : res.send("las propiedades del json no coinciden")

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