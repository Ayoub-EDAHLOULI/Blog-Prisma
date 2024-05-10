const prisma = require("../server");

//Get all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        articles: true,
        comments: true,
      },
    });

    //Check if users exist
    if (!users) {
      return res.status(404).json({
        error: "No users found",
      });
    }

    //Return users
    res.status(200).json({
      message: "Fetched users successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if name, email and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please provide name, email and password",
      });
    }

    //Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please provide a valid email",
      });
    }

    //Check if password is valid
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters",
      });
    }

    //Check if email already exists
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    //Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    //Check if name, email and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please provide name, email and password",
      });
    }

    //Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please provide a valid email",
      });
    }

    //Check if password is valid
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters",
      });
    }

    //Check if email already exists
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    //Update user
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        password,
      },
    });
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!userExists) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    //Delete associated articles
    await prisma.article.deleteMany({
      where: {
        authorId: parseInt(id),
      },
    });

    //Delete associated comments
    await prisma.comment.deleteMany({
      where: {
        authorId: parseInt(id),
      },
    });

    //Delete user
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).json({
      message:
        "User and associated articles with there comments deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete all users
const deleteAllUsers = async (req, res) => {
  try {
    //Delete all users
    await prisma.user.deleteMany();

    res.status(204).json({
      message: "All users deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  deleteAllUsers,
};
