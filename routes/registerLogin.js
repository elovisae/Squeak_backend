const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * @openapi
 *   tags:
 *     name: Users
 *     description: Managing users
 */

/**
 * @openapi
 *  /api/auth/register:
 *   post:
 *     summary: Creates a new user
 *     description: This POST creates a new user. You need to send in a request body. An example can be found below
 *     tags: [Users]
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
 *                       description: The user ID.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Jon Doe
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: jondoe1
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: jon.doe@some.where
 *                     password:
 *                       type: string
 *                       description: The user's password.
 *                       example: secret
 *                     phone:
 *                       type: string
 *                       description: The user's phone.
 *                       example: 0712387383
 *       500:
 *         description: Hint, might already exist a username with that email or username
 */

//Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const anomPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: anomPassword,
      phone: req.body.phone,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 *  /api/auth/login:
 *   post:
 *     summary: Log in as an existing user
 *     description: This POST lets you log in as an existing user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: jondoe1
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: secret
 *     responses:
 *       200:
 *         description: Succesfully logged in.
 *       400:
 *         description: User not found or wrong password
 */

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user && res.status(400)) {
      res.send({
        message: "E-mail is not registered",
      });
      return;
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid && res.status(400)) {
      res.send({
        message: "Password is incorrect",
      });
      return;
    }

    const { password, ...others } = user._doc;

    res.send({
      user,
      status: 200,
      message: "Inloggad",
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
