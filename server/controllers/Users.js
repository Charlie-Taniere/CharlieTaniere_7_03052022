
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
  console.log('body request: ',req.body)

  const user = await Users.findOne({ where: { username: username } });
  console.log("ligne 28", user)

  if (!user) return res.json({ error: "L'utilisaeur n'existe pas!" });
  if (user) {
    console.log("ligne 32", user)
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) return res.json({ error: "Mot de passe érroné" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "SUPERSECRETTOKEN"
    );
    return res.json({ token: accessToken, username: username, id: user.id });
    //     res.json({username: username, id: user.id });
    // res.cookie('token', accessToken, { httpOa&nly: true, maxAge: 1209600000})
  });
} else {
  return((error) => console.log('error46', error))
}

  
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

