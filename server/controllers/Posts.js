const { Posts, Likes } = require("../models");

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

//   exports.modifyPostTitle = async (req, res) => {
//   const { newTitle, id } = req.body;
//   await Posts.update({ title: newTitle }, { where: { id: id } });        A SUPPRIMER 
//   return res.json(newTitle);
// };

// exports.modifyPostBody = async (req, res) => {
//   const { newText, id } = req.body;
//   await Posts.update({ postText: newText }, { where: { id: id } });      A SUPPRIMER 
//   return res.json(newText);
// };

  // exports.modifyPost = async (req, res) => {
  // const postid = req.params.id;
  // const post = req.body;
  // post.username = req.user.username;
  // post.UserId = req.user.id;
  // post.image = req.file?.path;

  // await Posts.update(post,{                        A IMPLEMENTER
  //   where: {
  //     id: postid,
  //   },
  // }).then(()=>{
  //     res.status(200).json("Article modifié!");
  // }).catch(err => res.status(400).json(err.response));
  // }


exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  return res.json("DELETED SUCCESSFULLY");
};

