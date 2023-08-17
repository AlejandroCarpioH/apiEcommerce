import mongodb from "../service/mongodb.js"

// test
class productDao {

    constructor() {
        mongodb().then(() => {

        })
        const db = client.db("ecommerce")
        const collection = db.collection("products")

    }
}






