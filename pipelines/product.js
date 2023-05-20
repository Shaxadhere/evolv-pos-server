const mongoose = require("mongoose");

exports.getProductListPipeline = (req) => {
    const match = {
        store: req.user.store
    }
    Object.keys(req.query).forEach((key) => {
        if (key === "limit" || key === "page" || key === "sort" || key === "order" || key === "store") {
            return;
        }
        if (key === "name") {
            match[key] = { $regex: req.query[key], $options: "i" }
            return
        }
        if (key === "category") {
            console.log(req.query[key])
            match[key] = new mongoose.Types.ObjectId(req.query[key]);
            return
        }
        match[key] = req.query[key];
    })

    console.log([
        {
            $match: match,
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            },
        },
        {
            $project: {
                "category._id": 0,
                "category.__v": 0
            }
        },
        { $unwind: "$category" },
    ])

    return [
        {
            $match: match,
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            },
        },
        {
            $project: {
                "category._id": 0,
                "category.__v": 0
            }
        },
        { $unwind: "$category" },
    ]
}