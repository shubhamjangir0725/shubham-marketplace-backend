const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://shubhamadmin:Shubham122333@cluster0.qzdk6sv.mongodb.net/shubhamDB?retryWrites=true&w=majority")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: String
});

const User = mongoose.model("User", UserSchema);


// =========================
// SIGNUP API
// =========================
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User Registered Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Signup Failed" });
    }
});


// =========================
// LOGIN API
// =========================
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});


// Test Route
app.get("/", (req, res) => {
    res.send("Backend is Running 🚀");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
