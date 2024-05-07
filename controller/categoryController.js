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
    res.status(201).json(newCategory);
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
    res.status(201).json(newCategories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Retrieve all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Get one category
const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
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
