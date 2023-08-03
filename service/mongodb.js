import { MongoClient, ServerApiVersion } from 'mongodb'


export default async function mongodb() {

    const uri = process.env.MONGODB_CREDENTIAL;
    const client = await MongoClient.connect(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client;
}


