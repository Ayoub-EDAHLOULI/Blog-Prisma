const prisma = require("../server");

//Get all categories on an article
const getCategoriesOnArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const categories = await prisma.category.findMany({
      where: {
        articles: {
          some: {
            articleId: parseInt(articleId),
          },
        },
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Create a new category on an article
const createCategoryOnArticle = async (req, res) => {
  try {
    const { articleId, categoryId } = req.params;
    const category = await prisma.categoriesOnArticles.create({
      data: {
        articleId: parseInt(articleId),
        categoryId: parseInt(categoryId),
      },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Delete a category on an article
const deleteCategoryOnArticle = async (req, res) => {
  try {
    const { articleId, categoryId } = req.params;
    await prisma.categoriesOnArticles.delete({
      where: {
        articleId_categoryId: {
          articleId: parseInt(articleId),
          categoryId: parseInt(categoryId),
        },
      },
    });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getCategoriesOnArticle,
  createCategoryOnArticle,
  deleteCategoryOnArticle,
};
