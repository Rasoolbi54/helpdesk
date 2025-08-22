    const express = require("express");
const { verifyToken } = require("../middleware/auth");
const checkRole = require('../middleware/roleMiddleware');
const { getConfig, updateConfig } = require('../controllers/configController');

const router = express.Router();

// Only Admin can view & update system config
router.get("/", verifyToken, checkRole(["admin"]), getConfig);
router.put("/", verifyToken, checkRole(["admin"]), updateConfig);

module.exports = router;
