const { sortOrders } = require("../constants");

exports.getSaleListPipeline = (req) => {
    const match = {
        store: req.user.store
    }
    const sort = {}
    Object.keys(req.query).forEach((key) => {
        if (key === "limit" || key === "page" || key === "sortOrder" || key === "sortBy" || key === "store") {
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
    if (req.query.sortBy && req.query.sortOrder) {
        const sortBy = req.query.sortBy ? req.query.sortBy : "created_at"
        sort[sortBy] = req.query.sortOrder === sortOrders.ASC ? 1 : -1
    }
    return [
        {
            $match: match,
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            },
        },
        { $sort: sort },
        {
            $unwind: "$user"
        },

        {
            $project: {
                "user.password": 0,
                "user.__v": 0
            }
        },
    ]
}