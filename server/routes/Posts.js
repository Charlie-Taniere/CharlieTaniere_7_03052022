const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');
const multer = require("../middlewares/Multer")


const postCtrl = require('../controllers/Posts'); // 

router.get('/', auth.token, postCtrl.allPostsAndLikes);
router.get('/byId/:id', postCtrl.onePost);
router.get("/byuserId/:id", postCtrl.listOfPosts);
router.post("/", auth.token, multer, postCtrl.createPost);
router.put("/title", auth.token, postCtrl.modifyPostTitle);
router.put("/postText", auth.token, postCtrl.modifyPostBody);
router.delete("/:postId", auth.token, postCtrl.deletePost);

module.exports = router;