require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

app.use(cors())
app.use(express.json())

app.get('/' , (req , res)=> {
    res.send('server running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x7kxg5y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const verifyToken = async (req , res , next) =>{
  const authHeader  = req.headers.authorization;
  if(!authHeader){
      return res.status(401).send({message: 'unauthorized access'})

  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , function(error , decoded){
    if(error){
      return res.status(403).send({message: 'frohibiden'})
    }
    req.decoded = decoded;
   
    next()
  })


}

//  require('crypto').randomBytes(64).toString("hex")

async function run (){
  try {
     const serviceCollection = client.db('geniusCar').collection('services')
     const ordersCollection = client.db('geniusCar').collection('orders')
     app.get('/services' , async (req , res)=> {
        // const query = {price: {$lt:100}};
        // const query = {price: {$gte:200}};
        // const query = {price: {$in:[40 ,20, 150]}};
        const search = req.query.search;
        const query = {
          $text : {
            $search: search
          }
        }
        console.log(search);
        const order = req.query.order === "asc" ? 1 : -1
        const cursor = serviceCollection.find(query).sort({price: order});
        const services = await cursor.toArray()
        res.send(services);
     })
    
     app.get('/services/:id' , async(req , res)=>{
      const id = req.params.id;
      console.log(id);
      const query = {_id:ObjectId(id)}
      const result = await serviceCollection.findOne(query)
      res.send(result)
      console.log(result); 
     }) 


     app.post('/jwt' , async(req , res)=>{
      const user = req.body;
      const token = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET , {expiresIn:"1d"})
      res.send({token}) 
     })

      // orders api
      app.get('/orders' , verifyToken , async(req , res)=>{
        const decoded = req.decoded;
        console.log( "in side decode",decoded);
           if(decoded.email !== req.query.email){
            res.status(403).send({message:"unauthorize access"})
           }

        
        let query = {}
        if(req.query.email){
          query = {
            email:req.query.email
          }
        } 
        const cursor = ordersCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
      })
       
      app.post('/orders' , verifyToken, async(req , res)=>{
        const order = req.body;
        const result = await  ordersCollection.insertOne(order)
        res.send(result)
      })

      app.patch('/orders/:id' , async(req , res)=>{
        const id = req.params.id;
        const status = req.body.status;
        const query = {_id: ObjectId(id)}
        const updatedDoc = {
          $set:{
            status:  status
          }
        }
        const result = await ordersCollection.updateOne(query , updatedDoc);
        res.send(result)
      })

      app.delete('/orders/:id' , async (req , res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await ordersCollection.deleteOne(query)
        res.send(result)
      })
    
  } 

  finally{

  }
}

run().catch(error=> console.log(error))



app.listen(port, ()=>{
    console.log(`server runing in port ${port}`)
})




// 9TjxFaCODxjM5qvy