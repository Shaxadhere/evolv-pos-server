const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: false
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store",
        required: true
    }
}, { timestamps: true })

customerSchema.plugin(mongoosePaginate);
customerSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("customer", customerSchema);