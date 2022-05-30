const express = require("express");
const router = express.Router();
const { validateToken } = require('../middlewares/Auth');

const commentsCtrl = require('../controllers/Comments'); 

router.get("/:postId", validateToken, commentsCtrl.getComment);
router.post("/", validateToken, commentsCtrl.postComment);
router.delete("/:commentId", validateToken, commentsCtrl.deleteComment);

module.exports = router;