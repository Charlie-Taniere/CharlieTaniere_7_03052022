// Importation des ressources

const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');
const multer = require("../middlewares/Multer")

// Importation des controllers

const postCtrl = require('../controllers/Posts'); 

// Création des routes 

router.get('/', auth.token, postCtrl.allPostsAndLikes);
router.get('/byId/:id', postCtrl.onePost);
router.get("/byuserId/:id", postCtrl.listOfPosts);
router.post("/", auth.token, multer, postCtrl.createPost);
router.put("/byId/:id", auth.token, multer, postCtrl.modifyPost);
router.delete("/:postId", auth.token, postCtrl.deletePost);


module.exports = router;