const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedToken;
      console.log(req.user, 'decoded user');
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid or expired" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
