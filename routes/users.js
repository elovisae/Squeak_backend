const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

/**
 * @openapi
 *  /api/users/{id}:
 *   put:
 *     summary: Updates an existing users
 *     description: This PUT updates an existing user by finding it with the id.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user id.
 *         example: 631aea6027af069a690702bc
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Jon Doe
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: jondoe1
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: jon.doe@some.where
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: secret
 *               phone:
 *                 type: string
 *                 description: The user's phone.
 *                 example: 0712387383
 *     responses:
 *       200:
 *         description: User succesfully updated.
 *       401:
 *         description: Unathorized. You can only update your account. Hint; Are you logged in?
 */
//Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your account");
  }
});

/**
 * @openapi
 *  /api/users/{id}:
 *    get:
 *      summary: Get a specific user
 *      description: This GETs a specific user by finding it with the id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The user id
 *          example: 631aea6027af069a690702bc
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully got user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 1
 *                      name:
 *                        type: string
 *                        description: The user's name.
 *                        example: Jon Doe
 *                      username:
 *                        type: string
 *                        description: The user's username.
 *                        example: jondoe1
 *                      email:
 *                        type: string
 *                        description: The user's email.
 *                        example: jon.doe@some.where
 *                      password:
 *                        type: string
 *                        description: The user's password.
 *                        example: secret
 *                      phone:
 *                        type: string
 *                        description: The user's phone.
 *                        example: 0712387383
 *        404:
 *          description: User not found
 */

//GET USER
router.get("/:id", async (req, res) => {
  try {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 *  /api/users:
 *    get:
 *      summary: Get all users
 *      description: This GETs all users in an array
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: Successfully got users, stored in array
 */
/**
 * @openapi
 *  /api/users?user={username}:
 *    get:
 *      summary: Get user by query
 *      description: This gets information on a user by using their username as a query
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: username
 *          required: true
 *          description: Username of the specific user. Use jondoe1 for an example
 *          schema:
 *            type: string
 *      requestBody:
 *        required: false
 *      responses:
 *        200:
 *          description: Succesfully gets all posts from the specified user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 1
 *                      name:
 *                        type: string
 *                        description: The user's name
 *                        example: Jon Doe
 *                      username:
 *                        type: string
 *                        description: The user's username
 *                        example: jondoe1
 *                      email:
 *                        type: string
 *                        description: The user's email.
 *                        example: jon.doe@some.where
 *                      password:
 *                        type: string
 *                        description: Crypted version of user's password.
 *                        example: $2b$10$VslaWD/FtjvSDRcEo08b9eR0CfJG610f3uR2659dmFQOz0kEGOCl
 *                      phone:
 *                        type: string
 *                        description: The user's phone number
 *                        example: 0701234567
 *                    
 */


// GET ALL USERS
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let users;
   if(username){
    users = await User.find({ username })
   }else{
    users = await User.find()
   }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 *  /api/users/{id}:
 *    delete:
 *      summary: Deletes a specific user
 *      description: This deletes a specific user by finding it with the id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The user id
 *          example: 631aea6027af069a690702bc
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully deleted user
 *        401:
 *          description: You can delete only your account. Are you logged in?
 *        404:
 *          description: User not found
 */
//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

module.exports = router;
