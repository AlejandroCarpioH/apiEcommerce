import mongodb from "./mongodb.js"
import { ObjectId } from 'mongodb'
export default function productService() {

    const getAllProducts = async ({ limit = 0, offset = 0 }) => {
        const client = await mongodb()
        const db = client.db("ecommerce")
        const collection = db.collection("products")
        const response = await collection.find({}).skip(offset).limit(limit).toArray()
        client.close()
        return response
    }
    const getProductForId = async ({ id }) => {


        const client = await mongodb()
        const db = client.db("ecommerce")
        const collection = db.collection("products")
        const response = await collection.find({ _id: new ObjectId(id) }).toArray()
        client.close()
        return response
    }

    const deleteProduct = async ({ id }) => {

        const client = await mongodb()
        const db = client.db("ecommerce")
        const collections = db.collection("products")
        const result = await collections.deleteMany({ _id: new ObjectId(id) })
        client.close()
        return result.deletedCount

    }
    const insertProducts = async ({ products }) => {

        let insetNumber = 0
        let json = []
        const client = await mongodb()
        const db = client.db("ecommerce")
        const collections = db.collection("products")
        const promises = await products.map(async product => {
            const response = await collections.find({ nameProduct: product.nameProduct }).toArray()
            if (response.length === 0) {
                collections.insertOne(product)
                insetNumber++
            } else {
                json.push(product)
            }
        })
        await Promise.all(promises)
        return (
            {
                message: `${insetNumber} ingresados y ${json.length} rechazados`,
                reject: json
            }
        )
    }


    return { getAllProducts, getProductForId, deleteProduct, insertProducts }
}


