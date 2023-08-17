import mongodb from "./mongodb.js"
import { ObjectId } from 'mongodb'
// import productRepository from "../database/repository/productRepository.js"
export default function productService() {

    // const client = await mongodb()
    // const db = client.db("ecommerce")
    // const collections = db.collection("products")
    // const getAllProducts = ({ limit = 0, offset = 0 }) => {

    //     productRepository
    //     return productRepository.getAllProducts({ limit, offset })

    // }
    const getConnection = async () => {
        const client = await mongodb()
        const db = client.db("ecommerce")
        const collections = db.collection("products")
        return { client, db, collections }

    }

    const getAllProducts = async ({ limit = 0, offset = 0 }) => {
        const { client, collections } = await getConnection()
        const response = await collections.find({}).skip(offset).limit(limit).toArray()
        client.close()
        return response
    }
    const getProductForId = async ({ id }) => {
        const { client, collections } = await getConnection()
        const response = await collections.find({ _id: new ObjectId(id) }).toArray()
        client.close()
        return response
    }

    const deleteProduct = async ({ id }) => {
        const { client, collections } = await getConnection()
        const result = await collections.deleteMany({ _id: new ObjectId(id) })
        client.close()
        return result.deletedCount
    }

    const insertProducts = async ({ products }) => {

        const { collections } = await getConnection()
        let insetNumber = 0
        let productReject = []
        let productEntered = []
        const promises = await products.map(async product => {
            const response = await collections.find({ nameProduct: product.nameProduct }).toArray()
            if (response.length === 0) {
                collections.insertOne(product)
                const { _id } = await collections.find({ nameProduct: product.nameProduct }).toArray()

                productEntered.push({ ...product, id: _id })
                insetNumber++
            } else {
                productReject.push(product)
            }
        })
        await Promise.all(promises)
        const nameReject = productReject.map(value => { return value.nameProduct })
        const productsEntered = productEntered.map(value => { return { name: value.nameProduct, id: value._id } })
        return (
            {
                message: { entered: insetNumber, reject: productReject.length },
                entered: { productsEntered },
                reject: nameReject
            }
        )
    }

    const updateProduct = async ({ id, values }) => {
        const { client, db, collections } = await getConnection()
        const filter = { _id: new ObjectId(id) }
        const update = { $set: values }
        const result = await collections.updateOne(filter, update)
        return result
    }

    // borrar en produccion
    const deleteAllProducts = async () => {
        const { collections } = await getConnection()
        const result = await collections.deleteMany({})
        return result.deletedCount
    }

    return { getAllProducts, getProductForId, deleteProduct, insertProducts, updateProduct, deleteAllProducts }
}


