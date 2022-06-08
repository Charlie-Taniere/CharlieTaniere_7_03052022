// Importation de la ressources 

const jwt = require("jsonwebtoken");

// Middleware d'authentification 

module.exports.token = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "L'utilisateur n'est pas connecté!" });

  try {
    const validToken = jwt.verify(accessToken, "Akde3qff52486KIHJDZQ5241deJ");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

