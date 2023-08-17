import mongodb from "../../../service/mongodb"

const getAllProducts = async ({ limit = 0, offset = 0 }) => {
    const client = await mongodb()
    const db = client.db("ecommerce")
    const collection = db.collection("products")
    const response = await collection.find({}).skip(offset).limit(limit).toArray()
    client.close()
    const product = new productRepository(response)
    return product.getAllProducts()
}