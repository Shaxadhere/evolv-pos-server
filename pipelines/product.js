exports.getProductListPipeline = (req) => {
    return [
        {
            $match: {
                store: req.user.store
            },
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