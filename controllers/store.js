const Store = require("../models/store");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { ApiResponse } = require("../helpers");

exports.list = (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        Store.aggregatePaginate(Store.aggregate([]), { page, limit }).then((stores) => {
            return res.json(ApiResponse(stores));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.storeById = (req, res) => {
    try {
        Store.findById(req.params.id, (err, store) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            if (!store) {
                return res.json(ApiResponse({}, "Store not found", false));
            }
            return res.json(ApiResponse({ store }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.create = (req, res) => {
    try {
        const store = new Store(req.body);
        store.save((err, store) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            return res.json(ApiResponse({ store }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.update = (req, res) => {
    try {
        Store.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, store) => {
                if (err) {
                    return res.json(
                        ApiResponse(
                            {},
                            errorHandler(err) ? errorHandler(err) : err.message,
                            false
                        )
                    );
                }
                if (!store) {
                    return res.json(ApiResponse({}, "Store not found", false));
                }
                return res.json(ApiResponse({ store }));
            }
        );
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}

exports.remove = (req, res) => {
    try {
        Store.findByIdAndRemove(req.params.id, (err, store) => {
            if (err) {
                return res.json(
                    ApiResponse(
                        {},
                        errorHandler(err) ? errorHandler(err) : err.message,
                        false
                    )
                );
            }
            if (!store) {
                return res.json(ApiResponse({}, "Store not found", false));
            }
            return res.json(ApiResponse({ store }));
        })
    } catch (error) {
        return res.json(ApiResponse({}, errorHandler(error) ? errorHandler(error) : error.message, false));
    }
}