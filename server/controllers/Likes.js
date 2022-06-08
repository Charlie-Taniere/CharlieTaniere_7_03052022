const { Likes } = require("../models");


exports.like = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  try {
    if (!found) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.json({ liked: true });
    } else {
      await Likes.destroy({
        where: { PostId: PostId, UserId: UserId },
      });
      res.json({ liked: false });
    }
  } catch (error) {console.log("Problème: " + error)}
};