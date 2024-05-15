const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const Schema = mongoose.Schema;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const PORT = 6060
DB_URI = "mongodb+srv://Admin:Admin123@cluster0.ao8agug.mongodb.net/"




const UserSchema = new Schema({
    username: String, 
    password: String,
    email: String, 
    profileImg: String, 
    balance: Number, 
    role: String, 
    basketItems: Array
},{timestamps:true});

const MessageSchema = new mongoose.Schema({
    fullName:String, 
    email:String, 
    title:String, 
    message:String
},{timestamps:true});

const OrderSchema = new mongoose.Schema({
    userId:String, 
    totalPrice:String, 
    status:String, 
    items:Array 
},{timestamps:true});

const CategorySchema = new mongoose.Schema({
    name: String, 
    
},{timestamps:true});

const ProductSchema = new mongoose.Schema({
    name: String, 
    salePrice:Number, 
    costPrice:Number, 
    imgSrc:String, 
    discountPercentage:Number, 
    description:String, 
    categoryId:String, 
    stock:Number
    
},{timestamps:true});


const UserModel = mongoose.model('Users', UserSchema);
const MessageModel = mongoose.model('Messages', MessageSchema);
const OrderModel = mongoose.model('Orders', OrderSchema);
const CategoryModel = mongoose.model('Categorys', CategorySchema);
const ProductModel = mongoose.model('Product', ProductSchema);

// User Reguest
app.get("/api/users", async (req, res) => {
    const users = await UserModel.find();
  
    if (users.length > 0) {
      res.status(200).send({
        message: "success",
        data: users,
      });
    } else {
      res.send({
        message: "not found",
        data: null,
      });
    }
  });

app.post("/api/users", async (req, res) => {
    console.log(req.body);
    const tag = new UserModel(req.body);
    await tag.save();
    res.send({
      message: "posted",
      data: tag,
    });
  });
  app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    let response;
    try {
      response = await UserModel.findByIdAndDelete(id);
    } catch (error) {
      res.send({
        error: error,
      });
    }
    res.send({
      message: "deleted",
      response: response,
    });
  });
  app.patch("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const response = await UserModel.findByIdAndUpdate(id, req.body);
    res.send({
      message: "updated",
      response: response,
    });
  });
//   -----------------------------------------------------------------------------------------
// Products Reguest
app.get("/api/products", async (req, res) => {
    const users = await ProductModel.find();
  
    if (users.length > 0) {
      res.status(200).send({
        message: "success",
        data: users,
      });
    } else {
      res.send({
        message: "not found",
        data: null,
      });
    }
  });

app.post("/api/products", async (req, res) => {
    const tag = new ProductModel(req.body);
    await tag.save();
    res.send({
      message: "posted",
      data: tag,
    });
  });
  app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    let response;
    try {
      response = await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      res.send({
        error: error,
      });
    }
    res.send({
      message: "deleted",
      response: response,
    });
  });
  app.patch("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const response = await ProductModel.findByIdAndUpdate(id, req.body);
    res.send({
      message: "updated",
      response: response,
    });
  });

  mongoose.connect(DB_URI).then(() => console.log("Connected!"))
.catch((err) => {
  console.log(err);
});
app.listen(PORT, () => {
    console.log(PORT)
})