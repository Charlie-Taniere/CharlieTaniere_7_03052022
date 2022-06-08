// Importation des ressources 
const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

// Importation des controllers 

const likeCtrl = require('../controllers/Likes'); 


// Création de la route 

router.post("/", auth.token, likeCtrl.like);


module.exports = router;