const Article = require('../models/articleModel');

// Admin/Agent: Create Article
exports.createArticle = async (req, res) => {
  try {
    const { title, body, tags, status } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    const article = await Article.create({ title, body, tags, status });
    res.status(201).json({ message: "Article created", article });
  } catch (error) {
    console.error("Create Article Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Public: Get Published Articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" });
    res.status(200).json({ articles });
  } catch (error) {
    console.error("Get Articles Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin/Agent: Update Article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, tags, status } = req.body;

    const article = await Article.findByIdAndUpdate(
      id,
      { title, body, tags, status },
      { new: true }
    );

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.status(200).json({ message: "Article updated", article });
  } catch (error) {
    console.error("Update Article Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
