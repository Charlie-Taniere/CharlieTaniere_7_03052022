const { Comments } = require("../models");

exports.getComment = async (req, res, next) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  return res.json(comments);
};

exports.postComment = async (req, res, next) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  return res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  return res.json("DELETED SUCCESSFULLY");
};

