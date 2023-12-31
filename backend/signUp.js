const express = require("express");
const router = express.Router();
const userSchema = require("./UserSchema");
const bcrypt = require("bcryptjs");
const { body,  validationResult } = require("express-validator");
router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 4 })],
  async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let hashedPass = await bcrypt.hash(req.body.password, 10);
      let data = await userSchema.create({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        password: hashedPass,
      });
      res.send({ success: true });
    } catch (error) {
      res.send({ success: false });
    }
  }
);
module.exports = router;
