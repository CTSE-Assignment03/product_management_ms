require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const productRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_PRODUCTS_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed - " + err);
  });

app.get("/api/test", (req,res) => {res.send("Hello From TEST endpoint!")}) 
app.use("/api/products",productRoutes);

//event loop for server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });