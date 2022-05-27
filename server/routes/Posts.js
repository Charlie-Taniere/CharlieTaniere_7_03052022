const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');


const postCtrl = require('../controllers/Posts'); // 

router.get('/', auth, postCtrl.allPosts);
router.get('/byId/:id', auth, postCtrl.onePost);
router.get("/byuserId/:id", auth, postCtrl.listOfPosts);
router.post("/", auth, postCtrl.createPost);
router.put("/title", auth, postCtrl.modifyPostTitle);
router.put("/postText", auth, postCtrl.modifyPostBody);
router.delete("/:postId", auth, postCtrl.deletePost);

module.exports = router;