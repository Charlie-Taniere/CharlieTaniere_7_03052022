const express = require("express");
const router = express.Router();
const { validateToken } = require('../middlewares/Auth');


const postCtrl = require('../controllers/Posts'); // 

router.get('/', validateToken, postCtrl.allPosts);
router.get('/byId/:id', validateToken, postCtrl.onePost);
router.get("/byuserId/:id", validateToken, postCtrl.listOfPosts);
router.post("/", validateToken, postCtrl.createPost);
router.put("/title", validateToken, postCtrl.modifyPostTitle);
router.put("/postText", validateToken, postCtrl.modifyPostBody);
router.delete("/:postId", validateToken, postCtrl.deletePost);

module.exports = router;