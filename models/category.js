const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    }
}, { timestamps: true })

categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(aggregatePaginate);
module.exports = mongoose.model("category", categorySchema);