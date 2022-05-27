
const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");



exports.allPosts = (req, res, next) => {

  const listOfPosts =  Posts.findAll({ include: [Likes] });
  const likedPosts =  Likes.findAll({ where: { UserId: req.user.id } });
  return res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });

}

exports.onePost = (req, res, next) => {
  const id = req.params.id;
  const post = Posts.findByPk(id);
  return res.json(post);
};


exports.listOfPosts = (req, res, next) => {
  const id = req.params.id;
  const listOfPosts =  Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  return res.json(listOfPosts);
};

exports.createPost = (req, res, next) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    Posts.create(post);
    return res.json(post);
  };


  exports.modifyPostTitle = (req, res, next) => {
  const { newTitle, id } = req.body;
  Posts.update({ title: newTitle }, { where: { id: id } });
  return res.json(newTitle);
};

exports.modifyPostBody = (req, res, next) => {
  const { newText, id } = req.body;
  Posts.update({ postText: newText }, { where: { id: id } });
  return res.json(newText);
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Posts.destroy({
    where: {
      id: postId,
    },
  });

  return res.json("DELETED SUCCESSFULLY");
};

