import { MongoClient, ServerApiVersion } from 'mongodb'

export default async function mongodb() {

    const uri = "mongodb+srv://alejandro:samanosuke@cluster0.wwehbtc.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client;
}


