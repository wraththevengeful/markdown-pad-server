const { Router } = require("express");
const postsController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getOnePost);

module.exports = postsRouter;