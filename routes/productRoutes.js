import express from 'express'
import hasOwnProperties from '../middleware/hasProperties.js'
import { hasPropertiesUpdate } from '../middleware/hasPropertiesUpdate.js'
import {
    getProducts,
    getProductsForId,
    deleteProduct,
    insertProducts,
    updateProduct,
    deleteAllProducts
} from '../controller/productController.js'

const router = express.Router()


router.get('/api/v1/test', (req, res) => {
    res.send("mensaje de prueba")
})

router.get('/api/v1/products', getProducts)

router.get('/api/v1/products/:id', getProductsForId)

router.delete("/api/v1/products/:id", deleteProduct)

router.post('/api/v1/products', hasOwnProperties, insertProducts)

router.put('/api/v1/products/:id', hasPropertiesUpdate, updateProduct)
// router.put('/api/v1/products/:id', (req, res) => {
//     res.send("asd")
// })
// router.put('/api/v1/products/:id', (req, res) => {

//     const body = req.body

//     // const result = validate(body, schema)

//     // console.log(result.valid)


//     res.send("normal")

// })

// borrar al subir en produccion

router.delete("/api/v1/productsAll", deleteAllProducts)

export { router }