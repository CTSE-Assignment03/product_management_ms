require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const productRoutes = require('./routes');
const ProductModel = require("./model");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_PRODUCTS_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed - " + err);
  });

app.get("/", (req,res) => {res.send("AI DEVIANTS - updated!")})
app.get("/fetchAll",async (req,res) => {
  try {
    const allBooks = await ProductModel.find();
    res.status(200).send({
      allBooks,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getAllBooks",
    });
  }
}) 
app.use("/api/products",productRoutes);

//event loop for server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });