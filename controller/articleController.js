const prisma = require("../server");

//Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
      },
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get One article
const getOneArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
      },
    });
    res.status(200).json(article);
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
      include: {
        author: true,
      },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update an article
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image, authorId } = req.body;
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

    res.status(200).json(updateArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete an article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteArticle = await prisma.article.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(deleteArticle);
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
