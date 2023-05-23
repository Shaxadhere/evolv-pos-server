const moment = require("moment");
const { sortOrders } = require("../constants");

exports.getSaleListPipeline = (req) => {
    const match = {
        store: req.user.store
    }
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
    const sortBy = req.query.sortBy ? req.query.sortBy : "created_at"
    const sortOrder = req.query.sortOrder ? req.query.sortOrder : sortOrders.DESC
    // sort[sortBy] = sortOrder === sortOrders.ASC ? 1 : -1
    const sort = {
        [sortBy]: sortOrder === sortOrders.ASC ? 1 : -1
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

exports.getSaleReportPipeline = (req) => {
    const match = {
        store: req.user.store
    }
    Object.keys(req.query).forEach((key) => {
        if (key === "limit" || key === "page" || key === "sortOrder" || key === "sortBy" || key === "store", key === "fromDate", key === "toDate") {
            return;
        }
        else if (key === "name") {
            match[key] = { $regex: req.query[key], $options: "i" }
            return
        }
        else if (key === "category") {
            console.log(req.query[key])
            match[key] = new mongoose.Types.ObjectId(req.query[key]);
            return
        }
        else match[key] = req.query[key];
    })

    //calculate fromDate and toDate
    const fromDate = req.query.fromDate ? moment(req.query.fromDate).toDate() : new Date(0)
    const toDate = req.query.toDate ? moment(req.query.toDate).add( 1,
        "days"
    ) : new Date()

    match.createdAt = {
        $gte: fromDate,
        $lte: toDate
    }

    delete match.fromDate
    delete match.toDate

    //calculate total in sale and return sum of total
    const group = {
        _id: null,
        total: {
            $sum: "$total"
        }
    }

    const pipeline = [
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
        {
            $unwind: "$user"
        },
        {
            $group: group
        },
    ]

    console.log(JSON.stringify(pipeline))

    return pipeline
}