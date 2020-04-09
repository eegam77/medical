const express = require('express')
var Customer  = require('./models/customer');
var Product = require('./models/product');
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
// ************************ DB Connection ************************
var dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auto_reconnect: true
};
mongoose.connect("mongodb+srv://beingzero:beingzero@cluster0-i1mul.mongodb.net/test?retryWrites=true&w=majority", dbOptions);

mongoose.connection.on('connected', function () {
  console.log("Connected to DB");
});
mongoose.connection.on('error', function (err) {
  console.log("Error while connecting to DB: " + err);
});
// * DB Connection ************************
const app = express()
app.use(cors());

// ****** Body Parser **********
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
// Customer.remove({},function(err,con){
//   if(err)
//     console.log(err);
//   else
//     console.log("removed!");
// })
// Product.remove({},function(err,con){
//   if(err)
//     console.log(err);
//   else
//     console.log("removed!");
// })
// * Body Parser ********
app.get('/', (req, res) =>
{
    res.send("hello");
}
);
app.get('/customers', (req, res) => {
  Customer.find({},(err, docs) => {
    if (err) {
      console.log('Error while getting customers from DB in /customers ' + err);
      res.json({
        error: err
      });
    } else {
        res.json(docs);
    }
  });
})
app.post('/customers',(req,res)=>{
  var customer=new Customer({
    ShopName:req.body.ShopName,
    Amount:0
  })
  customer.save(function(err,NewC){
    if(err)
      console.log(err);
    else
      console.log(NewC);
  })
})
app.get('/products', (req, res) => {
  Product.find({},(err, docs) => {
    if (err) {
      console.log('Error while getting products from DB in /products ' + err);
      res.json({
        error: err
      });
    } else {
        res.json(docs);
    }
  });
})
app.post('/products',(req,res)=>{
  var product=new Product({
    Name:req.body.Name,
    Price:req.body.Price
  })
  product.save(function(err,NewP){
    if(err)
      console.log(err);
    else
      console.log(NewP);
  })
})
app.post('/item',(req,res)=>{
  index=req.body.ind;
  items=req.body.arr;
  amount=req.body.amount;
  Customer.updateOne({ShopName:index},{$push:{Items:items}},(err, docs) => {
    if (err) {
      console.log('Error while getting customers from DB in /customers ' + err);
    } else {
      Customer.find({ShopName:index},(err,docs)=>{
        if(err)
          console.log(err);
        else{
          docs[0].Amount=docs[0].Amount+amount;
          Customer.updateOne({ShopName:index},{Amount:docs[0].Amount},(err,docs)=>{
            if(err)
              console.log(err);
            else{
              Customer.find({ShopName:index},(err,docs)=>{
                if(err)
                  console.log(err);
                else{
                  console.log(docs);
              }
          })
        }
        console.log(JSON.stringify(docs));
        })
      }
    })
  }
})
})
app.post('/deleteItem',(req,res)=>{
  Arr=req.body.Arr;
  var updation = function(A){
    var ids=A.split('+');
    Customer.update({_id:ids[0]},{$pull:{Items:{_id:ids[1]}}},(err,docs)=>{
      if(err)
        console.log(err);
      else{
        Customer.find({_id:ids[0]},(err,docs)=>{
          if(err)
            console.log(err);
          else{
            docs[0].Amount=docs[0].Amount-ids[2]*ids[3];
            Customer.update({_id:ids[0]},{Amount:docs[0].Amount},(err,docs)=>{
              if(err)
                console.log(err);
              else{
                Customer.find({_id:ids[0]},(err,docs)=>{
                  if(err)
                    console.log(err);
                  else{
                    console.log(JSON.stringify(docs));
                }
            })
          }
        })
      }
    })
  }
})
}
  for(var i=0;i<Arr.length;i++){
    updation(Arr[i]);
  }
})
app.listen(3000,()=>console.log("Listening at 3000!"));