const { Comment, User, Post } = require('../models');

exports.createComment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.userId;
  try {
    const comment = await Comment.create({ content, postId, userId });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: User,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
