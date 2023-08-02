import express from 'express'
import mongodb from '../service/mongodb.js'
import { ObjectId } from 'mongodb'
import hasOwnProperties from '../middleware/hasProperties.js'
import { getProducts, getProductsForId, deleteProduct, insertProducts } from '../controller/productController.js'

const router = express.Router()

router.get('/api/v1/products', getProducts)

router.get('/api/v1/products/:id', getProductsForId)

router.delete("/api/v1/products/:id", deleteProduct)

router.post('/api/v1/products', hasOwnProperties, insertProducts)

export { router }