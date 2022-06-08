// Importation des ressources 

const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

// Importation des controllers 

const commentsCtrl = require('../controllers/Comments'); 

// Création des routes 

router.get("/:postId", commentsCtrl.getComment);
router.post("/", auth.token, commentsCtrl.postComment);
router.delete("/:commentId", auth.token, commentsCtrl.deleteComment);

module.exports = router;