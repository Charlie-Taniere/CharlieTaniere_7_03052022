// Importation des ressources

const { Posts, Likes } = require("../models");
const fs = require('fs');
const jwt = require("jsonwebtoken");


// Récupération de tous les articles et des likes 
exports.allPostsAndLikes = async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
}

// Récupération d'un article 
exports.onePost = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  return res.json(post);
};

// Récupération de tous les articles
exports.listOfPosts = async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  return res.json(listOfPosts);
};

// Création d'un article
exports.createPost = async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  post.image = req.file?.path;
  await Posts.create(post).then(() => {
    res.status(200).json(post);
  }).catch(err => res.status(400).json(err.response));
};

// Modification d'un article
exports.modifyPost = async (req, res) => {
  const postid = req.params.id;
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  post.image = req.file?.path || ""
  await Posts.update(post, {
    where: {
      id: postid,
    },
  }).then(() => {
    res.status(200).json("Article modifié!");
  }).catch(err => res.status(400).json(err.response));
}

// Supression d'un article
exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    let userId = -1
    const token = req.headers.accesstoken
    const decodedToken = jwt.verify(token, "Akde3qff52486KIHJDZQ5241deJ");
    let userInfos = {
      userId: decodedToken.userId,
    }
    userId = decodedToken.userId;

    if (userId == -1) {
      throw "Invalid user ID";
    }

    if (userInfos.userId < 0) {
      return res.status(401).json({ error: "Wrong token" });
    }

    else {
      const imageUrl = await req.body.postObject.image;

      if (imageUrl) {
        const image = await imageUrl.split('\\')[1];
        const imagePath = await `./images/${image}`;
        fs.unlinkSync(imagePath);
      }
    }

    await Posts.destroy({
      where: {
        id: postId,
      },
    })
    return res.json("DELETED SUCCESSFULLY");
  } catch (error) { console.log("Problème: " + error) }
}
