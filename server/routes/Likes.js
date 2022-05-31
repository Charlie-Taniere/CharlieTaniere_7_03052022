const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

const likeCtrl = require('../controllers/Likes'); 

router.post("/", auth.token, likeCtrl.like);


module.exports = router;