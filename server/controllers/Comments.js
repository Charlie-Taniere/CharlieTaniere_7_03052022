// Importation des ressources
const { Comments } = require("../models");


// Récupération des commentaires
exports.getComment = async (req, res, next) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  return res.json(comments);
};

// Création d'un commentaire
exports.postComment = async (req, res, next) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  return res.status(201).json(comment);
};

// Supression d'un commentaire
exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  return res.json("DELETED SUCCESSFULLY");
};

