const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

const userCtrl = require('../controllers/Users'); 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/auth", auth.token, userCtrl.auth);
router.get("/basicinfo/:id", auth.token, userCtrl.basicInfo);
router.put("/changepassword", userCtrl.changePassword);

module.exports = router;