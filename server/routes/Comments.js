const express = require("express");
const router = express.Router();
const auth = require('../middlewares/Auth');

const commentsCtrl = require('../controllers/Comments'); 

router.get("/:postId", commentsCtrl.getComment);
router.post("/", auth.token, commentsCtrl.postComment);
router.delete("/:commentId", auth.token, commentsCtrl.deleteComment);

module.exports = router;