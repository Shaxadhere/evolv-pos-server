exports.getSaleListPipeline = (req) => {
    const match = {
        store: req.user.store
    }
    return [
        {
            $match: match,
        },
        {
            $lookup: {
                from: "products",
                localField: "products.product",
                foreignField: "_id",
                as: "products.product"
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            },
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                "user.password": 0,
                "user.__v": 0
            }
        },
        {
            $addFields: {
                products: "$products.product"
            }
        }
    ]
}