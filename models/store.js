const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { STORE_STATUS } = require("../constants/enums");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    contact: {
        type: String,
        required: true
    },
    accountExpiry: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(STORE_STATUS),
        dafault: STORE_STATUS.INACTIVE
    }
}, { timestamps: true })

storeSchema.plugin(mongoosePaginate);
storeSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("store", storeSchema);
