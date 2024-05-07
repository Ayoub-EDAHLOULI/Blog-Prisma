const prisma = require("../server");

//Create a comment
const createComment = async (req, res) => {
  try {
    const { content, authorId, articleId } = req.body;
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

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Retrieve all comments for a specific article.
const getAllComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        articleId: parseInt(id),
      },
      include: {
        article: true,
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Update a comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

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
    const deleteComment = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(deleteComment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
};
