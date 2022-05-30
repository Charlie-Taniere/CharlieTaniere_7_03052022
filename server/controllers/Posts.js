
const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");



exports.allPosts = async (req, res, next) => {

  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  return res.json({ listOfPosts: listOfPosts});

}

exports.onePost = async (req, res, next) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  return res.json(post);
};


exports.listOfPosts = async (req, res, next) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  return res.json(listOfPosts);
};

exports.createPost = async (req, res, next) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    return res.json(post);
  };


  exports.modifyPostTitle = async (req, res, next) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  return res.json(newTitle);
};

exports.modifyPostBody = async (req, res, next) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  return res.json(newText);
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  return res.json("DELETED SUCCESSFULLY");
};

