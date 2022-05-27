const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

const likeCtrl = require('../controllers/Likes'); 

router.post("/", auth, likeCtrl.like);


module.exports = router;