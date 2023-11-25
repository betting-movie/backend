const jwt = require("jsonwebtoken");
// const roles = require("../../models/employee/roles");

function getToken(req) {
  if (
    req.headers.Authorization &&
    req.headers.Authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.Authorization.split(" ")[1];
  }
  return null;
}

exports.isAuthenticated = function (canAccess = []) {
  return async (req, res, next) => {
    try {
      next();
      const token = getToken(req);
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode.role);

      if (canAccess.includes(decode.role)) {
        next();
      } else {
        throw "Unauthenticated user";
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };
};
