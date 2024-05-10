const prisma = require("../server");

//Create a category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json({
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Create Multiple Categories
const createMultipleCategories = async (req, res) => {
  try {
    const categories = req.body;
    const newCategories = await prisma.category.createMany({
      data: categories,
    });
    res.status(201).json({
      message: "Categories created successfully",
      newCategories,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Retrieve all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({
      message: "All categories retrieved successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Get one category
const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!categoryExists) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    //Get category
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        articles: true,
      },
    });
    res.status(200).json({
      message: "Category retrieved successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    //Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!categoryExists) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    //Update category
    const updateCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    res.status(200).json({
      message: "Category updated successfully",
      updateCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!categoryExists) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    //Find articles associated with category
    const articlesOfCategory = await prisma.categoriesOnArticles.findMany({
      where: {
        categoryId: parseInt(id),
      },
    });

    //Delete each article associated with category
    articlesOfCategory.forEach(async (article) => {
      await prisma.article.delete({
        where: {
          id: article.articleId,
        },
      });
    });

    //Delete each comment associated with article
    articlesOfCategory.forEach(async (article) => {
      await prisma.comment.deleteMany({
        where: {
          articleId: article.articleId,
        },
      });
    });

    //Delete category
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete All Categories
const deleteAllCategories = async (req, res) => {
  try {
    await prisma.category.deleteMany();
    res.status(200).json({ message: "All categories deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createCategory,
  createMultipleCategories,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
