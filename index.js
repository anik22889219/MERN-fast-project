const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.port ||5000;

/*
user :mongouser1
pass : o75g7Wz4LOYM1QUW
*/



const uri = "mongodb+srv://mongouser1:o75g7Wz4LOYM1QUW@product1.tvaghpk.mongodb.net/?retryWrites=true&w=majority&appName=product1";

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
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("usersExpress").collection('user');

    app.get('/user', async(req, res) => {
      const query ={};
      const carsor = database.find(query)
      const result = await carsor.toArray()
      res.send(result)
    })
    app.get('/user/:id', async(req, res) => {
      const id = req.params.id;
      const query ={_id: new ObjectId(id) };
      const carsor = database.find(query)
      const result = await carsor.toArray()
      res.send(result)
    })


    app.post('/user', async(req, res) => {
        const newUser = req.body;
        console.log('adding user',newUser);
        const result = await database.insertOne(newUser);
        res.send(result)
      })


      app.delete('/user/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await database.deleteOne(query);

        res.send(result)
      })


  } finally { 
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Running my node card server no');
})
app.listen(port,()=>{
    console.log('yes am done')
})



