const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const { authenticate, checkBlacklist, tokenBlacklist } = require("../middlewares/authenticate");
router.use(checkBlacklist);

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(400).json({ message: "Error registering user", error: err.message });
    }
});

// Login an existing user
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

// Logout a user
router.post("/logout", authenticate, (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(400).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    tokenBlacklist.add(token);
    res.status(200).json({ message: "Logged out successfully" });
});



module.exports = router;
