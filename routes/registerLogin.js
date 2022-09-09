const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      phone: req.body.phone
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user && res.status(400)) {
      res.send({
        message: 'E-postadressen finns inte registrerad'
      })
      return
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid && res.status(400)){
      res.send({
        message: 'Lösenordet är felaktigt'
      })
      return
    }
  
    const { password, ...others } = user._doc;

    res.send({
      status: 200,
      message: "Inloggad",
      loggedIn: true
    })
   
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
