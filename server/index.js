const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
    origin: [
        'http://localhost:5173',
    ],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());


// const uri = "mongodb+srv://<username>:<password>@cluster0.zjzxbzp.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // collections
        const artistsCollection = client.db('entertainmentDB').collection('artists');
        const previousEventsCollection = client.db('entertainmentDB').collection('previousEvents');

        app.get('/artists', async (req, res) => {
            const result = await artistsCollection.find().toArray();
            res.send(result);
        });
        app.get('/previousEvents', async (req, res) => {
            const result = await previousEventsCollection.find().toArray();
            res.send(result);
        });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Local API
app.get('/', (req, res) => {
    res.send('Hello from Entertainment Freak Server..👩‍🎤');
});

app.listen(port, () => {
    console.log(`Entertainment Freak is running on port ${port}`);
});