const express = require ('express');
const cors =require('cors');
const app=express();
require('dotenv').config()
const port =process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rin8xcl.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();
const mediaCollection=client.db("Uploady_SocialMedia").collection("media");
// const menuCollection = client.db("billing_Resturant").collection("menu");


app.get('/media',async(req,res)=>{
  const result= await mediaCollection.find().toArray();
  res.send(result);
})

 app.post('/media',async(req,res)=>{
  const addMedia=req.body;
  const result=await mediaCollection.insertOne(addMedia);
  res.send(result);
 })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('user mangement runnign')
});
app.listen(port,()=>{
    console.log(`server is runnig on port :${port}`)
})