// Importation des ressources 

const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

// Importation des controllers 

const userCtrl = require('../controllers/Users'); 

// Création des routes 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/auth", auth.token, userCtrl.auth);
router.get("/basicinfo/:id", userCtrl.basicInfo);
router.put("/changepassword/", auth.token, userCtrl.changePassword);
router.delete("/deleteuser/:id", userCtrl.deleteUser);

module.exports = router;