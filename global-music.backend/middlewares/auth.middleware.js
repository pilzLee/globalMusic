const AuthService = require("../services/auth.service");

const authMiddleware = async (req, res, next) => {
  const user = await AuthService.validateReq(req);
  if (!user) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
};

module.exports = authMiddleware;
