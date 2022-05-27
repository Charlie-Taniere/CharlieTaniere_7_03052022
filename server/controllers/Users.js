
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10)
  .then((hash) => {
    const user = new Users({
      username: username,
      email: email,
      password: hash,
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }));
};


exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "L'utilisaeur n'existe pas!" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Mot de passe érroné" });

    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      "SUPERSECRETTOKEN"
    );
    // res.json({ token: accessToken, username: username, id: user.id });
    
    res.cookie('token', accessToken, { httpOnly: true, maxAge: 1209600000, signed: true })
  });
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

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then(async (hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
};

