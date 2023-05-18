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
    ]
}