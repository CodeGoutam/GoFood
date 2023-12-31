const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const dbmodel = require("./UserSchema");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
router.post("/login", [body("email").isEmail()], async (req, res) => {
  let err = validationResult(req);
  if (!err) {
    return res.send("enter correct email address");
  }
  let email = req.body.email;
  let data = await dbmodel.findOne({ email: email });
  if (!data) {
    return res.json("enter valid email");
  }
  let password = req.body.password;
  let check = await bcryptjs.compare(password, data.password);
  let obj = {
    user: { id: data._id },
  };
  if (check) {
    let authToken = jwt.sign(obj,"secret Key");
    res.json({ success: true ,authToken:authToken});
  } else {
    console.log("wrong password");
    res.json({ success: false });
  }
});
module.exports = router;
