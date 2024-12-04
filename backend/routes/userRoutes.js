const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid Email format" });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ error : "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created successfully! "});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user)
            return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({ error: "Invalid Credentials "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/me", authenticate, async (req, res) => {

    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;