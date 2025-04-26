const { Post, User } = require('../models');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;
  try {
    const post = await Post.create({ title, content, userId });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
