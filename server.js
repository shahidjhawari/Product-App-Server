const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/Product");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb+srv://shahidjhawari:shahidjhawari@cluster0.mzbys.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error: ", err));

// Routes
app.get("/", async (req, res) => {
  try {
    res.send("Welcome");
  } catch (error) {
    res.send("Not Welcome");
  }
});

app.post("/api/products", async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProduct = new Product({ name, description });
    await newProduct.save();
    res.status(201).json({ message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error uploading product", error });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
