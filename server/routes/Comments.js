const express = require("express");
const router = express.Router();
// const { validateToken } = require('../middlewares/Auth');

const commentsCtrl = require('../controllers/Comments'); 

router.get("/:postId", commentsCtrl.getComment);
router.post("/", commentsCtrl.postComment);
router.delete("/:commentId", commentsCtrl.deleteComment);

module.exports = router;