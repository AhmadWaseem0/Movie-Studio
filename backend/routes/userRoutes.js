const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= USERS ================= */

// 🔒 Protected route
router.get("/users", authMiddleware, userController.getAllUsers);

/* ================= AUTH ================= */

router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
