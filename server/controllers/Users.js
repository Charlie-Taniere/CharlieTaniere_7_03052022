
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign }  = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10)
  .then((hash) => {
    const user = new Users({
      username: username,
      email: email,
      role: 0,
      password: hash,
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }));
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
try {
  if (!user) return res.status(404).json({ error: "L'utilisaeur n'existe pas!" });
} catch (error) {console.log(error)} 

try  {
  if (user) {
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) return res.status(403).json({ error: "Mot de passe erroné" });


    const accessToken = sign(
      { username: user.username, id: user.id, role: user.role, },
      "SUPERSECRETTOKEN"
    );
    return res.status(200).json({ token: accessToken, username: username, id: user.id, role: user.role, });
  });

} else {
  return res.status(500).json({ error: "Le serveur a rencontré une situation qu'il ne sait pas traiter." });
}
} catch (error) {console.log(error)}
  
};


  exports.auth = (req, res) => {

     res.json(req.user);

    };
  

  exports.basicInfo = async (req, res, next) => {

  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
};

exports.changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });
try {
  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Mauvais mot de passe" });

    bcrypt.hash(newPassword, 10).then(async (hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("Mot de passe changé");
    });
  });
} catch (error) {console.log("Problème: " + error)}
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  const userExist = await Users.findOne({ where: { id: userId } });
try {
  if (!userExist) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    await Users.destroy({
      where: {
        id: userId,
      },
    });
    res.json(`L'utisateur n° ${userId} a bien été supprimé`);
  }
} catch (error) {console.log("Problème: " + error)}
};