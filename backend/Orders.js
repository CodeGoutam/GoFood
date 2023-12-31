const express = require("express");
const router = express.Router();
const orderData = require("./OrdersSchema");
router.post("/orders", async (req, res) => {
  let orders = req.body.data;
  let email = req.body.email;
  let check = await orderData.findOne({ email: email });
  console.log(check);
  if (check == null) {
    await orderData
      .create({
        email: req.body.email,
        orderData: [req.body.data],
      })
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        res.send({ success: false });
      });
  } else {
    await orderData
      .findOneAndUpdate({ email: email }, { $push: { orderData: orders } })
      .then(() => {
        res.send({ success: true });
      })
      .catch(() => {
        res.send({ success: false });
      });
  }
});
module.exports = router;
