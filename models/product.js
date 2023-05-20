const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: 2000
    },
    pricePerUnit: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        default: 0,
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
    },
    shipping: {
        required: false,
        type: Boolean
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store",
        required: true
    }
}, { timestamps: true })

productSchema.plugin(mongoosePaginate);
productSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("product", productSchema);