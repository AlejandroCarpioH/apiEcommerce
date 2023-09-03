export default function schemaProduct(required = true) {

    let properties = {
        "properties": {
            "small": { "type": "string" },
            "medium": { "type": "string" },
            "large": { "type": "string" }
        }
    }
    properties = required ? { ...properties, "required": ["small", "medium", "large"] } : properties
    console.log(properties)
    const schema = {
        "type": "object",
        "properties": {
            "productName": { "type": "string" },
            "stock": { "type": "integer", "minimum": 0 },
            "price": { "type": "number", "minimum": 0 },
            "imgUrl": {
                "type": "object",
                ...properties
            }
        }
    }
    // console.log(properties)
    return required ? {
        ...schema, "required": ["productName", "stock", "price", "imgUrl"]
    } : schema

}