const express = require("express");
const { authenticate, checkBlacklist } = require("../middlewares/authenticate");
const router = express.Router();

router.get("/protected", checkBlacklist, authenticate, (req, res) => {
    res.json({ message: "This is a protected route!", user: req.user });
});

module.exports = router;
