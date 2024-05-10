const prisma = require("../server");

//Get all categories on an article
const getCategoriesOnArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    //Check if article exists
    const articleExists = await prisma.article.findUnique({
      where: {
        id: parseInt(articleId),
      },
    });

    if (!articleExists) {
      return res.status(404).json({
        error: "Article not found",
      });
    }

    const categories = await prisma.category.findMany({
      where: {
        articles: {
          some: {
            articleId: parseInt(articleId),
          },
        },
      },
    });

    //If no categories are found
    if (categories.length === 0) {
      return res.status(404).json({
        error: "No categories found for this article",
      });
    }

    //Return categories
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Create a new category on an article
const createCategoryOnArticle = async (req, res) => {
  try {
    const { articleId, categoryId } = req.params;

    //Check if article exists
    const articleExists = await prisma.article.findUnique({
      where: {
        id: parseInt(articleId),
      },
    });

    if (!articleExists) {
      return res.status(404).json({
        error: "Article not found",
      });
    }

    //Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    });

    if (!categoryExists) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    //Check if category is already on article
    const categoryOnArticle = await prisma.categoriesOnArticles.findFirst({
      where: {
        articleId: parseInt(articleId),
        categoryId: parseInt(categoryId),
      },
    });

    if (categoryOnArticle) {
      return res.status(400).json({
        error: "Category is already on this article",
      });
    }

    //Create category on article
    const category = await prisma.categoriesOnArticles.create({
      data: {
        articleId: parseInt(articleId),
        categoryId: parseInt(categoryId),
      },
    });

    res.status(201).json({
      message: "Article added to category successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Delete a category on an article
const deleteCategoryOnArticle = async (req, res) => {
  try {
    const { articleId, categoryId } = req.params;

    //Check if article exists
    const articleExists = await prisma.article.findUnique({
      where: {
        id: parseInt(articleId),
      },
    });

    if (!articleExists) {
      return res.status(404).json({
        error: "Article not found",
      });
    }

    //Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    });

    if (!categoryExists) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    //Check if category is on article
    const categoryOnArticle = await prisma.categoriesOnArticles.findFirst({
      where: {
        articleId: parseInt(articleId),
        categoryId: parseInt(categoryId),
      },
    });

    if (!categoryOnArticle) {
      return res.status(404).json({
        error: "Article is not on this category",
      });
    }

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
