import express from 'express'
import hasOwnProperties from '../middleware/hasProperties.js'
import { hasPropertiesUpdate } from '../middleware/hasPropertiesUpdate.js'
import hasToken from '../middleware/hasToken.js'

import {
    getProducts,
    getProductsForId,
    deleteProduct,
    insertProducts,
    updateProduct,
    deleteAllProducts
} from '../controller/productController.js'

const router = express.Router()

router.get('/api/v1/test', hasToken, (req, res) => {
    res.send("autorizado nuevo")
})



router.get('/api/v1/products', getProducts)

router.get('/api/v1/products/:id', getProductsForId)

router.delete("/api/v1/products/:id", deleteProduct)

router.delete("/api/v1/productsAll", deleteAllProducts)

router.post('/api/v1/products', hasOwnProperties, insertProducts)

router.put('/api/v1/products/:id', hasPropertiesUpdate, updateProduct)

export { router }