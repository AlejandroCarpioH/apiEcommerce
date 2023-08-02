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
        const products = req.body
        const response = await productService().insertProducts({ products })
        res.json(response)
    } catch (Error) {
        res.send(`error`)
    }
}

export { getProducts, getProductsForId, deleteProduct, insertProducts }