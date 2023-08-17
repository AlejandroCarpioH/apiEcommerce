export function hasPropertiesUpdate(req, res, next) {

    const data = req.body

    const model = {
        productName: 'string',
        price: 'number',
        stock: 'number',
        imgUrl: 'object'
    }
    const propertiesModel = Object.keys(model)
    const values = data
    let result = []
    for (const key of propertiesModel) {
        if (Object.hasOwnProperty.call(values, key)) {
            result.push(typeof values[key] === model[key])
        }
    }
    const properties = result.every(v => v)

    properties ? next() : res.json({ message: "no cumple con el formato", format: { ...model, imgUrl: "object {} || array []" } })


}