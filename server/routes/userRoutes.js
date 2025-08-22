const express = require("express");
const { register, login } = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");
const authorizeRoles = require('../middleware/roleMiddleware')
const router = express.Router();
// const verifyToken = require('../middleware/auth')

router.post("/register", register);
router.post("/login", login);










//role based routes



router.get("/admin", verifyToken , authorizeRoles('admin'),(req, res) => {
  res.json({ message: "welcome admin" });
});

router.get("/agent", verifyToken , authorizeRoles('agent', "admin"),(req, res) => {
  res.json({ message: "welcome agent" });
});

router.get("/user", verifyToken, authorizeRoles('user' , 'admin' ,'agent'), (req, res) => {
  res.json({ message: " welcome user" });
});

module.exports = router;
