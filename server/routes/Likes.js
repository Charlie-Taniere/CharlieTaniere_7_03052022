const express = require("express");
const router = express.Router();
// const { validateToken } = require('../middlewares/Auth');

const likeCtrl = require('../controllers/Likes'); 

router.post("/", likeCtrl.like);


module.exports = router;