const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRoutes")
const protectedRoutes = require("./routes/protectedRoutes");
const taskRoutes = require("./routes/taskRoutes")

dotenv.config()
// Middleware to parse JSON
app.use(express.json());


app.listen(process.env.PORT, (err)=>{
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.PORT);
})

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", userRoutes)
app.use("/api", protectedRoutes);
app.use("/api", taskRoutes)