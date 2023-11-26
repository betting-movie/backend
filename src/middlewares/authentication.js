const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  console.log("Req", req);
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = user; // Attach the user object to the request for further use
    next();
  });
};
