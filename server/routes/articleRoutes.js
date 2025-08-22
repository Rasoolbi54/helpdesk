const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { createArticle, getArticles, updateArticle } = require("../controllers/articleController");
const checkRole = require('../middleware/roleMiddleware');

const router = express.Router();

// Create Article (Admin & Agent only)
router.post("/articles", verifyToken, checkRole("admin", "agent"), createArticle);

// Get Published Articles (everyone, no login needed)
router.get("/articles", getArticles);

// Update Article (Admin & Agent only)
router.put("/articles/:id", verifyToken, checkRole("admin", "agent"), updateArticle);

module.exports = router;
