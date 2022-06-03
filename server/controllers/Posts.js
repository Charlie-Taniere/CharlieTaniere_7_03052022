const { Posts, Likes } = require("../models");
const fs = require('fs');


exports.allPostsAndLikes = async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });

}

exports.onePost = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  return res.json(post);
};


exports.listOfPosts = async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  return res.json(listOfPosts);
};

exports.createPost = async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    post.image = req.file?.path;
    await Posts.create(post).then(()=>{
      res.status(200).json(post);
  }).catch(err => res.status(400).json(err.response));
};



  exports.modifyPost = async (req, res) => {
  const postid = req.params.id;
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  post.image = req.file?.path;

  await Posts.update(post,{                  
    where: {
      id: postid,
    },
  }).then(()=>{
      res.status(200).json("Article modifié!");
  }).catch(err => res.status(400).json(err.response));
  }


exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  console.log(postId)
//  await Posts.image.split('/images/')[1];
//   fs.unlink(`images/${filename}`, () => {
   Posts.destroy({
    where: {
      id: postId,
    },
  // });
})
  return res.json("DELETED SUCCESSFULLY");
};

