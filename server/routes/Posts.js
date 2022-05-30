const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');


const postCtrl = require('../controllers/Posts'); // 

router.get('/posts', auth.token, postCtrl.allPosts);
router.get('/byId/:id', auth.token, postCtrl.onePost);
router.get("/byuserId/:id", auth.token,  postCtrl.listOfPosts);
router.post("/", auth.token, postCtrl.createPost);
router.put("/title", auth.token, postCtrl.modifyPostTitle);
router.put("/postText", auth.token, postCtrl.modifyPostBody);
router.delete("/:postId", auth.token, postCtrl.deletePost);

module.exports = router;