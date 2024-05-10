const prisma = require("../server");

//Create a comment
const createComment = async (req, res) => {
  try {
    const { content, authorId, articleId } = req.body;

    //Check if the article exists
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    //Check if the author exists
    const author = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    //Create a new comment
    const newComment = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: authorId } },
        article: { connect: { id: articleId } },
      },
      include: {
        author: true,
        article: true,
      },
    });

    res.status(201).json({
      message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Retrieve all comments for a specific article.
const getAllComments = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if the article exists
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    //Retrieve all comments for a specific article
    const comments = await prisma.comment.findMany({
      where: {
        articleId: parseInt(id),
      },
      include: {
        article: true,
        author: true,
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Get One Comment
const getOneComment = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if the comment exists
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!commentExist) {
      return res.status(404).json({ message: "Comment not found" });
    }

    //Retrieve a comment
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Comment retrieved successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Update a comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    //Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    //Check if content is empty
    if (
      content === "" ||
      content === null ||
      content === undefined ||
      content === " "
    ) {
      return res.status(400).json({ message: "Content is required" });
    }

    //Check if the content is empty
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    //Check if the content is the same as the previous one
    if (content === comment.content) {
      return res.status(400).json({
        message: "The content is the same as the previous one",
      });
    }

    //Update the comment
    const updateComment = await prisma.comment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        content,
      },
    });
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if the comment exists
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!commentExist) {
      return res.status(404).json({ message: "Comment not found" });
    }

    //Delete a comment
    const deleteComment = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Comment deleted successfully",
      deleteComment,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
};
