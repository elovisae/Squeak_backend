const router = require("express").Router();
const Post = require("../models/Post");

/**
 * @openapi
 *   tags:
 *     name: Posts
 *     description: Managing posts
 */

/**
 * @openapi
 *  /api/posts:
 *   post:
 *     summary: Creates a post
 *     description: This creates a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *                 example: Hello World!
 *               desc:
 *                 type: string
 *                 description: This is the content of the post
 *                 example: This is what I'm squeaking, the content
 *               username:
 *                 type: string
 *                 description: Username of the squeaker
 *                 example: jondoe1
 *     responses:
 *       200:
 *         description: Creates a user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The post ID.
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: The title of the post.
 *                       example: Hello World!
 *                     desc:
 *                       type: string
 *                       description: This is the content of the post
 *                       example: This is what I'm squeaking, the content
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: jondoe1
 */

//create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 *  /api/posts/{id}:
 *   delete:
 *     summary: Deletes a post
 *     description: This deletes a specific post, specified with the _id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         example: 6319f3652fff92c2f082ba3a
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post has been deleted.
 *       401:
 *         description: You can't delete someone else's post. You are not logged in.
 */

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 *  /api/posts/{id}:
 *   get:
 *     summary: Gets a specific post
 *     description: This gets a specific post based on the id parameter
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The post id
 *         example: 6319f3652fff92c2f082ba3a
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Succesfully get the post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The post ID.
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: The title of the post.
 *                       example: Hello World!
 *                     desc:
 *                       type: string
 *                       description: This is the content of the post
 *                       example: This is what I'm squeaking, the content
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: jondoe1
 */

//get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 *  /api/posts:
 *   get:
 *     summary: Gets all posts
 *     description: This gets ALL posts
 *     tags: [Posts]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Succesfully gets all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The post ID.
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: The title of the post.
 *                       example: Hello World!
 *                     desc:
 *                       type: string
 *                       description: This is the content of the post
 *                       example: This is what I'm squeaking, the content
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: jondoe1
 */

/**
 * @openapi
 *  /api/posts?user={username}:
 *   get:
 *     summary: Gets all posts from a specific user
 *     description: This gets ALL posts from a specific user, using their username as a query
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: Username of the specific user. Use jondoe1 for an example
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Succesfully gets all posts from the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The post ID.
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: The title of the post.
 *                       example: Hello World!
 *                     desc:
 *                       type: string
 *                       description: This is the content of the post
 *                       example: This is what I'm squeaking, the content
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: jondoe1
 */

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
