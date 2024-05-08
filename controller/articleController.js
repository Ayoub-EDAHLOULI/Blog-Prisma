const prisma = require("../server");

//Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        comments: true,
        categories: true,
      },
    });
    res.status(200).json({
      message: "All articles retrieved successfully",
      articles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get One article
const getOneArticle = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if article exists
    const articleExists = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!articleExists) {
      return res.status(404).json({
        error: "Article not found",
      });
    }
    //Get article
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
        comments: true,
        categories: true,
      },
    });
    res.status(200).json({
      message: "Article retrieved successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create an article
const createArticle = async (req, res) => {
  try {
    const { title, content, image, authorId } = req.body;

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        image,
        author: { connect: { id: authorId } },
      },
    });
    res.status(201).json({
      message: "Article created successfully",
      newArticle,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update an article
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    //Check if article exists
    const articleExists = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!articleExists) {
      return res.status(404).json({
        error: "Article you want to update not found",
      });
    }

    //Update article
    const updateArticle = await prisma.article.update({
      where: {
        id: parseInt(id),
      },

      data: {
        title,
        content,
        image,
      },
    });

    res.status(200).json({
      message: "Article updated successfully",
      updateArticle,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete an article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if article exists
    const articleExists = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!articleExists) {
      return res.status(404).json({
        error: "Article you want to delete not found",
      });
    }

    //Delete associated comments
    await prisma.comment.deleteMany({
      where: {
        articleId: parseInt(id),
      },
    });

    //Delete article
    await prisma.article.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  getOneArticle,
  updateArticle,
  deleteArticle,
};
