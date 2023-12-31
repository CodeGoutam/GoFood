const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let foodItems, foodCat;
async function display() {
    await mongoose.connect("mongodb://localhost:27017/gofood");
    console.log("db connectedd");
    const items = mongoose.connection.db.collection("food_items");
    foodItems = await items.find({}).toArray();
    const category = mongoose.connection.db.collection("food_category");
    foodCat = await category.find({}).toArray();
}
display();
router.post("/fooditem", (req, res) => {
    try {
        res.send([foodItems, foodCat]);
    } catch (e) {
        console.log(e);
    }
});
module.exports = router;
