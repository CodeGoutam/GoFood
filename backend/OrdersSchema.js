const mongoose = require("mongoose");
const Orders = mongoose.Schema({
    email: { type: String },
    orderData: {
        type: Array,
        default: [],
    },
});
module.exports = mongoose.model("order", Orders);
