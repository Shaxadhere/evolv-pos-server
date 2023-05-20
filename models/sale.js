const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { PAYMENT_METHODS, ORDER_STATUS } = require("../constants/enums");

const saleSchema = new mongoose.Schema({
    //products with quantity and price
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            pricePerUnit: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                required: false
            },
            tax: {
                type: Number,
                required: false
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: Object.values(PAYMENT_METHODS),
        dafault: PAYMENT_METHODS.CASH
    },
    total: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    orderNumber: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store",
        required: true
    }
}, { timestamps: true })

saleSchema.plugin(mongoosePaginate);
saleSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("sale", saleSchema);

