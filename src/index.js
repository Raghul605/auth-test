const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes")

dbConnect
const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

//Start the server

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});