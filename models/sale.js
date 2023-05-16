const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const saleSchema = new mongoose.Schema({
    //products with quantity and price
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

saleSchema.plugin(mongoosePaginate);
saleSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("sale", saleSchema);

