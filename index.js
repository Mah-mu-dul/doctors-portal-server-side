const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000





app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dn7dh.mongodb.net/?retryWrites=true&w=majority;`
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('doctors_portal').collection('services')

        app.get('/services', async (req, res) => {
            const query = {}
            const corsor = serviceCollection.find(query)
            const services = await corsor.toArray()
            res.send(services)

        })

    }
    finally {

    }

}
run().catch(console.dir())

app.get('/', (req, res) => {
    res.send('its working !')
})

app.listen(port, () => {
    console.log(`all ok`)
})