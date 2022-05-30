const express = require("express");
const router = express.Router();
const { validateToken } = require('../middlewares/Auth');

const userCtrl = require('../controllers/Users'); 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/auth", validateToken, userCtrl.auth);
router.get("/basicinfo/:id", userCtrl.basicInfo);
router.put("/changepassword", validateToken, userCtrl.changePassword);

module.exports = router;