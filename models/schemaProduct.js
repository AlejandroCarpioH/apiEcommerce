export default function schemaProduct(required = true) {

    let properties = {
        "properties": {
            "small": { "type": "string" },
            "medium": { "type": "string" },
            "large": { "type": "string" }
        }
    }
    properties = required ? { ...properties, "required": ["small", "medium", "large"] } : properties

    const schema = {
        "type": "object",
        "properties": {
            "productName": { "type": "string" },
            "stock": { "type": "integer", "minimum": 0 },
            "price": { "type": "number", "minimum": 0 },
            "category": { "type": "string" },
            "description": { "type": "string" },
            "imgUrl": {
                "type": "object",
                ...properties
            }
        }
    }
    // console.log(properties)
    return required ? {
        ...schema, "required": ["productName", "stock", "price", "category", "description", "imgUrl"]
    } : schema

}