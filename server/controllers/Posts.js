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
    await Posts.create(post);
    return res.json(post);
  };

// exports.createPost = (req, res, next) => {
//   const postObject = req.body;
//   const post = new Posts({
//     ...postObject,
//     // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   });
//   post.save()
//     .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
//     .catch(error => res.status(400).json({ error }));
// };


  exports.modifyPostTitle = async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  return res.json(newTitle);
};

exports.modifyPostBody = async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  return res.json(newText);
};

exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  return res.json("DELETED SUCCESSFULLY");
};

