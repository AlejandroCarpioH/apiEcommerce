import productService from "../service/productService.js"

const getProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const response = await productService().getAllProducts({ limit, offset })
        res.json(response)
    } catch (error) {
        res.status(500).send(`error ${error}`)
    }
}
const getProductsForId = async (req, res) => {
    try {
        const id = req.params.id
        const response = await productService().getProductForId({ id })
        res.json(response)
    } catch (error) {
        res.status(500).send(` ${error}`)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await productService().deleteProduct({ id })
        res.send(`${result} eliminados`)

    } catch (error) {
        res.send(`no se elimino ninguno`)
    }

}

const insertProducts = async (req, res) => {

    try {
        // console.log(req.body)
        const products = req.body
        const response = await productService().insertProducts({ products })
        res.json(response)
    } catch (Error) {
        res.send(`error ${Error}`)
    }
}

const updateProduct = async (req, res) => {
    // res.send(req.body)

    try {
        const id = req.params.id
        const values = req.body
        const result = await productService().updateProduct({ id, values })
        res.json({ response: result })
    } catch (error) {
        console.log(error)
        res.send("id incorrecto")
    }
}
// borrar en produccion
const deleteAllProducts = async (req, res) => {
    try {

        const result = await productService().deleteAllProducts()
        res.json({ messaje: `se han borrado ${result} datos` })
    } catch (error) {
        res.send("error al borrar")
    }
}

export { getProducts, getProductsForId, deleteProduct, insertProducts, updateProduct, deleteAllProducts }