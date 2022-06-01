// const jwt = require("jsonwebtoken");

// exports.token = (req, res, next) => {
//   try {
// const accessToken = req.headers.authorization.split(' ')[1];
// const decodedToken = jwt.verify(accessToken, "SUPERSECRETTOKEN")
// const userId = parseInt(decodedToken.userId)
// console.log(decodedToken)
//   if (req.body.userId && parseInt(req.body.userId) !== userId)
//    {return res.json({ error: "User not logged in!" });}
//   else {
//     next()
//   }
// }
// catch{res.status(401).json({error: "invalide requete"})}
// };

const jwt = require("jsonwebtoken");

module.exports.token = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = jwt.verify(accessToken, "SUPERSECRETTOKEN");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
