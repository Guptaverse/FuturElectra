const express = require("express");
const mongoose = require('mongoose');
const route = require("./routes/route");
const cors = require('cors')
require('dotenv').config();

const app = express();
const port = 8080;
const mongoURI = process.env.MONGO_URI; 

// Connecting with MongoDB
async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB(mongoURI);

app.use(express.json());
app.use("/api", route);

//health check for backend
app.get("/",(req,res)=>{
  res.send("Backend is Live 👨‍💻 ✔")
} );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
