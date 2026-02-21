const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("YOUR_MONGODB_CONNECTION_STRING", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    location: String
});

const User = mongoose.model("User", UserSchema);

// Signup API
app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
