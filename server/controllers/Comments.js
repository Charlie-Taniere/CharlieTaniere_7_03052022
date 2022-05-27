const { Comments } = require("../models");

exports.getComment = (req, res, next) => {
  const postId = req.params.postId;
  const comments =  Comments.findAll({ where: { PostId: postId } });
  return res.json(comments);
};

exports.postComment = (req, res, next) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
   Comments.create(comment);
  return res.json(comment);
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;

  Comments.destroy({
    where: {
      id: commentId,
    },
  });

  return res.json("DELETED SUCCESSFULLY");
};

