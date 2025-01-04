const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const tokenBlacklist = new Set();

const checkBlacklist = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token && tokenBlacklist.has(token)) {
        return res.status(401).json({ message: "Token has been revoked. Please log in again." });
    }
    next();
};

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied! Token Missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied! Invalid Token Format" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token!" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticate, checkBlacklist, tokenBlacklist };
