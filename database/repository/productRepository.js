import mongodb from "../../service/mongodb.js"
class productRepository {

    product = Array()

    async getAllProducts({ limit, offset }) {
        const client = await mongodb()
        const db = client.db("ecommerce")
        const collection = db.collection("products")
        const response = await collection.find({}).skip(offset).limit(limit).toArray()
        client.close()
        this.product.push(response)
        return this.product
    }

    insertProducts(products) {
        this.product.push
    }

}

export default new productRepository()