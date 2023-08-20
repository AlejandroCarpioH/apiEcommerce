export default function schemaProduct(required = true) {
    const schema = {
        "type": "object",
        "properties": {
            "productName": { "type": "string" },
            "stock": { "type": "integer", "minimum": 0 },
            "price": { "type": "number", "minimum": 0 },
            "imgUrl": {
                "type": "object",
                "properties": {
                    "small": { "type": "string" },
                    "medium": { "type": "string" },
                    "large": { "type": "string" }
                }
            }
        }
    }
    return required ? {
        ...schema, "required": ["productName", "stock", "price", "imgUrl"]
    } : schema

}