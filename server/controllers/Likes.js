const { Likes } = require("../models");


exports.like = (req, res, next) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found =  Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
     Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
     Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({ liked: false });
  }
};