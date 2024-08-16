const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwmcx9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   
    const countryCollection = client.db('countryDataDB').collection('country');
    const countriesCollection = client.db('countryDataDB').collection('countries');
    const pituresCollection = client.db('countryDataDB').collection('pitures');



    app.get('/countries', async(req, res) =>{
      const cursor = countriesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/countries/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await countriesCollection.findOne(query);
      res.send(result)
    })
    app.get('/selectedCountry/:countryName', async(req, res) =>{
      const countryName = req.params.countryName;
      const query = {countryName: countryName}  
      console.log(query)      
      const result = await countryCollection.find(query).toArray();
      console.log(result)
      res.send(result);

    })
    app.get('/selectedDetails/:countryName', async(req, res) =>{
      const countryName = req.params.countryName;
      const query = {countryName: countryName}  
      console.log(query)      
      const result = await countryCollection.findOne(query);
      console.log(result)
      res.send(result);

    })
 

    app.get('/country', async(req, res) =>{
      const cursor = countryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/country/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await countryCollection.findOne(query);
      res.send(result);

    })
    app.get('/pictures', async(req, res) =>{
      const cursor = pituresCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.post('/country', async(req, res) =>{
      const newTravel = req.body;
      console.log(newTravel)
      const result = await countryCollection.insertOne(newTravel);
      res.send(result)

    })

    app.put('/country/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true};
      const update= req.body;
      const updateAdd ={
        $set: {
          name:update.name, 
          countryName:update.countryName, 
          location:update.location, 
          description:update.description, 
          seasonality:update.seasonality, 
          travelTime:update.travelTime, 
          totalVisitors:update.totalVisitors, 
          image:update.image, 
          average:update.average
        }
      }
      const result = await countryCollection.updateOne(filter, updateAdd, options);
      res.send(result); 
    })

    app.delete('/country/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await countryCollection.deleteOne(query);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Discovery beautiful country soon')
})


app.listen(port, (req, res) =>{
    console.log(`This is a beautiful country, see ${port}`)
})
