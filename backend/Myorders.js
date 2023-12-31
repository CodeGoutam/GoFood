const express = require('express')
const router = express.Router()
const orders = require('./OrdersSchema')
const mongoose = require('mongoose');
router.post("/myorders", async (req, res) => {
    let myorders = await orders.findOne({ email: req.body.email })
    res.send([myorders])

})
module.exports = router