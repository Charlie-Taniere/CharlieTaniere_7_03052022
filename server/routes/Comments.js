const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

const commentsCtrl = require('../controllers/Comments'); 

router.get("/:postId", auth, commentsCtrl.getComment);
router.post("/", auth, commentsCtrl.postComment);
router.delete("/:commentId", auth, commentsCtrl.deleteComment);

module.exports = router;