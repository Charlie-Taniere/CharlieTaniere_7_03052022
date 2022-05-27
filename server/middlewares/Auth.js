const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const accessToken = req.header("accessToken");
  console.log(req.header.authorization)
  console.log(accessToken)

  if (!accessToken) {
    return res.json({
      error: "User not logged in!"
    });
  }

  try {
    const validToken = jwt.verify(accessToken, "SUPERSECRETTOKEN");
    req.user = validToken;
    console.log(validToken)
    if (validToken) {
      return next();
    }

  } catch (err) {
    res.status(401).json(err.message);
  }
};

